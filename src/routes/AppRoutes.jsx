import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { GerenciarDoacoes } from '../pages/GerenciarDoacoes';
import { Footer } from '../components/Footer';

// Função para verificar se o usuário está logado
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('@ConectaAjuda:token');
  return token ? children : <Navigate replace to="/login" />;
};

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Agora o Dashboard é PÚBLICO */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rotas que continuam PROTEGIDAS (Só para Logado/Admin) */}
        <Route 
          path="/gerenciar" 
          element={
            <PrivateRoute>
            <GerenciarDoacoes /> 
            </PrivateRoute>
          } 
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}