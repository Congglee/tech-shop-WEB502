import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());

app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);

mongoose.connect("mongodb://localhost:27017/asm-web501");

export const viteNodeApp = app;
