DROP DATABASE redFenomenosParanormales;
CREATE DATABASE IF NOT EXISTS redFenomenosParanormales;

ALTER DATABASE redFenomenosParanormales
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

GRANT ALL PRIVILEGES ON redFenomenosParanormales.* TO pc@localhost IDENTIFIED BY 'pc';

USE redFenomenosParanormales;

CREATE TABLE IF NOT EXISTS investigadores (
  id INT(4) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30),
  apellidos VARCHAR(30),
  clave VARCHAR(60),
  dni VARCHAR(10),
  telefono VARCHAR(15),
  email VARCHAR(40),
  residencia VARCHAR(20)
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS estados (
  id INT(3) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  estado VARCHAR(20) NOT NULL
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS fenomenosParanormales (
  id INT(3) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  investigador_id INT(4) UNSIGNED NOT NULL,
  descripcion VARCHAR(300),
  fechaOcurrencia DATE NOT NULL,
  lugarOcurrencia VARCHAR(20),
  provinciaOcurrencia VARCHAR(20),
  comunidadAutonoma VARCHAR(20),
  estado_id INT(3) UNSIGNED NOT NULL,
  FOREIGN KEY (investigador_id) REFERENCES investigadores(id),
  FOREIGN KEY (estado_id) REFERENCES estados(id)
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS archivo (
  id INT(3) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  investigador_id INT(4) UNSIGNED NOT NULL,
  explicacion VARCHAR(100),
  fechaArchivo DATE NOT NULL,
  lugarArchivo VARCHAR(20),
  FOREIGN KEY (investigador_id) REFERENCES investigadores(id)
) engine=InnoDB;