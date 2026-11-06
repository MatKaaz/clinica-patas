import cors from "cors";
import express from "express";
import { config } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { routes } from "./routes/index.js";

export const app = express();

app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);