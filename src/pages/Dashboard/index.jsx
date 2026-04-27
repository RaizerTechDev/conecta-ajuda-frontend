import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { CheckCircle, Loader, LogOut, Heart } from 'lucide-react';
import './styles.scss';

export function Dashboard() {
  const navigate = useNavigate();
  const [necessidades, setNecessidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = localStorage.getItem('@ConectaAjuda:user');
  const user = userData ? JSON.parse(userData) : null;

  function handleLogout() {
    localStorage.removeItem('@ConectaAjuda:token');
    localStorage.removeItem('@ConectaAjuda:user');
    navigate('/');
  }

  async function loadData() {
    try {
      setLoading(true);
      const response = await api.get('/lista-necessidades');
      setNecessidades(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Erro ao carregar dados", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <Loader className="spinner" size={40} />
        <p>Carregando necessidades...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Painel de Necessidades</h1>
          {user ? (
            <p>Bem-vindo, <em>{user.nome}</em></p>
          ) : (
            <p>Seja bem-vindo. Escolha um item abaixo para realizar sua doação.</p>
          )}
        </div>

        <div className="header-actions">
          {/* Botão de Doação Rápida para Visitantes ou Doadores */}
          <button className="btn-donate-now" onClick={() => navigate('/registro-doacoes')}>
            Quero Doar <Heart size={18} />
          </button>

          {user ? (
            <button className="btn-logout" onClick={handleLogout}>
              Sair <LogOut size={18} />
            </button>
          ) : (
            <button className="btn-login-dash" onClick={() => navigate('/login')}>
              Login Admin
            </button>
          )}
        </div>
      </header>

      <div className="cards-grid">
        {necessidades.map(item => (
          <div key={item.necessidade_id} className={`card ${item.prioridade.toLowerCase()}`}>
            <div className="card-header">
              <p className="badge-category">{item.categorias}</p>
              
              <p className={`priority-tag priority-${item.prioridade.toLowerCase()}`}>
                {item.prioridade}
              </p>
              
              <h3>{item.item_nome}</h3>
            </div>

            <div className="progress-section">
              <div className="progress-info">
                <p>Progresso: {item.quantidade_atual} / {item.quantidade_objetivo}</p>
                {item.porcentagem_concluida === 100 && <CheckCircle size={20} color="#48bb78" />}
                <h5>{item.porcentagem_concluida}%</h5>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-fill" 
                  style={{ width: `${item.porcentagem_concluida}%` }}
                ></div>
              </div>
            </div>

            <div className="card-footer">
              <h4><em>Local:</em> {item.centro_distribuicao_nome}</h4>
              <h4><em>Responsáveis:</em> {item.administradores_responsaveis || 'Equipe Local'}</h4>
              
              {user?.tipo === 'ADMIN' ? (
                 <button 
                   className="btn-action" 
                   onClick={() => navigate(`/gerenciar/${item.necessidade_id}`)}
                 >
                   Gerenciar Doação
                 </button>
              ) : (
                <button 
                  className="btn-action-volunteer" 
                  onClick={() => navigate('/registro-doacoes', { state: { item } })}
                >
                  Ajudar com este item
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}