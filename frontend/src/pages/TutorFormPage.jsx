import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import FormField from "../components/FormField";
import { useFormulario } from "../hooks/useFormulario";
import { tutorService } from "../services/tutorService";
import { validarTutor } from "../utils/validators";

const TUTOR_VAZIO = { nome: "", telefone: "" };

export default function TutorFormPage() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();

  const { valores, setValores, erros, erroGeral, setErroGeral, enviando, alterarCampo, enviar } =
    useFormulario({
      valoresIniciais: TUTOR_VAZIO,
      validar: validarTutor,
      aoEnviar: async (dados) => {
        if (editando) await tutorService.atualizar(id, dados);
        else await tutorService.criar(dados);
        navigate("/tutores");
      },
    });

  useEffect(() => {
    if (!editando) return;
    tutorService
      .buscar(id)
      .then(({ nome, telefone }) => setValores({ nome, telefone }))
      .catch((e) => setErroGeral(e.message));
  }, [id, editando, setValores, setErroGeral]);

  return (
    <section>
      <h1>{editando ? "Editar tutor" : "Novo tutor"}</h1>
      <Alerta>{erroGeral}</Alerta>

      <form onSubmit={enviar} noValidate className="formulario">
        <FormField
          rotulo="Nome *"
          nome="nome"
          value={valores.nome}
          onChange={alterarCampo}
          erro={erros.nome}
        />
        <FormField
          rotulo="Telefone *"
          nome="telefone"
          placeholder="(85) 99999-9999"
          value={valores.telefone}
          onChange={alterarCampo}
          erro={erros.telefone}
        />
        <div className="acoes">
          <button type="submit" className="botao botao-primario" disabled={enviando}>
            {enviando ? "Salvando..." : "Salvar"}
          </button>
          <Link to="/tutores" className="botao">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}