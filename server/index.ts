import express, { Express, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuidv4 } from "uuid";
import cors, { CorsOptions } from "cors";
import { PrismaClient } from "./prisma/prisma/client";
import { registerTeam, verifyTeam, getTeamData } from "./lib/auth/auth";

const prisma = new PrismaClient();
const app: Express = express();
const server = createServer(app);
const port: string | number = process.env.PORT || 3001;

// CORS OPTION
const corsOption: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      origin.includes("localhost") ||
      origin.includes(".app.github.dev") ||
      origin.includes("" + process.env.FRONTEND_URI)
    ) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Origin",
  ],
};

// APP
app.use(cors(corsOption));
app.use(express.json());

// EJS SETUP
app.set("view engine", "ejs");

// SOCKET SETUP
let mainComputerId: string;

const io: Server = new Server(server, {
  cors: corsOption,
  transports: ["polling", "websocket"],
  pingTimeout: 60000,
  pingInterval: 25000,
  path: "/socket.io/",
  allowEIO3: true, // Allow Engine.IO v3 clients
  connectTimeout: 45000,
});

io.engine.generateId = (req) => {
  return uuidv4();
};

io.engine.on("connection_error", (err) => {
  console.error("Socket connection error:", err);
});


io.on("connection", (socket) => {
  console.log(`✅ New client connected. Socket ID: ${socket.id}`);

  // Listen for main computer identification
  socket.on("identifyMainComputer", async () => {
    // If a main computer is already connected, notify the client
    if (mainComputerId && mainComputerId !== socket.id) {
      socket.emit("mainComputerAlreadyExists", "A main computer is already connected.");
      return;
    }
    mainComputerId = socket.id;
    console.log("Main computer identified:", socket.id);


    socket.to(mainComputerId).emit("mainComLoginComp", "Login");
  });

  // Optionally, add logic to clear the mainComputerId when the admin disconnects
  socket.on("disconnect", () => {
    if (socket.id === mainComputerId) {
      console.log("💻 Main computer disconnected:", socket.id);
      mainComputerId = "";
    }
    console.log(`Socket ${socket.id} disconnected.`);
  });

  // Example: Other event handlers (e.g., buzzer events) follow here...
  socket.on(
    "pressBuzzer",
    async (data: { teamId: string; teamName: string }) => {
      // Validate, record buzzer press, and notify all clients...
      console.log("Buzzer pressed:", data);
      try {// Only push the event to the admin client.

        socket.to(mainComputerId).emit("buzzerPressed", {
          teamId: data.teamId,
          teamName: data.teamName,
          pressedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error handling buzzer press:", error);
        socket.emit("error", "Failed to process buzzer press");
      }
    }
  );
  socket.on("resetBuzzer", async () => {
    console.log("Reset buzzer event received");
    try {
      // Broadcast reset to all connected clients.y
      io.emit("buzzerReset");
    } catch (error) {
      console.error("Error resetting buzzer:", error);
    }
  });
});

// API ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Accessed Quizdom Server</h1>");
});

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/auth/create", async (req: Request, res: Response) => {
  let body = "";

  // Collect data chunks
  req.on("data", (chunk) => {
    body += chunk;
  });

  // When all data is received
  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(body); // Parse the collected body as JSON
      const { team, category, password, school, members, role } = parsedBody;
      const _team = await registerTeam(
        team,
        category,
        password,
        school,
        members,
        role
      );
      if (_team?.id) {
        res.json(_team);
        console.log(_team.id);
      } else {
        res.send("Invalid Dataset");
      }
    } catch (e) {
      console.error("Error:", e);
      res.status(400).send("Some Error Occured.");
    }
  });

  // Handle errors
  req.on("error", (err) => {
    console.error("Error:", err);
    res.status(500).send("Server Error");
  });
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  let body = "";

  // Collect data chunks
  req.on("data", (chunk) => {
    body += chunk;
  });

  // When all data is received
  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(body); // Parse the collected body as JSON
      const { id, password } = parsedBody;

      const _team = await verifyTeam(id, password);
      if (_team?.id) {
        res.json(_team);
      } else {
        res.send("Invalid Dataset");
      }
    } catch (e) {
      console.error("Error:", e);
      res.status(400).send("Some Error Occured.");
    }
  });

  // Handle errors
  req.on("error", (err) => {
    console.error("Error:", err);
    res.status(500).send("Server Error");
  });
});

app.post("/api/auth/team", async (req: Request, res: Response) => {
  let body = "";

  // Collect data chunks
  req.on("data", (chunk) => {
    body += chunk;
  });

  // When all data is received
  req.on("end", async () => {
    try {
      const parsedBody = JSON.parse(body); // Parse the collected body as JSON
      const { id } = parsedBody;

      const _teamData = await getTeamData(id);
      if (_teamData?.id) {
        res.json(_teamData);
      } else {
        res.send("Invalid Dataset");
      }
    } catch (e) {
      console.error("Error:", e);
      res.status(400).send("Some Error Occured.");
    }
  });

  // Handle errors
  req.on("error", (err) => {
    console.error("Error:", err);
    res.status(500).send("Server Error");
  });
});
// Error handling middleware
// Error handling
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

server.listen(port, () => {
  console.log(`✅ App is listening on *: ${port}`);
});
