import { Router } from "express";
import { animalController } from "../controllers/animalController.js";
import { asyncHandler as tratar } from "../utils/asyncHandler.js";

export const animalRoutes = Router();

animalRoutes.get("/:id", tratar(animalController.buscar));
animalRoutes.put("/:id", tratar(animalController.atualizar));
animalRoutes.delete("/:id", tratar(animalController.excluir));