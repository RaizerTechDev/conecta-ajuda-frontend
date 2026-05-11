import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/usuarios/Login';
import { Register } from '../pages/usuarios/Cadastro';
import { Dashboard } from '../pages/necessidades/Dashboard';
import { RegistroDoacoes } from '../pages/doacoes/RegistroDoacoes';
import { GerenciarDoacoes } from '../pages/doacoes/GerenciarDoacoes'; 
import { GerenciarNecessidades } from '../pages/necessidades/GerenciarNecessidades';
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

        {/* Rotas que continuam PROTEGIDAS (Só para Logado/Admin) para gerenciar doações*/}
        <Route 
          path="/gerenciar-doacoes"   
          element={
            <PrivateRoute>
            <GerenciarDoacoes />           
            </PrivateRoute>
          } 
          />

          {/* Rotas que continuam PROTEGIDAS (Só para Logado/Admin) para cadastrar ncessidades*/}
        <Route          
          path="/cadastrar-necessidades"
          element={
            <PrivateRoute>           
            <GerenciarNecessidades />
            </PrivateRoute>
          } 
        />   

             {/* Rotas que continuam PROTEGIDAS (Só para Logado/Admin) para cadastrar ncessidades*/}
        <Route          
          path="/atualizar-necessidades/:id"
          element={
            <PrivateRoute>           
            <GerenciarNecessidades />
            </PrivateRoute>
          } 
        />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}