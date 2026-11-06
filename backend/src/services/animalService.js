import { NotFoundError } from "../errors/AppError.js";
import { animalRepository } from "../repositories/animalRepository.js";
import { validarAnimal } from "../validators/animalValidator.js";
import { tutorService } from "./tutorService.js";

async function buscarOuFalhar(id) {
  const animal = await animalRepository.buscarPorId(id);
  if (!animal) throw new NotFoundError("Animal não encontrado.");
  return animal;
}

export const animalService = {
  async listarPorTutor(tutorId) {
    await tutorService.buscar(tutorId);
    return animalRepository.listarPorTutor(tutorId);
  },

  buscar: (id) => buscarOuFalhar(id),

  async criar(tutorId, dados) {
    await tutorService.buscar(tutorId);
    return animalRepository.criar(tutorId, validarAnimal(dados));
  },

  async atualizar(id, dados) {
    const animal = await buscarOuFalhar(id);
    return animalRepository.atualizar(id, animal.tutorId, validarAnimal(dados));
  },

  async excluir(id) {
    await buscarOuFalhar(id);
    await animalRepository.excluir(id);
  },
};