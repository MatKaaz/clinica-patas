import { Router } from "express";
import { animalController } from "../controllers/animalController.js";
import { tutorController } from "../controllers/tutorController.js";
import { asyncHandler as tratar } from "../utils/asyncHandler.js";

export const tutorRoutes = Router();

tutorRoutes.get("/", tratar(tutorController.listar));
tutorRoutes.post("/", tratar(tutorController.criar));
tutorRoutes.get("/:id", tratar(tutorController.buscar));
tutorRoutes.put("/:id", tratar(tutorController.atualizar));
tutorRoutes.delete("/:id", tratar(tutorController.excluir));

// Animais de um tutor
tutorRoutes.get("/:tutorId/animais", tratar(animalController.listarPorTutor));
tutorRoutes.post("/:tutorId/animais", tratar(animalController.criar));