import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useCarregar } from "../hooks/useCarregar";
import { animalService } from "../services/animalService";
import { tutorService } from "../services/tutorService";
import Carregando from "../components/Carregando";

export default function AnimalListPage() {
  const { tutorId } = useParams();
  const carregarTutor = useCallback(() => tutorService.buscar(tutorId), [tutorId]);
  const carregarAnimais = useCallback(() => animalService.listarPorTutor(tutorId), [tutorId]);

  const tutor = useCarregar(carregarTutor);
  const animais = useCarregar(carregarAnimais);
  const [erroExclusao, setErroExclusao] = useState("");

  async function excluirAnimal(animal) {
    if (!window.confirm(`Excluir o animal ${animal.nome}?`)) return;
    setErroExclusao("");
    try {
      await animalService.excluir(animal.id);
      await animais.recarregar();
    } catch (e) {
      setErroExclusao(e.message);
    }
  }

  return (
    <section>
      <Link to="/tutores" className="voltar">← Voltar para tutores</Link>

      <div className="cabecalho-pagina">
        <h1>Animais de {tutor.dados?.nome ?? "..."}</h1>
        <Link to={`/tutores/${tutorId}/animais/novo`} className="botao botao-primario">
          + Novo animal
        </Link>
      </div>

      <Alerta>{tutor.erro || animais.erro || erroExclusao}</Alerta>
      {animais.carregando && <Carregando />}

      {!animais.carregando && !animais.erro && animais.dados?.length === 0 && (
        <p className="vazio">Este tutor ainda não possui animais cadastrados.</p>
      )}

      {animais.dados?.length > 0 && (
        <div className="tabela-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Raça</th>
                <th className="acoes-coluna">Ações</th>
              </tr>
            </thead>
            <tbody>
              {animais.dados.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.nome}</td>
                  <td>{animal.especie}</td>
                  <td>{animal.raca || "—"}</td>
                  <td className="acoes">
                    <Link
                      to={`/tutores/${tutorId}/animais/${animal.id}/editar`}
                      className="botao"
                    >
                      Editar
                    </Link>
                    <button className="botao botao-perigo" onClick={() => excluirAnimal(animal)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}