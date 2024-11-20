const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(express.json());

// Static files
app.use(express.static('public'));

// Database connection
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err));

// Sample route
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let records = []; // Um array para armazenar os registros

// Rota para buscar todos os registros
app.get('/api/records', (req, res) => {
  res.json(records);
});

// Rota para adicionar um novo registro
app.post('/api/records', (req, res) => {
  const newRecord = req.body;
  records.push(newRecord);
  res.json(newRecord);
});

// Rota para excluir um registro
app.delete('/api/records/:index', (req, res) => {
  const index = req.params.index;
  records.splice(index, 1);
  res.sendStatus(200); // Retorna sucesso
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

