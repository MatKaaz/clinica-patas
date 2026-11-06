export class AppError extends Error {
  constructor(mensagem, status, detalhes) {
    super(mensagem);
    this.status = status;
    this.detalhes = detalhes;
  }
}

export class ValidationError extends AppError {
  constructor(detalhes) {
    super("Dados inválidos. Corrija os campos destacados.", 400, detalhes);
  }
}

export class NotFoundError extends AppError {
  constructor(mensagem) {
    super(mensagem, 404);
  }
}

export class ConflictError extends AppError {
  constructor(mensagem) {
    super(mensagem, 409);
  }
}