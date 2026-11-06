const TELEFONE_VALIDO = /^\d{10,11}$/; // DDD + número (fixo ou celular)

export function validarTutor({ nome, telefone }) {
  const erros = {};

  if (!nome.trim()) {
    erros.nome = "Informe o nome do tutor.";
  }

  if (!telefone.trim()) {
    erros.telefone = "Informe o telefone.";
  } else if (!TELEFONE_VALIDO.test(telefone.replace(/\D/g, ""))) {
    erros.telefone = "Telefone inválido. Use DDD + número, ex.: (85) 99999-9999.";
  }

  return erros;
}

export function validarAnimal({ nome, especie }) {
  const erros = {};

  if (!nome.trim()) erros.nome = "Informe o nome do animal.";
  if (!especie) erros.especie = "Selecione a espécie.";

  return erros;
}