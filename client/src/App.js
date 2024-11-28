import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Registro() {
  // Defina os estados iniciais para 'values', 'nome' e 'idade'.
  const [values, setValues] = useState({
    nome: '',
    idade: '',
    data_entrada: '',
    data_saida: '',
    descricao: '',
    atendido_por: ''
  });

  // Função para lidar com as alterações nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Função para enviar os dados do formulário para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos obrigatórios estão preenchidos
    if (!values.nome || !values.data_entrada || !values.atendido_por) {
      alert('Nome, Data de Entrada e Atendido Por são obrigatórios.');
      return;
    }

    try {
      // Enviar os dados para o servidor via POST
      const response = await axios.post('http://localhost:3001/api/records', {
        nome: values.nome,
        data_entrada: values.data_entrada,
        data_saida: values.data_saida,
        descricao: values.descricao,
        atendido_por: values.atendido_por,
      });

      // Se a inserção for bem-sucedida
      console.log('Registro inserido:', response.data);
      alert('Registro inserido com sucesso!');
      // Limpar os campos após o envio
      setValues({
        nome: '',
        idade: '',
        data_entrada: '',
        data_saida: '',
        descricao: '',
        atendido_por: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar registro:', error);
      alert('Erro ao cadastrar registro!');
    }
  };

  return (
    <div>
      <h2>Cadastro de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={values.nome}
            onChange={handleChange}
            placeholder="Digite o nome"
            required
          />
        </div>

        <div>
          <label htmlFor="data_entrada">Data de Entrada:</label>
          <input
            type="datetime-local"
            id="data_entrada"
            name="data_entrada"
            value={values.data_entrada}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="data_saida">Data de Saída:</label>
          <input
            type="datetime-local"
            id="data_saida"
            name="data_saida"
            value={values.data_saida}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="atendido_por">Atendido Por:</label>
          <input
            type="text"
            id="atendido_por"
            name="atendido_por"
            value={values.atendido_por}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Registro;
