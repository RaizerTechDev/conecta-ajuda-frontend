import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Settings,
  User,
  PackageCheck,
  ListPlus,
  LogOut,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import logoIconeAjuda from "../../assets/images/logo-icone-ajuda.png";
import "./styles.scss";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
   const [showGerenciarUsuario, setShowGerenciarUsuario] = useState(false);
   const [showGerenciarDoacao, setShowGerenciarDoacao] = useState(false);
  const  [showGerenciarNecessidade, setShowGerenciarNecessidade] = useState(false);

  // Pega o usuário do localStorage
  const user = JSON.parse(localStorage.getItem("@ConectaAjuda:user"));

  const handleLogout = () => {
    localStorage.removeItem("@ConectaAjuda:token");
    localStorage.removeItem("@ConectaAjuda:user");
    navigate("/");
    window.location.reload(); // Garante que o estado limpe
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate("/")}>
        <Link to="/" className="logo-link">
          <img
            src={logoIconeAjuda}
            alt="Logo Conecta Ajuda"
            className="logo-img"
          />
        </Link>
        <h2 className="logo-text">
          Conecta <em className="changeColor">Ajuda</em>
        </h2>
      </div>

      <div className="nav-actions">
        {user ? (
          user.tipo === "ADMIN" ? (
            /* MENU DO ADMINISTRADOR */
            <div className="admin-menu-container">
              <button
                className="menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Settings size={20} className={isOpen ? "rotate" : ""} />
                <em className="hide-mobile">Painel Admin </em>
                <ChevronDown size={16} />
              </button>

              {isOpen && (
                <>
                  <div
                    className="menu-overlay"
                    onClick={() => setIsOpen(false)}
                  />
                  <nav className="dropdown-menu">
                    <div className="menu-header">
                      <p>Olá, {user.nome}</p>
                      <small>Nível: Administrador</small>
                    </div>

                    <div className="menu-group">
                      <div
                        className={`group-header ${showGerenciarUsuario ? "active" : ""}`}
                        onClick={() => setShowGerenciarUsuario(!showGerenciarUsuario

                        )}
                      >
                        <div className="title-wrapper">
                          <User size={20} />
                          <p>Gerenciar Usuarios</p>
                        </div>
                        {showGerenciarUsuario ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>

                      {/* Renderização condicional dos botões */}
                      {showGerenciarUsuario && (
                        <div className="group-actions animated-fade-in">
                          <button
                            className="menu-subitem"
                            onClick={() => {
                              navigate("/buscar-usuarios");
                              setIsOpen(false);
                            }}
                          >
                            <small>Usuario Cadastrado</small>
                          </button>

                          <button
                            className="menu-subitem"
                            onClick={() => {
                              navigate("/atualizar-usuarios");
                              setIsOpen(false);
                            }}
                          >
                            <small>Atualizar Usuário</small>
                          </button>
                        </div>
                      )}
                    </div>

                  <div className="menu-group">
                      <div
                        className={`group-header ${showGerenciarDoacao ? "active" : ""}`}
                        onClick={() => setShowGerenciarDoacao(!showGerenciarDoacao)}
                      >
                        <div className="title-wrapper">
                           <PackageCheck size={20} />
                          <p>Gerenciar Doações</p>
                        </div>
                        {showGerenciarDoacao ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>

                      {/* Renderização condicional dos botões */}
                      {showGerenciarDoacao && (
                        <div className="group-actions animated-fade-in">
                          <button
                            className="menu-subitem"
                            onClick={() => {
                              navigate("/gerenciar-doacoes");
                              setIsOpen(false);
                            }}
                          >
                            <small>Confirmar Recebimento</small>
                          </button>                          
                        </div>
                      )}
                    </div>

                    <div className="menu-group">
                      <div
                        className={`group-header ${showGerenciarNecessidade ? "active" : ""}`}
                        onClick={() => setShowGerenciarNecessidade(!showGerenciarNecessidade)}
                      >
                        <div className="title-wrapper">
                          <ListPlus size={20} />
                          <p>Gerenciar Necessidades</p>
                        </div>
                        {showGerenciarNecessidade ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>

                      {/* Renderização condicional dos botões */}
                      {showGerenciarNecessidade && (
                        <div className="group-actions animated-fade-in">
                          <button
                            className="menu-subitem"
                            onClick={() => {
                              navigate("/cadastrar-necessidades");
                              setIsOpen(false);
                            }}
                          >
                            <small>Cadastrar Doação</small>
                          </button>

                          <button
                            className="menu-subitem"
                            onClick={() => {
                              navigate("/dashboard");
                              setIsOpen(false);
                            }}
                          >
                            <small>Atualizar Doação</small>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="menu-divider" />

                    <button className="menu-item logout" onClick={handleLogout}>
                      <LogOut size={20} />
                      <p>Sair do Sistema</p>
                    </button>
                  </nav>
                </>
              )}
            </div>
          ) : (
            /* BOTÃO PARA DOADOR LOGADO */
            <button onClick={() => navigate("/login")} className="btn-login">
              Ir para Painel <ArrowRight size={18} />
            </button>
          )
        ) : (
          /* BOTÃO PARA DESLOGADO */
          <button onClick={() => navigate("/login")} className="btn-login">
            Área do Administrativo <ArrowRight size={18} />
          </button>
        )}
      </div>
    </nav>
  );
}
