import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Check } from 'lucide-react';
import './styles.scss';

export function GerenciarDoacoes() {
  const [doacoes, setDoacoes] = useState([]);

  useEffect(() => {
    loadDoacoes();
  }, []);

  async function loadDoacoes() {
    const response = await api.get('/registro-doacoes');
    setDoacoes(response.data);
  }

  async function handleConfirmarEntrega(id) {
    try {
      // O PUT que dá o "xeque-mate" e atualiza o estoque no Back-end
      await api.put(`/registro-doacoes/${id}`, { status: 'ENTREGUE' });
      alert('Entrega confirmada! O estoque foi atualizado.');
      loadDoacoes(); // Recarrega a lista
    } catch (err) {
      alert('Erro ao confirmar entrega.');
    }
  }

  return (
    <div className="gerenciar-container">
      <h2>Doações Pendentes de Recebimento</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Doador</th>
              <th>Item</th>
              <th>Qtd</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {doacoes.filter(d => d.status === 'PENDENTE').map(doacao => (
              <tr key={doacao.id}>
                <td>{doacao.doador_nome}</td>
                <td>{doacao.item_nome || doacao.item_avulso_nome}</td>
                <td>{doacao.quantidade}</td>
                <td><span className="badge-pending">{doacao.status}</span></td>
                <td>
                  <button 
                    onClick={() => handleConfirmarEntrega(doacao.id)}
                    className="btn-success"
                  >
                    <Check size={16} /> Confirmar Chegada
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}