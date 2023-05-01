import express from "express";
import morgan from "morgan";
import cors from "cors";
import CategoryRouter from "./routes/category.routes.js";
import ProductRouter from "./routes/product.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", CategoryRouter);
app.use("/api", ProductRouter);

export default app;