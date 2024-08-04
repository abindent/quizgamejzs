// SERVER SETUP
import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { registerTeam, verifyTeam, getTeamData } from './lib/auth/auth';
import { pushMessage, getTeamMessageData } from './lib/message/message';

const app: Express = express();
const server = createServer(app);
const port: string | number = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json())

// EJS SETUP
app.set('view engine', 'ejs')


// API ROUTES SETUP
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Accessed Quizdom Server</h1>")
})

app.post("/create", async (req: Request, res: Response) => {
  const { team, category, password, school, members, role } = req.body;

  const _team = await registerTeam(team, category, password, school, members, role);
  res.json(_team)

})

app.post("/login", async (req: Request, res: Response) => {
  const { _id, password } = req.body;
  const _team = await verifyTeam(_id, password);
  res.json(_team)

})

app.post("/create_message", async (req: Request, res: Response) => {
  const { _id, type, message, round, qno } = req.body;
  const _message = await pushMessage(_id, type, message, round, qno);
  res.json(_message)
})

app.post("/team", async (req: Request, res: Response) => {
  const { _id } = req.body;
  const _teamData = await getTeamData(_id);
  res.json(_teamData);

})

app.post("/team/messages", async(req: Request, res: Response)=>{
  const { _id } = req.body;
  const _teamMData = await getTeamMessageData(_id);
  res.json(_teamMData);
})


server.listen(port, () => {
  console.log(`✅ App is listening on *: ${port}`);
});