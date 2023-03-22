import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router/product';
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",router)
mongoose.connect("mongodb://127.0.0.1:27017/we17303");

export const viteNodeApp = app;