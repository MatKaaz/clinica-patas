import { ValidationError } from "../errors/AppError.js";
import { extrairDigitos, formatarTelefone, telefoneValido } from "../utils/telefone.js";

const textoOuVazio = (valor) => (typeof valor === "string" ? valor.trim() : "");

export function validarTutor(dados) {
  const nome = textoOuVazio(dados?.nome);
  const digitos = extrairDigitos(dados?.telefone);
  const erros = {};

  if (!nome) erros.nome = "Informe o nome do tutor.";
  else if (nome.length > 100) erros.nome = "O nome deve ter no máximo 100 caracteres.";

  if (!textoOuVazio(dados?.telefone)) {
    erros.telefone = "Informe o telefone.";
  } else if (!telefoneValido(digitos)) {
    erros.telefone = "Telefone inválido. Use DDD + número, ex.: (85) 99999-9999.";
  }

  if (Object.keys(erros).length > 0) throw new ValidationError(erros);

  return { nome, telefone: formatarTelefone(digitos) };
}