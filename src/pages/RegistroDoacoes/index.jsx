import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Package, Hash, MessageCircle, Send } from 'lucide-react';
import api from '../../services/api';
import './styles.scss';

export const RegistroDoacoes = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para pegar o item vindo do botão "Ajudar com este item"
  
  const [itensPrioritarios, setItensPrioritarios] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    necessidade_id: '',
    item_avulso_nome: '',
    quantidade_doada: 1,
  });

  useEffect(() => {
    async function fetchNecessidades() {
      try {
        // CORREÇÃO AQUI: Usando a mesma rota do seu Dashboard
        const response = await api.get('/lista-necessidades');
        const dados = Array.isArray(response.data) ? response.data : [];
        setItensPrioritarios(dados);

        // Se o usuário veio do dashboard clicando em um item específico:
        if (location.state?.item) {
          setFormData(prev => ({
            ...prev,
            necessidade_id: location.state.item.necessidade_id // Usando necessidade_id como no seu dash
          }));
        }
      } catch (err) {
        console.error("Erro ao carregar necessidades para o doador:", err);
      }
    }
    fetchNecessidades();
  }, [location.state]);

const handleConfirmarDoacao = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const user = JSON.parse(localStorage.getItem('@ConectaAjuda:user'));
    
    // 1. Buscamos o objeto do item selecionado para pegar o NOME dele
    const itemSelecionado = itensPrioritarios.find(
      (it) => Number(it.necessidade_id) === Number(formData.necessidade_id)
    );

    // 2. Montamos o payload PRIORIZANDO o que o seu banco já aceita
    const payload = {
      usuario_id: Number(user?.id),
      quantidade_doada: Number(formData.quantidade_doada),
      status: 'PENDENTE',
      // Se for da lista, enviamos o nome dele. Se for avulso, o texto digitado.
      item_avulso_nome: itemSelecionado ? itemSelecionado.item_nome : formData.item_avulso_nome
    };

    // 3. Opcional: Manter o ID caso o backend precise para o JOIN futuro
    if (formData.necessidade_id) {
      payload.necessidade_id = Number(formData.necessidade_id);
    }

    console.log("Enviando para o banco:", payload);

    await api.post('/registro-doacoes', payload);
    
    alert("Doação registrada com sucesso!");
    setFormData({ necessidade_id: '', item_avulso_nome: '', quantidade_doada: 1 });
    navigate('/dashboard');

  } catch (err) {
    console.error("Erro no envio:", err.response?.data);
    alert("Erro ao registrar. Verifique se todos os campos estão preenchidos.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="registro-doacoes-page">
      <div className="main-wrapper">
        <header className="registro-header">
          <div className="icon-badge"><Heart size={32} color="#fff" fill="#fff" /></div>
          <h2>Registrar Doação</h2>
          <p className="subtitle">Gaspar agradece sua solidariedade!</p>
        </header>

        <form onSubmit={handleConfirmarDoacao}>
          <div className="panels-grid">
            {/* PAINEL ITENS URGENTES */}
            <div className={`panel ${formData.necessidade_id ? 'selected' : ''} ${formData.item_avulso_nome ? 'disabled' : ''}`}>
              <div className="panel-label">
                <Package size={20} />
                <h3>Itens da Lista</h3>
              </div>
              <select 
                className="input-style"
                value={formData.necessidade_id}
                onChange={(e) => setFormData({...formData, necessidade_id: e.target.value, item_avulso_nome: ''})}
              >
                <option value="">-- Escolha um item urgente --</option>
                {itensPrioritarios.map(item => (
                  <option key={item.necessidade_id} value={item.necessidade_id}>
                    {item.item_nome} ({item.centro_distribuicao_nome})
                  </option>
                ))}
              </select>
            </div>

            {/* PAINEL ITEM AVULSO */}
            <div className={`panel ${formData.item_avulso_nome ? 'selected' : ''} ${formData.necessidade_id ? 'disabled' : ''}`}>
              <div className="panel-label">
                <MessageCircle size={20} />
                <h3>Outro Item</h3>
              </div>
              <input 
                type="text"
                className="input-style"
                placeholder="Ex: Sofá, Fogão, Brinquedos..."
                value={formData.item_avulso_nome}
                onChange={(e) => setFormData({...formData, item_avulso_nome: e.target.value, necessidade_id: ''})}
              />
            </div>
          </div>

          <div className="action-bar">
            <div className="qty-box">
              <label><Hash size={18} /> Qtd:</label>
              <input 
                type="number" 
                min="1"
                value={formData.quantidade_doada}
                onChange={(e) => setFormData({...formData, quantidade_doada: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-confirmar" disabled={loading}>
              <Send size={20} /> {loading ? "Gravando..." : "Confirmar Doação"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};