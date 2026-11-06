const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export class ApiError extends Error {
  constructor(message, status, detalhes = {}) {
    super(message);
    this.status = status;
    this.detalhes = detalhes;
  }
}

export async function request(caminho, { method = "GET", body } = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Não foi possível conectar ao servidor. Tente novamente em instantes.",
      0
    );
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new ApiError(dados.erro ?? "Erro inesperado.", resposta.status, dados.detalhes);
  }
  return dados;
}