// Encaminha erros de funções async para o errorHandler.
export const asyncHandler = (funcao) => (req, res, next) =>
  Promise.resolve(funcao(req, res, next)).catch(next);