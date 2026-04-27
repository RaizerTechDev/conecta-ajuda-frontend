import { ArrowRight } from "lucide-react";
import logoIconeAjuda from "../../assets/images/logo-icone-ajuda.png";
import "./styles.scss";

export function Header() {
  const user = JSON.parse(localStorage.getItem('@ConectaAjuda:user'));

  const handleNavigate = (path) => {
    window.open(path, "_blank");
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => window.location.href = '/'}>
        <img src={logoIconeAjuda} alt="Logo Conecta Ajuda" className="logo-img" />
        <h2 className="logo-text">
          Conecta <em className="changeColor">Ajuda</em>
        </h2>
      </div>

      {user ? (
        <button onClick={() => handleNavigate('/dashboard')} className="btn-login">
          Ir para Painel <ArrowRight size={18} />
        </button>
      ) : (
        <button onClick={() => handleNavigate('/login')} className="btn-login">
          Área do Administrativo <ArrowRight size={18} />
        </button>
      )}
    </nav>
  );
}