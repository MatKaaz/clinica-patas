import { request } from "./httpClient";

export const animalService = {
  listarPorTutor: (tutorId) => request(`/tutores/${tutorId}/animais`),
  buscar: (id) => request(`/animais/${id}`),
  criar: (tutorId, dados) =>
    request(`/tutores/${tutorId}/animais`, { method: "POST", body: dados }),
  atualizar: (id, dados) => request(`/animais/${id}`, { method: "PUT", body: dados }),
  excluir: (id) => request(`/animais/${id}`, { method: "DELETE" }),
};