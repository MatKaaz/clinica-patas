import { AppError } from "../errors/AppError.js";

export function lerId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Identificador inválido.", 400);
  }
  return id;
}