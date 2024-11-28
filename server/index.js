const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3001;

// Configuração do banco de dados
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "kamila",
  port: 3306,
  database: "ong"
});

app.use(cors());
app.use(express.json());

// Função para validar dados de entrada
const validateRecord = (req, res, next) => {
  const { nome, cpf, telefone, data_entrada } = req.body;
  if (!nome || !cpf || !telefone || !data_entrada) {
    return res.status(400).send("Nome, CPF, Telefone e Data de Entrada são obrigatórios.");
  }
  next();
};

// Rota para pegar todos os registros
app.get("/api/records", async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM registros");
    res.json(results);
  } catch (err) {
    console.error("Erro ao buscar registros:", err);
    res.status(500).send("Erro ao buscar registros");
  }
});

// Rota para adicionar um novo registro
app.post("/api/records", validateRecord, async (req, res) => {
  const { nome, data_entrada, data_saida, descricao, atendido_por, cpf, telefone } = req.body;

  try {
    const [result] = await db.promise().query(
      "INSERT INTO registros (nome, data_entrada, data_saida, descricao, atendido_por, cpf, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nome, data_entrada, data_saida, descricao, atendido_por, cpf, telefone]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("Erro ao inserir registro:", err);
    res.status(500).send("Erro ao inserir registro");
  }
});

// Rota para editar um registro
app.put("/api/records/:id", validateRecord, async (req, res) => {
  const { id } = req.params;
  const { nome, data_entrada, data_saida, descricao, atendido_por, cpf, telefone } = req.body;

  try {
    const [result] = await db.promise().query(
      "UPDATE registros SET nome = ?, data_entrada = ?, data_saida = ?, descricao = ?, atendido_por = ?, cpf = ?, telefone = ? WHERE id = ?",
      [nome, data_entrada, data_saida, descricao, atendido_por, cpf, telefone, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send("Registro não encontrado");
    }
    res.send("Registro atualizado com sucesso!");
  } catch (err) {
    console.error("Erro ao atualizar registro:", err);
    res.status(500).send("Erro ao atualizar registro");
  }
});

// Rota para excluir um registro
app.delete("/api/records/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.promise().query("DELETE FROM registros WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Registro não encontrado");
    }
    res.send("Registro excluído com sucesso!");
  } catch (err) {
    console.error("Erro ao excluir registro:", err);
    res.status(500).send("Erro ao excluir registro");
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
