import { request } from "./httpClient";

export const tutorService = {
  listar: () => request("/tutores"),
  buscar: (id) => request(`/tutores/${id}`),
  criar: (dados) => request("/tutores", { method: "POST", body: dados }),
  atualizar: (id, dados) => request(`/tutores/${id}`, { method: "PUT", body: dados }),
  excluir: (id) => request(`/tutores/${id}`, { method: "DELETE" }),
};