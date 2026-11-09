import { useEffect, useState } from "react";

const ATRASO_AVISO_MS = 4000;

export default function Carregando({ mensagem = "Carregando..." }) {
  const [demorando, setDemorando] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => setDemorando(true), ATRASO_AVISO_MS);
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <div className="carregando" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{mensagem}</p>
      {demorando && (
        <p className="carregando-aviso">
          O servidor pode estar em repouso. A primeira resposta pode levar cerca de 1 minuto.
        </p>
      )}
    </div>
  );
}