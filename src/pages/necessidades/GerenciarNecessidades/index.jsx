import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, AlertTriangle, Database, Tag } from 'lucide-react';
import api from '../../../services/api';
import './styles.scss';

export const GerenciarNecessidades = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [isNovaCategoria, setIsNovaCategoria] = useState(false);
  const [centros, setCentros] = useState([]);

  const [formData, setFormData] = useState({
    item_nome: '',
    quantidade_objetivo: '',
    quantidade_atual: 0,
    centro_id: '',
    categoria_nome: '', // O Back usa o nome para fazer a lógica dinâmica
    prioridade: 'MEDIA',
    status: 'ATIVO'
  });

  useEffect(() => {
    // Busca centros e categorias para popular os selects
    api.get('/centros-distribuicao').then(res => setCentros(res.data));
    
    // Ajustado para acessar a chave "categorias" do seu JSON de retorno
    api.get('/categorias').then(res => {
      const lista = res.data.categorias || res.data;
      setCategorias(lista);
    });

if (id) {
  api.get(`/lista-necessidades`).then(res => {
    // Procure o item pelo necessidade_id
    const item = res.data.find(n => Number(n.necessidade_id) === Number(id));
    
    if (item) {
      setFormData({
        item_nome: item.item_nome,
        quantidade_objetivo: item.quantidade_objetivo,
        quantidade_atual: item.quantidade_atual,
        centro_id: item.centro_id || '',
        prioridade: item.prioridade,
        // .trim() remove espaços invisíveis que quebram o match do <select>
        categoria_nome: (item.categorias || item.categoria_nome || '').trim(), 
        status: item.status || 'ATIVO'
      });
    }
  });
}
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const novoStatus = Number(formData.quantidade_atual) >= Number(formData.quantidade_objetivo) 
    ? 'CONCLUIDO' 
    : 'ATIVO';

      const payload = {
        ...formData,
        status: novoStatus,
        quantidade_objetivo: Number(formData.quantidade_objetivo),
        quantidade_atual: Number(formData.quantidade_atual),
        centro_id: Number(formData.centro_id)
      };

      if (id) {
        // Sua rota de update
        await api.put(`/lista-necessidades/${id}`, payload);
        alert("Necessidade atualizada!");
      } else {
        // Sua rota de create
        await api.post('/lista-necessidades', payload);
        alert("Novo item cadastrado!");
      }
      navigate('/dashboard');
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gerenciar-necessidades-page">
      <div className="form-wrapper">
        <header className="form-header">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1>{id ? 'Editar Necessidade' : 'Nova Necessidade'}</h1>
        </header>

        <form onSubmit={handleSubmit} className="admin-form">
          <section className="form-section">
            <div className="input-group">
              <label><Database size={16} /> Nome do Item</label>
              <input 
                type="text" 
                placeholder="Ex: Ração para Cães"
                value={formData.item_nome}
                onChange={e => setFormData({...formData, item_nome: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
  <label><Tag size={16} /> Categoria</label>
  
  {!isNovaCategoria ? (
    <select 
      value={formData.categoria_nome}
      onChange={e => {
        if (e.target.value === "NOVA") {
          setIsNovaCategoria(true);
          setFormData({...formData, categoria_nome: ''});
        } else {
          setFormData({...formData, categoria_nome: e.target.value});
        }
      }}
      required
    >
      <option value="">Selecione a categoria</option>
      {categorias.map(cat => (
        <option key={cat.id} value={cat.nome}>{cat.nome}</option>
      ))}
      <option value="NOVA" style={{ fontWeight: 'bold', color: '#6b46c1' }}>
        + Outra (Digitar nova...)
      </option>
    </select>
  ) : (
    <div className="input-with-action">
      <input 
        type="text" 
        placeholder="Digite o nome da nova categoria"
        value={formData.categoria_nome}
        onChange={e => setFormData({...formData, categoria_nome: e.target.value})}
        autoFocus
        required
      />
      <button 
        type="button" 
        className="btn-cancel-new"
        onClick={() => {
          setIsNovaCategoria(false);
          setFormData({...formData, categoria_nome: ''});
        }}
      >
        Voltar à lista
      </button>
    </div>
  )}
</div>           

              <div className="input-group">
                <label><AlertTriangle size={16} /> Prioridade</label>
                <select 
                  value={formData.prioridade}
                  onChange={e => setFormData({...formData, prioridade: e.target.value})}
                >
                  <option value="CRITICA">CRÍTICA</option>
                  <option value="ALTA">ALTA</option>
                  <option value="MEDIA">MÉDIA</option>
                  <option value="BAIXA">BAIXA</option>
                </select>
              </div>
            
          </section>

          <section className="form-section qty-section">
            <div className="input-row">
              <div className="input-group">
                <label>Qtd. Objetivo (Meta)</label>
                <input 
                  type="number" 
                  value={formData.quantidade_objetivo}
                  onChange={e => setFormData({...formData, quantidade_objetivo: e.target.value})}
                  required
                />
              </div>
              <div className="input-group">
                <label>Qtd. Atual (Estoque)</label>
                <input 
                  type="number" 
                  value={formData.quantidade_atual}
                  onChange={e => setFormData({...formData, quantidade_atual: e.target.value})}
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="input-group">
              <label>Centro de Distribuição</label>
              <select 
                value={formData.centro_id}
                onChange={e => setFormData({...formData, centro_id: e.target.value})}
                required
              >
                <option value="">Selecione o local</option>
                {centros.map(centro => (
                  <option key={centro.id} value={centro.id}>
                    {centro.nome || centro.centro_nome}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Salvando...' : (
              <><Save size={20} /> {id ? 'Salvar Alterações' : 'Adicionar à Lista'}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};