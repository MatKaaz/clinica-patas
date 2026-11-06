import { db } from "../database/client.js";

const COLUNAS = "id, nome, especie, raca, tutor_id";

const paraAnimal = (linha) => ({
  id: Number(linha.id),
  tutorId: Number(linha.tutor_id),
  nome: linha.nome,
  especie: linha.especie,
  raca: linha.raca,
});

export const animalRepository = {
  async listarPorTutor(tutorId) {
    const { rows } = await db.execute({
      sql: `SELECT ${COLUNAS} FROM animais WHERE tutor_id = ? ORDER BY nome`,
      args: [tutorId],
    });
    return rows.map(paraAnimal);
  },

  async buscarPorId(id) {
    const { rows } = await db.execute({
      sql: `SELECT ${COLUNAS} FROM animais WHERE id = ?`,
      args: [id],
    });
    return rows[0] ? paraAnimal(rows[0]) : null;
  },

  async contarPorTutor(tutorId) {
    const { rows } = await db.execute({
      sql: "SELECT COUNT(*) AS total FROM animais WHERE tutor_id = ?",
      args: [tutorId],
    });
    return Number(rows[0].total);
  },

  async criar(tutorId, { nome, especie, raca }) {
    const resultado = await db.execute({
      sql: "INSERT INTO animais (nome, especie, raca, tutor_id) VALUES (?, ?, ?, ?)",
      args: [nome, especie, raca, tutorId],
    });
    return { id: Number(resultado.lastInsertRowid), tutorId, nome, especie, raca };
  },

  async atualizar(id, tutorId, { nome, especie, raca }) {
    await db.execute({
      sql: "UPDATE animais SET nome = ?, especie = ?, raca = ? WHERE id = ?",
      args: [nome, especie, raca, id],
    });
    return { id, tutorId, nome, especie, raca };
  },

  async excluir(id) {
    await db.execute({ sql: "DELETE FROM animais WHERE id = ?", args: [id] });
  },
};