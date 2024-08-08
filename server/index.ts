// SERVER SETUP
import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { v4 as uuidv4 } from "uuid";
import bodyParser from 'body-parser';
import { registerTeam, verifyTeam, getTeamData } from './lib/auth/auth';
const app: Express = express();
const server = createServer(app);
const port: string | number = process.env.PORT || 3001;


// APP
app.use(express.json())


// EJS SETUP
app.set('view engine', 'ejs')

// SOCKET SETUP

// SOCKET VARS
let mainComputerId: string;
let buzzerPressed: boolean = false;

const io: Server = new Server(server);

io.engine.generateId = (req) => {
  return uuidv4(); // must be unique across all Socket.IO servers
}

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

io.on("connection", async (socket) => {
  socket.on("connect", (username: string,) => {
    socket.broadcast.emit("userconnected", () => {
      const id = socket.id;
      return { username, id };
    });
    console.log(`✅ Connected to Quizdom.🎧 Listening to port ${port}. 👤 Username : ${username} has joined`)
  })

  // Listen for main computer identification
  socket.on('identifyMainComputer', () => {
    mainComputerId = socket.id;
    console.log('💻 Main computer identified:', socket.id);
  });

  // LISTEN TO BUZZER EVENT
  socket.on('pressBuzzer', () => {
    if (!buzzerPressed) {
      buzzerPressed = true;
      // Broadcast to all clients that the buzzer was pressed
      io.emit('buzzerPressed', { id: socket.id });
    }
  });

  socket.on('resetBuzzer', () => {
    buzzerPressed = false;
    io.emit('buzzerReset');
  });

  socket.on('disconnect', () => {
    if (socket.id === mainComputerId) {
      mainComputerId = ""; // Reset main computer ID if it disconnects
    }
    console.log(`👤 Username : ${socket.id} got disconnected.`);
  });

})

// API ROUTES SETUP
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Accessed Quizdom Server</h1>")
})

app.post("/api/auth/create", async (req: Request, res: Response) => {
  const { team, category, password, school, members, role } = req.body;

  const _team = await registerTeam(team, password, school, members, role);
  res.json(_team);

})

app.get("/api/auth/login/:id&:password", async (req: Request, res: Response) => {
  const { id, password } = req.params;
  try{
    const _team = await verifyTeam(id, password);
    if (_team?.id) {
      res.json(_team);
      console.log(_team?.id)
    }
    else {
      res.send("Invalid Dataset");
    }
  } catch(e){
    console.log(e);
    res.send("Invalid Dataset");
  }

})

app.post("/api/auth/team", async (req: Request, res: Response) => {
  const { _id } = req.body;
  const _teamData = await getTeamData(_id);
  res.json(_teamData);
})



server.listen(port, () => {
  console.log(`✅ App is listening on *: ${port}`);
});
