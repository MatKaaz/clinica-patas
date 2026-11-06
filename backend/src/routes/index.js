import { Router } from "express";
import { db } from "../database/client.js";
import { asyncHandler as tratar } from "../utils/asyncHandler.js";
import { animalRoutes } from "./animalRoutes.js";
import { tutorRoutes } from "./tutorRoutes.js";

export const routes = Router();

routes.get(
  "/health",
  tratar(async (req, res) => {
    await db.execute("SELECT 1");
    res.json({ status: "ok", banco: "conectado" });
  })
);
routes.use("/tutores", tutorRoutes);
routes.use("/animais", animalRoutes);