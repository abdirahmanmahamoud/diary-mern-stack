import express from "express";
import "dotenv/config";
import regsisterRouter from "./api/routers/register.js";
import loginRouter from "./api/routers/login.js";
import diaryRouter from "./api/routers/diary.js";
import db from "./config/db.js";
import cors from "cors";

db();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", diaryRouter);
app.use("/", loginRouter);
app.use("/", regsisterRouter);

app.get("/", (req, res) => {
  res.send("Hello World updated");
});
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`server running ${process.env.NODE_ENV} node on part ${port}`)
);
