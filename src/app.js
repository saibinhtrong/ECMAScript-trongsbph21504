import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routerProduct from './router/product';
import routerCategory from './router/category';
import routerAuth from './router/auth';
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",routerProduct)
app.use("/api",routerCategory)
app.use("/api",routerAuth)
mongoose.connect("mongodb://127.0.0.1:27017/Ass_Type");

export const viteNodeApp = app;