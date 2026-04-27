import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './styles.scss';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

// Servidor de autenticação
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      
      const { token, usuario } = response.data;

      // Persistindo os dados
      localStorage.setItem('@ConectaAjuda:token', token);
      localStorage.setItem('@ConectaAjuda:user', JSON.stringify(usuario));

      // Redireciona para o dashboard
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao fazer login. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-card">
        <h2>Acesso Administrativo</h2>
        <div className="input-group">
          <label>E-mail</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Autenticando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}