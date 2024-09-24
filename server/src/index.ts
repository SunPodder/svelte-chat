import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import CookieParser from "cookie-parser";
import routes from "./routes";
import { VerifySession } from "./authentication";
import morgan from "morgan";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(CookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("common"));
app.use(VerifySession);
app.use(routes);

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

server.listen(5000, () => {
  console.log("🚀🚀🚀 Server running on http://localhost:5000 🚀🚀🚀");
});
