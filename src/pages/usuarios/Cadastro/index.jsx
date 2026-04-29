import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { User, Mail, Lock, Building2, Heart, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import './styles.scss';

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'DOADOR',
    centro_id: ''
  });

  // Busca os centros assim que o componente é montado
  useEffect(() => {
    async function loadCentros() {
      try {
        const response = await api.get('/centros-distribuicao');
        // Garante que estamos salvando um array
        setCentros(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Erro ao carregar centros. Verifique se a rota no backend é pública.", err);
      }
    }
    loadCentros();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Se for ADMIN, o centro_id é obrigatório
      if (formData.tipo === 'ADMIN' && !formData.centro_id) {
        alert("Por favor, selecione um Centro de Distribuição.");
        setLoading(false);
        return;
      }

      const payload = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        tipo: formData.tipo,
        // Converte para número se for admin, senão envia null
        centro_id: formData.tipo === 'ADMIN' ? Number(formData.centro_id) : null
      };

      await api.post('/usuarios', payload);
      
      alert("Cadastro realizado com sucesso!");
      navigate('/login');
    } catch (err) {
      const mensagem = err.response?.data?.error || "Erro ao cadastrar. Verifique os dados.";
      alert(mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <header>
          <h2>Criar Conta</h2>
          <p>Junte-se ao <strong>Conecta Ajuda</strong></p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="type-selector">
            <button 
              type="button"
              className={formData.tipo === 'DOADOR' ? 'active' : ''}
              onClick={() => setFormData({...formData, tipo: 'DOADOR', centro_id: ''})}
            >
              <Heart size={18} /> Doador
            </button>
            <button 
              type="button"
              className={formData.tipo === 'ADMIN' ? 'active' : ''}
              onClick={() => setFormData({...formData, tipo: 'ADMIN'})}
            >
              <ShieldCheck size={18} /> Administrador
            </button>
          </div>

          <div className="input-group">
            <label><User size={16} /> Nome Completo</label>
            <input 
              type="text" 
              placeholder="Digite seu nome"
              autoComplete="name"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label><Mail size={16} /> E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label><Lock size={16} /> Senha</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                autoComplete="new-password"
                value={formData.senha}
                onChange={e => setFormData({...formData, senha: e.target.value})}
                required 
              />
              <button 
                type="button" 
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* O campo só aparece se o tipo for ADMIN */}
          {formData.tipo === 'ADMIN' && (
            <div className="input-group animated-fade-in">
              <label><Building2 size={16} /> Centro de Distribuição (CD)</label>
              <select 
                value={formData.centro_id}
                onChange={e => setFormData({...formData, centro_id: e.target.value})}
                required
              >
                <option value="">Selecione o local de trabalho</option>
                {centros.length > 0 ? (
                  centros.map(centro => (
                    <option key={centro.id} value={centro.id}>
                      {centro.nome || centro.centro_nome} - {centro.cidade}
                    </option>
                  ))
                ) : (
                  <option disabled>Nenhum centro encontrado</option>
                )}
              </select>
            </div>
          )}

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? "Processando..." : "Finalizar Cadastro"}
          </button>
        </form>

        <footer className="register-footer">
          <p>Já tem uma conta? <em onClick={() => navigate('/login')}>Fazer Login</em></p>
        </footer>
      </div>
    </div>
  );
}