import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Settings, PackageCheck, ListPlus, LogOut, ChevronDown } from "lucide-react";

import logoIconeAjuda from "../../assets/images/logo-icone-ajuda.png";
import "./styles.scss";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Pega o usuário do localStorage
  const user = JSON.parse(localStorage.getItem('@ConectaAjuda:user'));

  const handleLogout = () => {
    localStorage.removeItem('@ConectaAjuda:token');
    localStorage.removeItem('@ConectaAjuda:user');
    navigate('/');
    window.location.reload(); // Garante que o estado limpe
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate('/')}>
        <Link to="/" className="logo-link">
          <img src={logoIconeAjuda} alt="Logo Conecta Ajuda" className="logo-img" />
        </Link>
        <h2 className="logo-text">
          Conecta <em className="changeColor">Ajuda</em>
        </h2>
      </div>

      <div className="nav-actions">
        {user ? (
          user.tipo === 'ADMIN' ? (
            /* MENU DO ADMINISTRADOR */
            <div className="admin-menu-container">
              <button className="menu-trigger" onClick={() => setIsOpen(!isOpen)}>
                <Settings size={20} className={isOpen ? 'rotate' : ''} />
                <span className="hide-mobile">Painel Admin</span>
                <ChevronDown size={16} />
              </button>

              {isOpen && (
                <>
                  <div className="menu-overlay" onClick={() => setIsOpen(false)} />
                  <nav className="dropdown-menu">
                    <div className="menu-header">
                      <p>Olá, {user.nome}</p>
                      <small>Nível: Administrador</small>
                    </div>

                    <button className="menu-item" onClick={() => { navigate('/gerenciar-entregas'); setIsOpen(false); }}>
                      <PackageCheck size={20} />
                      <div className="item-text">
                        <p>Gerenciar Doações</p>
                        <small>Confirmar recebimentos</small>
                      </div>
                    </button>

                    <button className="menu-item" onClick={() => { navigate('/admin-necessidades'); setIsOpen(false); }}>
                      <ListPlus size={20} />
                      <div className="item-text">
                        <p>Gerenciar Necessidades</p>
                        <small>Cadastrar itens</small>
                      </div>
                    </button>

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
            <button onClick={() => navigate('/dashboard')} className="btn-login">
              Ir para Painel <ArrowRight size={18} />
            </button>
          )
        ) : (
          /* BOTÃO PARA DESLOGADO */
          <button onClick={() => navigate('/login')} className="btn-login">
            Área do Administrativo <ArrowRight size={18} />
          </button>
        )}
      </div>
    </nav>
  );
}