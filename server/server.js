const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Dados de exemplo (pode ser substituído por banco de dados)
let records = [];

// Rota para obter registros
app.get('/api/records', (req, res) => {
  res.json(records);
});

// Rota para adicionar um novo registro
app.post('/api/records', (req, res) => {
  const newRecord = req.body;
  records.push(newRecord);
  res.status(201).json(newRecord);
});

// Rota para excluir um registro
app.delete('/api/records/:index', (req, res) => {
  const { index } = req.params;
  records.splice(index, 1);
  res.status(204).send();
});

// Rota para editar um registro
app.put('/api/records/:index', (req, res) => {
  const { index } = req.params;
  const updatedRecord = req.body;
  records[index] = updatedRecord;
  res.json(updatedRecord);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
