import express from "express";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorMiddleware } from "./middlewares/error.js";

config({
  path: "./data/config.env",
});

const app = express();
connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //true as we need cookies
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// error middleware
app.use(errorMiddleware);
