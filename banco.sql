CREATE DATABASE ong;

USE ong;

-- Tabela de registros
CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,        
    nome VARCHAR(100) NOT NULL,               
    data_entrada DATE NOT NULL,               
    data_saida DATE,                          
    descricao TEXT,                           
    atendido_por VARCHAR(100),
    cpf varchar(14),
    telefone varchar(12)
);


select * from registros