import { tutorService } from "../services/tutorService.js";
import { lerId } from "../utils/id.js";

export const tutorController = {
  async listar(req, res) {
    res.json(await tutorService.listar());
  },

  async buscar(req, res) {
    res.json(await tutorService.buscar(lerId(req.params.id)));
  },

  async criar(req, res) {
    res.status(201).json(await tutorService.criar(req.body));
  },

  async atualizar(req, res) {
    res.json(await tutorService.atualizar(lerId(req.params.id), req.body));
  },

  async excluir(req, res) {
    await tutorService.excluir(lerId(req.params.id));
    res.status(204).send();
  },
};