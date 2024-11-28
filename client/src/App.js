import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import "./App.css";

function Registro() {
  const [values, setValues] = useState({
    nome: "",
    data_entrada: "",
    data_saida: "",
    descricao: "",
    atendido_por: "",
    cpf: "",
    telefone: "",
  });

  const [records, setRecords] = useState([]);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [message, setMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (
      !values.nome ||
      !values.data_entrada ||
      !values.cpf ||
      !values.telefone
    ) {
      setMessage({
        type: "error",
        text: "Nome, Data de Entrada, CPF e Telefone são obrigatórios.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataSaida = values.data_saida ? values.data_saida : null;
    const formattedDataEntrada = new Date(values.data_entrada)
      .toISOString()
      .split("T")[0];
    const formattedDataSaida = dataSaida
      ? new Date(dataSaida).toISOString().split("T")[0]
      : null;

    try {
      if (currentEditIndex !== null) {
        const updatedRecord = {
          ...values,
          data_entrada: formattedDataEntrada,
          data_saida: formattedDataSaida,
        };
        const recordId = records[currentEditIndex].id;

        await axios.put(
          `http://localhost:3001/api/records/${recordId}`,
          updatedRecord
        );

        const updatedRecords = [...records];
        updatedRecords[currentEditIndex] = updatedRecord;
        setRecords(updatedRecords);

        setMessage({
          type: "success",
          text: "Registro atualizado com sucesso!",
        });
        setCurrentEditIndex(null);
      } else {
        const response = await axios.post("http://localhost:3001/api/records", {
          ...values,
          data_entrada: formattedDataEntrada,
          data_saida: formattedDataSaida,
        });

        setRecords([...records, response.data]);
        setMessage({ type: "success", text: "Registro inserido com sucesso!" });
      }

      setValues({
        nome: "",
        data_entrada: "",
        data_saida: "",
        descricao: "",
        atendido_por: "",
        cpf: "",
        telefone: "",
      });

      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("Erro ao cadastrar/editar registro:", error);
      setMessage({ type: "error", text: "Erro ao cadastrar/editar registro!" });
    }
  };

  const editRecord = (index) => {
    const record = records[index];
    setValues(record);
    setCurrentEditIndex(index);
  };

  const deleteRecord = async (index) => {
    const id = records[index]?.id;
    if (!id) {
      setMessage({ type: "error", text: "ID do registro é indefinido." });
      return; // Cancela a operação
    }

    try {
      console.log(`Tentando excluir o registro com id: ${id}`);
      await axios.delete(`http://localhost:3001/api/records/${id}`);
      setRecords(records.filter((_, i) => i !== index)); // Remove o registro localmente
      setMessage({ type: "success", text: "Registro excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      setMessage({ type: "error", text: "Erro ao excluir registro!" });
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      record.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.cpf.includes(searchQuery) ||
      record.telefone.includes(searchQuery)
  );

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/records");
        setRecords(response.data);
      } catch (error) {
        console.error("Erro ao carregar os registros:", error);
        setMessage({ type: "error", text: "Erro ao carregar os registros!" });
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="registro-form">
      <h2>Cadastro de Registro</h2>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div>
        <label htmlFor="search">Pesquisar:</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por nome, CPF ou telefone"
          />
          {searchQuery && (
            <button id="limpar-pesquisa" onClick={() => setSearchQuery("")}>
              Limpar Pesquisa
            </button>
          )}
        </div>
      </div>

      {!searchQuery && (
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />

          <label>Data de Entrada:</label>
          <input
            type="date"
            name="data_entrada"
            value={values.data_entrada}
            onChange={handleChange}
          />

          <label>Data de Saída:</label>
          <input
            type="date"
            name="data_saida"
            value={values.data_saida}
            onChange={handleChange}
          />

          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />

          <label>Atendido Por:</label>
          <input
            type="text"
            name="atendido_por"
            value={values.atendido_por}
            onChange={handleChange}
          />

          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={values.cpf}
            onChange={handleChange}
          />

          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={values.telefone}
            onChange={handleChange}
          />

          <button type="submit" id="salvar">
            Salvar
          </button>
        </form>
      )}

      <div className="registro-list">
        <h3>Lista de Registros</h3>
        {filteredRecords.length > 0 ? (
          <table className="registro-tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data Entrada</th>
                <th>Data Saída</th>
                <th>Descrição</th>
                <th>Atendido Por</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{record.nome}</td>
                  <td>{record.data_entrada}</td>
                  <td>{record.data_saida || "Não informado"}</td>
                  <td>{record.descricao}</td>
                  <td>{record.atendido_por}</td>
                  <td>{record.telefone}</td>
                  <td>
                    <div className="button-container">
                      <button
                        className="btn-editar"
                        onClick={() => editRecord(index)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-excluir"
                        onClick={() => deleteRecord(index)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum registro encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Registro;
