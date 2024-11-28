const express = require("express");
const mysql = require('mysql2'); 
const cors = require("cors");
const App = require('./App');
const port = 3001; // A porta do backend

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "catolica", 
  port: 3307, 
  database: "ong", 
});

app.use(cors());
app.use(express.json());

// Verificação de conexão
db.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados!");
  connection.release(); // Libera a conexão após a verificação
});

// Rota para adicionar um novo registro
app.post("/api/records", (req, res) => {
  const { nome, data_entrada, data_saida, descricao, atendido_por } = req.body;

  // Verifica se os dados essenciais estão presentes
  if (!nome || !data_entrada || !atendido_por) {
    return res.status(400).json({ message: 'Nome, data de entrada e atendido por são obrigatórios' });
  }

  const query = "INSERT INTO registros (nome, data_entrada, data_saida, descricao, atendido_por) VALUES (?, ?, ?, ?, ?)";
  const values = [nome, data_entrada, data_saida, descricao, atendido_por];

  // Realiza a consulta no banco de dados
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar registro:", err);
      return res.status(500).json({ message: 'Erro ao adicionar registro', error: err.message });
    }
    
    console.log("Registro inserido com sucesso:", result);
    res.status(201).json({
      id: result.insertId, // Retorna o ID gerado pelo banco
      nome,
      data_entrada,
      data_saida,
      descricao,
      atendido_por,
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
