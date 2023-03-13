-- Active: 1676323408280@@35.226.146.116@3306@jbl-4416472-mauricio-toledo

### Query que cria a tabela de Bandas
CREATE TABLE IF NOT EXISTS Bands_Name (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  music_genre VARCHAR(255) NOT NULL,
  responsible VARCHAR(255) UNIQUE NOT NULL 
  

);

### Query que cria a tabela de Shows
CREATE TABLE IF NOT EXISTS Table_Shows (
  id VARCHAR(255) PRIMARY KEY,
  week_day VARCHAR(255) NOT NULL,
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  band_id VARCHAR(255) NOT NULL,
  FOREIGN KEY(band_id) REFERENCES Bands_Name(id)
);

### Query que cria tabela de usuários
CREATE TABLE IF NOT EXISTS Lama_Users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
);

###

DROP TABLE `NOME_TABELA_BANDAS`, `NOME_TABELA_SHOWS`;

###

SELECT * FROM `Lama_Users`;