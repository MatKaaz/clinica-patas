import { useState } from "react";

export function useFormulario({ valoresIniciais, validar, aoEnviar }) {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setValores((atual) => ({ ...atual, [name]: value }));
    setErros((atual) => ({ ...atual, [name]: undefined }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErroGeral("");

    const errosDeValidacao = validar(valores);
    setErros(errosDeValidacao);
    if (Object.keys(errosDeValidacao).length > 0) return;

    setEnviando(true);
    try {
      await aoEnviar(valores);
    } catch (e) {
      setErros(e.detalhes ?? {});
      setErroGeral(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return { valores, setValores, erros, erroGeral, setErroGeral, enviando, alterarCampo, enviar };
}