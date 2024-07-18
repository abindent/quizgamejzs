// SERVER SETUP
import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { v4 as uuidv4 } from "uuid";

const app: Express = express();
const server = createServer(app);
const port: string | number = process.env.PORT || 3001;

app.use(express.static("public"));

// EJS SETUP
app.set('view engine', 'ejs')


// socket.io SETUP

const io: Server = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

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
})


// API ROUTES SETUP
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Accessed Quizdom Server</h1>")
})

server.listen(port, () => {
  console.log(`✅ App is listening on *: ${port}`);
});