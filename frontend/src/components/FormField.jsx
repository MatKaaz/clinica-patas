export default function FormField({ rotulo, nome, erro, tipo = "input", children, ...props }) {
  const Controle = tipo; // "input" ou "select"

  return (
    <div className="campo">
      <label htmlFor={nome}>{rotulo}</label>
      <Controle
        id={nome}
        name={nome}
        className={erro ? "invalido" : ""}
        aria-invalid={Boolean(erro)}
        {...props}
      >
        {children}
      </Controle>
      {erro && <span className="campo-erro">{erro}</span>}
    </div>
  );
}