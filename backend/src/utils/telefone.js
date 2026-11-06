export function extrairDigitos(telefone) {
  return String(telefone ?? "").replace(/\D/g, "");
}

export function telefoneValido(digitos) {
  return /^\d{10,11}$/.test(digitos); // DDD + 8 ou 9 dígitos
}

// "85999999999" -> "(85) 99999-9999"
export function formatarTelefone(digitos) {
  const ddd = digitos.slice(0, 2);
  const numero = digitos.slice(2);
  const corte = numero.length - 4;
  return `(${ddd}) ${numero.slice(0, corte)}-${numero.slice(corte)}`;
}