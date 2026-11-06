import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useCarregar } from "../hooks/useCarregar";
import { tutorService } from "../services/tutorService";

export default function TutorListPage() {
  const { dados: tutores, carregando, erro, recarregar } = useCarregar(tutorService.listar);
  const [erroExclusao, setErroExclusao] = useState("");

  async function excluirTutor(tutor) {
    if (!window.confirm(`Excluir o tutor ${tutor.nome}?`)) return;
    setErroExclusao("");
    try {
      await tutorService.excluir(tutor.id);
      await recarregar();
    } catch (e) {
      setErroExclusao(e.message);
    }
  }

  return (
    <section>
      <div className="cabecalho-pagina">
        <h1>Tutores</h1>
        <Link to="/tutores/novo" className="botao botao-primario">+ Novo tutor</Link>
      </div>

      <Alerta>{erro || erroExclusao}</Alerta>
      {carregando && <p>Carregando...</p>}

      {!carregando && !erro && tutores?.length === 0 && (
        <p className="vazio">Nenhum tutor cadastrado ainda.</p>
      )}

      {tutores?.length > 0 && (
        <div className="tabela-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th className="acoes-coluna">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tutores.map((tutor) => (
                <tr key={tutor.id}>
                  <td>{tutor.nome}</td>
                  <td>{tutor.telefone}</td>
                  <td className="acoes">
                    <Link to={`/tutores/${tutor.id}/animais`} className="botao">Animais</Link>
                    <Link to={`/tutores/${tutor.id}/editar`} className="botao">Editar</Link>
                    <button className="botao botao-perigo" onClick={() => excluirTutor(tutor)}>
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