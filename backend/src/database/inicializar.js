import { db } from "./client.js";

export async function inicializarBanco() {
  await db.batch(
    [
      `CREATE TABLE IF NOT EXISTS tutores (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         nome TEXT NOT NULL,
         telefone TEXT NOT NULL
       )`,
      `CREATE TABLE IF NOT EXISTS animais (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         nome TEXT NOT NULL,
         especie TEXT NOT NULL,
         raca TEXT,
         tutor_id INTEGER NOT NULL REFERENCES tutores(id)
       )`,
      `CREATE INDEX IF NOT EXISTS idx_animais_tutor ON animais(tutor_id)`,
    ],
    "write"
  );
}