import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuidv4 } from "uuid";
import cors, { CorsOptions } from "cors";
import { PrismaClient } from '@prisma/client';
import { registerTeam, verifyTeam, getTeamData } from "./lib/auth/auth";

const prisma = new PrismaClient();
const app: Express = express();
const server = createServer(app);
const port: string | number = process.env.PORT || 3001;

// CORS OPTION
const corsOption: CorsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "HEAD", "POST"],
  optionsSuccessStatus: 200
};

// APP
app.use(cors(corsOption));
app.use(express.json());

// EJS SETUP
app.set("view engine", "ejs");

// SOCKET SETUP
let mainComputerId: string;

const io: Server = new Server(server, {
  cors: corsOption
});

io.engine.generateId = (req) => {
  return uuidv4();
};

io.engine.on("connection_error", (err) => {
  console.error("Socket connection error:", err);
});

// Interface for buzzer events
interface BuzzerEvent {
  teamId: string;
  round: number;
  questionNumber: number;
}

io.on("connection", async (socket) => {
  socket.on("connect", () => {
    console.log(
      `✅ Connected to Quizdom.🎧 Listening to port ${port}. 👤 A User has joined. Socket ID: ${socket.id}.`
    );
  });

  // Listen for main computer identification
  socket.on("identifyMainComputer", () => {
    mainComputerId = socket.id;
    console.log("💻 Main computer identified:", socket.id);
    io.emit('mainComLoginComp', 'Login');
  });

  // LISTEN TO BUZZER EVENT
  socket.on("pressBuzzer", async (data: BuzzerEvent) => {
    try {
      // Validate team existence
      const team = await prisma.team.findUnique({
        where: { id: data.teamId }
      });

      if (!team) {
        return socket.emit("error", "Invalid team ID");
      }

      // Check if buzzer is already pressed for current round and question
      const existingBuzzer = await prisma.buzzerState.findFirst({
        where: {
          round: data.round,
          questionNumber: data.questionNumber,
          isPressed: true
        }
      });

      if (existingBuzzer) {
        return socket.emit("error", "Buzzer already pressed for this question");
      }

      // Create new buzzer press
      const buzzerPress = await prisma.buzzerState.create({
        data: {
          isPressed: true,
          teamId: data.teamId,
          round: data.round,
          questionNumber: data.questionNumber
        },
        include: {
          team: true
        }
      });

      // Emit buzzer pressed event to all clients
      io.emit("buzzerPressed", {
        id: socket.id,
        teamName: team.team,
        teamId: team.id,
        round: buzzerPress.round,
        questionNumber: buzzerPress.questionNumber,
        pressedAt: buzzerPress.pressedAt
      });

    } catch (error) {
      console.error("Buzzer press error:", error);
      socket.emit("error", "Failed to process buzzer press");
    }
  });

  // Reset buzzer for next question
  socket.on("resetBuzzer", async (data: { round: number; questionNumber: number }) => {
    try {
      // Update buzzer state
      await prisma.buzzerState.updateMany({
        where: {
          round: data.round,
          questionNumber: data.questionNumber
        },
        data: {
          isPressed: false
        }
      });

      // Emit reset event
      io.emit("buzzerReset", {
        round: data.round,
        questionNumber: data.questionNumber,
        resetAt: new Date()
      });

    } catch (error) {
      console.error("Buzzer reset error:", error);
      socket.emit("error", "Failed to reset buzzer");
    }
  });

  // Get buzzer history for a round
  socket.on("getBuzzerHistory", async (data: { round: number }) => {
    try {
      const history = await prisma.buzzerState.findMany({
        where: {
          round: data.round
        },
        include: {
          team: true
        },
        orderBy: {
          questionNumber: 'asc'
        }
      });

      socket.emit("buzzerHistory", history);
    } catch (error) {
      console.error("Buzzer history error:", error);
      socket.emit("error", "Failed to fetch buzzer history");
    }
  });

  socket.on("disconnect", () => {
    if (socket.id === mainComputerId) {
      mainComputerId = "";
    }
    console.log(`👤 Socket ID: ${socket.id} got disconnected.`);
  });
});

// API ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Accessed Quizdom Server</h1>");
});

app.post("/api/buzzer/status", async (req: Request, res: Response) => {
  try {
    const { round, questionNumber } = req.body;
    
    const buzzerState = await prisma.buzzerState.findFirst({
      where: {
        round,
        questionNumber,
        isPressed: true
      },
      include: {
        team: true
      }
    });

    res.json({ buzzerState });
  } catch (error) {
    console.error("Error fetching buzzer status:", error);
    res.status(500).json({ error: "Failed to fetch buzzer status" });
  }
});

// Keep your existing auth routes as they are
// ... (registerTeam, verifyTeam, getTeamData routes remain unchanged)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

server.listen(port, () => {
  console.log(`✅ App is listening on *: ${port}`);
});