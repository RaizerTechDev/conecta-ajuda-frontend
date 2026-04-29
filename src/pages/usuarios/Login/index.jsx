import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './styles.scss';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/usuarios/login', { email, senha });
      const { token, usuario } = response.data;

      // Salva os dados de autenticação
      localStorage.setItem('@ConectaAjuda:token', token);
      localStorage.setItem('@ConectaAjuda:user', JSON.stringify(usuario));

      // LÓGICA DE ROTEAMENTO POR PERFIL
      if (usuario.tipo === 'ADMIN') {
        navigate('/dashboard'); // Área de gestão
      } else {
        navigate('/registro-doacoes'); // Área do doador
      }

    } catch (err) {
      alert(err.response?.data?.error || 'Erro ao fazer login. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-card">
        <h2>Login</h2>
        
          <div className="input-group">
          <label><Mail size={16} /> E-mail</label>
          <input 
            type="email" 
            placeholder="seu@email.com"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label><Lock size={16} /> Senha</label>
          <div className="password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Sua senha"
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
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

        <button type="submit" disabled={loading} className="btn-login-submit">
          {loading ? 'Autenticando...' : 'Entrar Agora'}
          {!loading && <ArrowRight size={18} />}
        </button>

        <div className="login-footer">
            <p>Ainda não tem conta? <em onClick={() => navigate('/cadastro')}>Criar Cadastro</em></p>
        </div>
      </form>
    </div>
  );
}