import React, { useState, useEffect } from 'react'; // Importa as funcionalidades necessárias do React.
import axios from 'axios'; // Importa a biblioteca Axios para realizar requisições HTTP.
import './App.css'; // Importa o arquivo CSS para estilizar o componente.

function App() {
  // Declara os estados do componente usando o Hook useState.
  const [records, setRecords] = useState([]); // Armazena os registros de entrada/saída.
  const [formData, setFormData] = useState({ // Armazena os dados do formulário.
    name: '',
    entryDate: '',
    exitDate: '',
    description: '',
    attendant: '',
    needsFollowUp: 'Sim'
  });

  // useEffect é usado para buscar os registros quando o componente for montado.
  useEffect(() => {
    axios.get('http://localhost:5000/api/records') // Realiza uma requisição GET para buscar os registros.
      .then(response => setRecords(response.data)) // Atualiza o estado 'records' com os dados da resposta.
      .catch(error => console.error('Erro ao buscar registros', error)); // Exibe um erro no console se houver falha.
  }, []); // O array vazio significa que o useEffect será executado apenas uma vez após o componente ser montado.

  // Função para lidar com mudanças nos campos do formulário.
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestrutura o nome e o valor do campo do formulário.
    setFormData({
      ...formData, // Preserva os outros campos do formulário.
      [name]: value // Atualiza o campo específico com o novo valor.
    });
  };

  // Função chamada quando o formulário é enviado.
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página).

    // Validação das datas antes de enviar os dados.
    if (!isValidDate(formData.entryDate)) {
      alert('Data de entrada inválida');
      return;
    }

    if (formData.exitDate && !isValidDate(formData.exitDate)) {
      alert('Data de saída inválida');
      return;
    }

    // Envia uma requisição POST para salvar os dados do formulário no servidor.
    axios.post('http://localhost:5000/api/records', formData)
      .then(response => {
        setRecords([...records, response.data]); // Adiciona o novo registro à lista existente.
        setFormData({ // Limpa o formulário após salvar os dados.
          name: '',
          entryDate: '',
          exitDate: '',
          description: '',
          attendant: '',
          needsFollowUp: 'Sim'
        });
      })
      .catch(error => console.error('Erro ao salvar registro', error)); // Exibe um erro no console se houver falha.
  };

  // Função para excluir um registro da lista.
  const handleDelete = (index) => {
    axios.delete(`http://localhost:5000/api/records/${index}`) // Envia uma requisição DELETE para o servidor.
      .then(() => {
        const updatedRecords = records.filter((_, i) => i !== index); // Filtra os registros para remover o excluído.
        setRecords(updatedRecords); // Atualiza o estado com os registros restantes.
      })
      .catch(error => console.error('Erro ao excluir registro', error)); // Exibe um erro no console se houver falha.
  };

  // Função para editar um registro existente.
  const handleEdit = (index) => {
    const record = records[index]; // Obtém o registro a ser editado.
    setFormData(record); // Preenche o formulário com os dados do registro.
    handleDelete(index); // Exclui o registro da lista após ser editado.
  };

  // Função para validar se uma data está no formato correto (YYYY-MM-DD).
  const isValidDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Define o padrão de data (AAAA-MM-DD).
    if (!regex.test(date)) return false; // Verifica se a data está no formato correto.

    const [year, month, day] = date.split("-").map(Number); // Divide a data em ano, mês e dia.
    if (year < 1900 || year > 2100) return false; // Verifica se o ano está dentro de um intervalo válido.

    const parsedDate = new Date(year, month - 1, day); // Cria um objeto Date com os dados fornecidos.
    return parsedDate.getFullYear() === year &&
           parsedDate.getMonth() === month - 1 &&
           parsedDate.getDate() === day; // Verifica se a data é válida.
  };

  return (
    <div className="container">
      <h1>Sistema de Registro - ONG</h1>
      {/* Formulário para criar e editar registros */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="entryDate">Data de Entrada:</label>
          <input type="date" id="entryDate" name="entryDate" value={formData.entryDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="exitDate">Data de Saída (opcional):</label>
          <input type="date" id="exitDate" name="exitDate" value={formData.exitDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="attendant">Atendido por:</label>
          <input type="text" id="attendant" name="attendant" value={formData.attendant} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="needsFollowUp">Precisa de Atendimento?</label>
          <select id="needsFollowUp" name="needsFollowUp" value={formData.needsFollowUp} onChange={handleChange}>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>

      {/* Tabela para exibir os registros */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Descrição</th>
            <th>Atendido por</th>
            <th>Precisa de Atendimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.entryDate}</td>
              <td>{record.exitDate}</td>
              <td>{record.description}</td>
              <td>{record.attendant}</td>
              <td>{record.needsFollowUp}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="edit-btn">Editar</button>
                <button onClick={() => handleDelete(index)} className="delete-btn">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
