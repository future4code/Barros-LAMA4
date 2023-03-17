-- Active: 1676582098331@@35.226.146.116@3306@jbl-4416547-ricardo-morais

### Query que cria a tabela de Bandas
CREATE TABLE IF NOT EXISTS Bands_Name (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  music_genre VARCHAR(255) NOT NULL,
  responsible VARCHAR(255) UNIQUE NOT NULL 
  

);

### Query que cria a tabela de Shows
CREATE TABLE IF NOT EXISTS Table_Shows (
  id CHAR(36) NOT NULL PRIMARY KEY,
        week_day VARCHAR(30) NOT NULL,
        start_time TIME(0) NOT NULL,
        end_time TIME(0) NOT NULL,
        band_id CHAR(36) NOT NULL,
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

SELECT * FROM `Lama_Users`;

###

SELECT * FROM `Bands_Name`;

###

SELECT * FROM `Table_Shows`;

###

DROP TABLE `Bands_Name`, `Lama_Users`, `Table_Shows`;

###

SELECT * FROM `Lama_Users`;
<<<<<<< HEAD
=======

###

SELECT * FROM `Table_Shows`;
>>>>>>> 6fd8418e0205b5c84fbd61ca69e6626fb5529da5


