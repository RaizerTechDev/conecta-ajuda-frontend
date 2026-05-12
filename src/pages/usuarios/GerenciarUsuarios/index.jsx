import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { User, ShieldCheck, Heart, Building2, Users, Loader2 } from 'lucide-react';
import './styles.scss';

export function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersRes, centrosRes] = await Promise.all([
          api.get('/usuarios'),
          api.get('/centros-distribuicao')
        ]);
        setUsuarios(usersRes.data.usuarios || []);
        setCentros(centrosRes.data || []);
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdateCD = async (userId, newCentroId) => {
  setUpdatingId(userId);
  
  try {
    // 1. Encontra o usuário atual no estado
    const userToUpdate = usuarios.find(u => u.id === userId);

    // 2. Cria o payload EXATAMENTE como o backend espera
    // Não envie o objeto 'userToUpdate' inteiro, pois ele contém o 'id'
    const payload = {
      nome: userToUpdate.nome,
      email: userToUpdate.email,
      tipo: userToUpdate.tipo,
      centro_id: newCentroId ? Number(newCentroId) : null
    };

    console.log("Enviando atualização:", payload);

    // 3. Chamada à API
    await api.put(`/usuarios/${userId}`, payload);
    
    // 4. Atualiza o estado local para refletir a mudança no select
    setUsuarios(prev => prev.map(u => 
      u.id === userId ? { ...u, centro_id: payload.centro_id } : u
    ));

    alert("Centro de Distribuição atualizado!");
  } catch (err) {
    console.error("Erro detalhado:", err.response?.data);
    alert(err.response?.data?.error || "Erro ao atualizar. Verifique o console.");
  } finally {
    setUpdatingId(null);
  }
};

  if (loading) return <div className="loading-state"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="users-dashboard">
      <header className="users-header">
        <div className="header-info">
          <h1><Users size={28} /> Gestão de Usuários</h1>
          <p>Visualize e gerencie permissões e locais de atuação</p>
        </div>
      </header>

      <div className="users-grid">
        {usuarios.map(user => (
          <div key={user.id} className="user-card">
            <div className="card-top">
              <div className="avatar-wrapper">
                {user.tipo === 'ADMIN' ? <ShieldCheck size={32} /> : <User size={32} />}
              </div>
              <span className={`badge-role ${user.tipo.toLowerCase()}`}>
                {user.tipo === 'ADMIN' ? 'Administrador' : 'Doador'}
              </span>
            </div>

            <div className="user-info">
              <h3>{user.nome}</h3>
              <p>{user.email}</p>
            </div>

            {/* Seção de Edição Exclusiva para Admins (Remanejamento) */}
            {user.tipo === 'ADMIN' && (
              <div className="edit-section">
                <label><Building2 size={14} /> Centro de Distribuição Atual</label>
                <select 
                  value={user.centro_id || ''}
                  onChange={(e) => handleUpdateCD(user.id, e.target.value)}
                  disabled={updatingId === user.id}
                >
                  {centros.map(centro => (
                    <option key={centro.id} value={centro.id}>
                      {centro.nome || centro.centro_nome}
                    </option>
                  ))}
                </select>
                {updatingId === user.id && <span>Atualizando...</span>}
              </div>
            )}

            {user.tipo === 'DOADOR' && (
              <div className="doador-footer">
                <p><Heart size={14} color="#48bb78" /> Membro Doador</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}