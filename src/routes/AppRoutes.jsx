import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { RegistroDoacoes } from '../pages/RegistroDoacoes';
import { GerenciarDoacoes } from '../pages/GerenciarDoacoes';
import { Register } from '../pages/Cadastro';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Função para verificar se o usuário está logado
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('@ConectaAjuda:token');
  return token ? children : <Navigate replace to="/login" />;
};

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Header />  
      <Routes>
        <Route path="/" element={<Home />} />        
       
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        {/* Agora o Dashboard é PÚBLICO */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rotas que continuam PROTEGIDAS (Só para Logado/Doador) */}
        <Route 
          path="/registro-doacoes" 
          element={ 
            <PrivateRoute>
              <RegistroDoacoes />
            </PrivateRoute>
          } 
        />  

        {/* Rotas que continuam PROTEGIDAS (Só para Logado/Admin) */}
        <Route 
          path="/gerenciar-doacoes" 
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