import { db } from "../database/client.js";

const paraTutor = (linha) => ({
  id: Number(linha.id),
  nome: linha.nome,
  telefone: linha.telefone,
});

export const tutorRepository = {
  async listar() {
    const { rows } = await db.execute("SELECT id, nome, telefone FROM tutores ORDER BY nome");
    return rows.map(paraTutor);
  },

  async buscarPorId(id) {
    const { rows } = await db.execute({
      sql: "SELECT id, nome, telefone FROM tutores WHERE id = ?",
      args: [id],
    });
    return rows[0] ? paraTutor(rows[0]) : null;
  },

  async criar({ nome, telefone }) {
    const resultado = await db.execute({
      sql: "INSERT INTO tutores (nome, telefone) VALUES (?, ?)",
      args: [nome, telefone],
    });
    return { id: Number(resultado.lastInsertRowid), nome, telefone };
  },

  async atualizar(id, { nome, telefone }) {
    await db.execute({
      sql: "UPDATE tutores SET nome = ?, telefone = ? WHERE id = ?",
      args: [nome, telefone, id],
    });
    return { id, nome, telefone };
  },

  async excluir(id) {
    await db.execute({ sql: "DELETE FROM tutores WHERE id = ?", args: [id] });
  },
};