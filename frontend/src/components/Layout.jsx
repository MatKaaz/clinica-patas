import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="topo">
        <div className="container topo-conteudo">
          <Link to="/tutores" className="marca">🐾 Patas & Cia</Link>
          <nav>
            <Link to="/tutores">Tutores</Link>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}