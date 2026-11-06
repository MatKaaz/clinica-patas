import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import FormField from "../components/FormField";
import { useFormulario } from "../hooks/useFormulario";
import { animalService } from "../services/animalService";
import { ESPECIES } from "../utils/constantes";
import { validarAnimal } from "../utils/validators";

const ANIMAL_VAZIO = { nome: "", especie: "", raca: "" };

export default function AnimalFormPage() {
  const { tutorId, animalId } = useParams();
  const editando = Boolean(animalId);
  const navigate = useNavigate();
  const voltarPara = `/tutores/${tutorId}/animais`;

  const { valores, setValores, erros, erroGeral, setErroGeral, enviando, alterarCampo, enviar } =
    useFormulario({
      valoresIniciais: ANIMAL_VAZIO,
      validar: validarAnimal,
      aoEnviar: async (dados) => {
        if (editando) await animalService.atualizar(animalId, dados);
        else await animalService.criar(tutorId, dados);
        navigate(voltarPara);
      },
    });

  useEffect(() => {
    if (!editando) return;
    animalService
      .buscar(animalId)
      .then(({ nome, especie, raca }) => setValores({ nome, especie, raca: raca ?? "" }))
      .catch((e) => setErroGeral(e.message));
  }, [animalId, editando, setValores, setErroGeral]);

  return (
    <section>
      <h1>{editando ? "Editar animal" : "Novo animal"}</h1>
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
          rotulo="Espécie *"
          nome="especie"
          tipo="select"
          value={valores.especie}
          onChange={alterarCampo}
          erro={erros.especie}
        >
          <option value="">Selecione...</option>
          {ESPECIES.map((especie) => (
            <option key={especie} value={especie}>{especie}</option>
          ))}
        </FormField>
        <FormField
          rotulo="Raça"
          nome="raca"
          value={valores.raca}
          onChange={alterarCampo}
          erro={erros.raca}
        />
        <div className="acoes">
          <button type="submit" className="botao botao-primario" disabled={enviando}>
            {enviando ? "Salvando..." : "Salvar"}
          </button>
          <Link to={voltarPara} className="botao">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}