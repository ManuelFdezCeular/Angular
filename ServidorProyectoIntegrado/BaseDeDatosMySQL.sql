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
  residencia VARCHAR(20)
  /*especialidad VARCHAR(30)*/
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS fenomenosParanormales (
  id INT(3) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  investigador_id INT(4) UNSIGNED NOT NULL,
  descripcion VARCHAR(100),
  fechaOcurrencia DATE NOT NULL,
  luegarOcurrencia VARCHAR(20),
  provinciaOcurrencia VARCHAR(20),
  comunidadAutonoma VARCHAR(20),
  FOREIGN KEY (investigacion_id) REFERENCES investigadores(id)
)
