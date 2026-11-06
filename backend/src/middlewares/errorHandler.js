import { AppError } from "../errors/AppError.js";

// O Express identifica middleware de erro pelos 4 parâmetros.
// eslint-disable-next-line no-unused-vars
export function errorHandler(erro, req, res, next) {
  if (erro instanceof AppError) {
    return res.status(erro.status).json({ erro: erro.message, detalhes: erro.detalhes });
  }

  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "O corpo da requisição não é um JSON válido." });
  }

  console.error(erro);
  return res.status(500).json({ erro: "Erro interno do servidor." });
}