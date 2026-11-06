import { animalService } from "../services/animalService.js";
import { lerId } from "../utils/id.js";

export const animalController = {
  async listarPorTutor(req, res) {
    res.json(await animalService.listarPorTutor(lerId(req.params.tutorId)));
  },

  async buscar(req, res) {
    res.json(await animalService.buscar(lerId(req.params.id)));
  },

  async criar(req, res) {
    res.status(201).json(await animalService.criar(lerId(req.params.tutorId), req.body));
  },

  async atualizar(req, res) {
    res.json(await animalService.atualizar(lerId(req.params.id), req.body));
  },

  async excluir(req, res) {
    await animalService.excluir(lerId(req.params.id));
    res.status(204).send();
  },
};