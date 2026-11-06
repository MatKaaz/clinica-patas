import { useCallback, useEffect, useState } from "react";

export function useCarregar(funcaoDeCarga) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      setDados(await funcaoDeCarga());
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, [funcaoDeCarga]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { dados, carregando, erro, recarregar: carregar };
}