import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="topo">
        <div className="container topo-conteudo">
          <Link to="/tutores" className="marca">
            <span className="marca-icone">🐾</span> Patas & Cia
          </Link>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}