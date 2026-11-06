import { ConflictError, NotFoundError } from "../errors/AppError.js";
import { animalRepository } from "../repositories/animalRepository.js";
import { tutorRepository } from "../repositories/tutorRepository.js";
import { validarTutor } from "../validators/tutorValidator.js";

async function buscarOuFalhar(id) {
  const tutor = await tutorRepository.buscarPorId(id);
  if (!tutor) throw new NotFoundError("Tutor não encontrado.");
  return tutor;
}

export const tutorService = {
  listar: () => tutorRepository.listar(),

  buscar: (id) => buscarOuFalhar(id),

  criar: (dados) => tutorRepository.criar(validarTutor(dados)),

  async atualizar(id, dados) {
    await buscarOuFalhar(id);
    return tutorRepository.atualizar(id, validarTutor(dados));
  },

  async excluir(id) {
    await buscarOuFalhar(id);
    const totalAnimais = await animalRepository.contarPorTutor(id);
    if (totalAnimais > 0) {
      throw new ConflictError(
        "Não é possível excluir o tutor, pois ele ainda possui animais cadastrados. Exclua os animais primeiro."
      );
    }
    await tutorRepository.excluir(id);
  },
};