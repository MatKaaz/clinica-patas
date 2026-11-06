import { ValidationError } from "../errors/AppError.js";
import { ESPECIES } from "../utils/constantes.js";

const textoOuVazio = (valor) => (typeof valor === "string" ? valor.trim() : "");

export function validarAnimal(dados) {
  const nome = textoOuVazio(dados?.nome);
  const especie = textoOuVazio(dados?.especie);
  const raca = textoOuVazio(dados?.raca);
  const erros = {};

  if (!nome) erros.nome = "Informe o nome do animal.";
  else if (nome.length > 100) erros.nome = "O nome deve ter no máximo 100 caracteres.";

  if (!especie) erros.especie = "Selecione a espécie.";
  else if (!ESPECIES.includes(especie)) erros.especie = "Espécie inválida.";

  if (raca.length > 100) erros.raca = "A raça deve ter no máximo 100 caracteres.";

  if (Object.keys(erros).length > 0) throw new ValidationError(erros);

  return { nome, especie, raca: raca || null };
}