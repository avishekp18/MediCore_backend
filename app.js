import express from "express";
import connectDB from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import path from "path";

const app = express();
config({ path: "./.env" });

app.use(
  cors({
    origin: [
      "https://medicore-web1.netlify.app", // remove trailing slash
      "http://localhost:5173",
      "http://localhost:5174",
      "https://medicore-admin.netlify.app/login",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, // allow cookies
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(process.cwd(), "tmp/"), // <-- Windows-friendly path
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

connectDB();

app.use(errorMiddleware);
export default app;
