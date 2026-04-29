import { useEffect, useState } from 'react';
import { PackageCheck, Clock, User, Box, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import './styles.scss';

export const GerenciarDoacoes = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Busca as doações que ainda não foram entregues
  const loadDoacoes = async () => {
    try {
      setLoading(true);
      // Ajuste a rota conforme seu backend (ex: /registro-doacoes ou /doacoes/pendentes)
      const response = await api.get('/registro-doacoes');
      // Filtramos apenas as pendentes no front se o back trouxer todas
      const pendentes = response.data.filter(d => d.status === 'PENDENTE');
      setDoacoes(pendentes);
    } catch (err) {
      console.error("Erro ao carregar doações:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoacoes();
  }, []);

  const handleConfirmarEntrega = async (id) => {
    if (!window.confirm("Confirmar que este item chegou ao Centro de Distribuição?")) return;

    try {
      // Chamada para o seu método updateStatus do backend
      await api.put(`/registro-doacoes/${id}`, { status: 'ENTREGUE' });
      
      // Remove da lista local para dar feedback imediato
      setDoacoes(prev => prev.filter(item => item.registro_id !== id));
      alert("Estoque atualizado e doação confirmada!");
    } catch (err) {
      alert("Erro ao atualizar status.");
    }
  };

  return (
    <div className="gerenciar-doacoes-page">
      <header className="admin-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} /> Voltar
        </button>
        <div className="title-section">
          <h1>Gerenciar Recebimentos</h1>
          <p>Confirme a chegada das doações para atualizar o estoque</p>
        </div>
        <button className="btn-refresh" onClick={loadDoacoes}>
          <RefreshCw size={20} className={loading ? 'spin' : ''} />
        </button>
      </header>

      {loading ? (
        <div className="loading-area">Carregando doações pendentes...</div>
      ) : (
        <div className="admin-grid">
          {doacoes.length > 0 ? (
            doacoes.map((item) => (
              <div key={item.registro_id} className="admin-card">
                <div className="card-status">
                  <Clock size={16} /> Pendente
                </div>
                
                <div className="card-body">
                  <div className="info-row">
                    <User size={18} className="icon" />
                    <div>
                      <span>Doador</span>
                      <strong>{item.doador || 'Anônimo'}</strong>
                    </div>
                  </div>

                  <div className="info-row">
                    <Box size={18} className="icon" />
                    <div>
                      <span>Item</span>
                      <strong>{item.item_doado || item.item_avulso_nome}</strong>
                    </div>
                  </div>

                  <div className="qty-badge">
                    {item.quantidade_doada} unidades
                  </div>
                </div>

                <button 
                  className="btn-confirm-delivery"
                  onClick={() => handleConfirmarEntrega(item.registro_id)}
                >
                  <PackageCheck size={20} /> Confirmar Recebimento
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <PackageCheck size={48} opacity={0.3} />
              <p>Não há doações pendentes no momento.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};