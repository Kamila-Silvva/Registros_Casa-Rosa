CREATE DATABASE ong;

use ong;

CREATE TABLE registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  data_entrada DATETIME,
  data_saida DATETIME,
  descricao TEXT,
  atendido_por VARCHAR(255)
);