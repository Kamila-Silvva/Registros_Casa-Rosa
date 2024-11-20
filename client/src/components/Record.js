// src/components/Record.js
import React, { useState, useEffect } from 'react';

function Record() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    entryDate: '',
    exitDate: '',
    description: '',
    attendant: '',
    needsFollowUp: 'Sim',
  });

  // Carregar registros do backend quando o componente for montado
  useEffect(() => {
    fetch('http://localhost:5000/api/records')
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error('Erro ao carregar os registros:', error));
  }, []);

  // Função para lidar com as mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para enviar um novo registro
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecords([...records, data]);
        clearForm();
      })
      .catch((error) => console.error('Erro ao adicionar o registro:', error));
  };

  // Função para limpar o formulário
  const clearForm = () => {
    setFormData({
      name: '',
      entryDate: '',
      exitDate: '',
      description: '',
      attendant: '',
      needsFollowUp: 'Sim',
    });
  };

  return (
    <div className="container">
      <h1>Sistema de Registro - ONG</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="entryDate">Data de Entrada:</label>
          <input
            type="date"
            id="entryDate"
            name="entryDate"
            value={formData.entryDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exitDate">Data de Saída:</label>
          <input
            type="date"
            id="exitDate"
            name="exitDate"
            value={formData.exitDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="attendant">Atendido por:</label>
          <input
            type="text"
            id="attendant"
            name="attendant"
            value={formData.attendant}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="needsFollowUp">Precisa de Atendimento?</label>
          <select
            id="needsFollowUp"
            name="needsFollowUp"
            value={formData.needsFollowUp}
            onChange={handleInputChange}
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>

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
                <button>Edit</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Record;
