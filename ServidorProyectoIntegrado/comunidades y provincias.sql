-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2020 a las 10:45:55
-- Versión del servidor: 10.1.34-MariaDB
-- Versión de PHP: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `redfenomenosparanormales`
--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunidades`
--


CREATE TABLE `comunidades` (
  `codigo` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `comunidades`
--

INSERT INTO `comunidades` (`codigo`, `nombre`) VALUES 
(1, 'Andalucía'),
(2, 'Aragón'),
(3, 'Asturias'),
(4, 'Cantabria'),
(5, 'Castilla la Mancha'),
(6, 'Castilla León'),
(7, 'Cataluña'),
(8, 'Ceuta'),
(9, 'Extremadura'),
(10, 'Galicia'),
(11, 'Islas Baleares'),
(12, 'Islas Canarias'),
(13, 'La Rioja'),
(14, 'Madrid'),
(15, 'Melilla'),
(16, 'Murcia'),
(17, 'Navarra'),
(18, 'País Vasco'),
(19, 'Valencia');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `codigo` int(10) UNSIGNED NOT NULL,
  `codigo_comunidad` int (10) UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`codigo`, `codigo_comunidad`, `nombre`) VALUES
(2, 5, 'Albacete'),
(3, 19,'Alicante/Alacant'),
(4, 1, 'Almería'),
(1, 18, 'Araba/Álava'),
(33, 3, 'Asturias'),
(5, 18, 'Ávila'),
(6, 9, 'Badajoz'),
(7, 11, 'Balears, Illes'),
(8, 7, 'Barcelona'),
(48, 18, 'Bizkaia'),
(9, 6, 'Burgos'),
(10, 9, 'Cáceres'),
(11, 1, 'Cádiz'),
(39, 4, 'Cantabria'),
(12, 19, 'Castellón/Castelló'),
(13, 5, 'Ciudad Real'),
(14, 1, 'Córdoba'),
(15, 10, 'Coruña, A'),
(16, 6, 'Cuenca'),
(20, 18, 'Gipuzkoa'),
(17, 7, 'Girona'),
(18, 1, 'Granada'),
(19, 5, 'Guadalajara'),
(21, 1, 'Huelva'),
(22, 2, 'Huesca'),
(23, 1, 'Jaén'),
(24, 6, 'León'),
(25, 7, 'Lleida'),
(27, 10, 'Lugo'),
(28, 14, 'Madrid'),
(29, 1, 'Málaga'),
(30, 16, 'Murcia'),
(31, 17, 'Navarra'),
(32, 10, 'Ourense'),
(34, 6, 'Palencia'),
(35, 12, 'Palmas, Las'),
(36, 10, 'Pontevedra'),
(26, 13, 'Rioja, La'),
(37, 6, 'Salamanca'),
(38, 12, 'Santa Cruz de Tenerife'),
(40, 6, 'Segovia'),
(41, 1, 'Sevilla'),
(42, 6, 'Soria'),
(43, 7, 'Tarragona'),
(44, 2, 'Teruel'),
(45, 5, 'Toledo'),
(46, 19, 'Valencia/Valéncia'),
(47, 6, 'Valladolid'),
(49, 6, 'Zamora'),
(50, 2, 'Zaragoza'),
(51, 8, 'Ceuta'),
(52, 15, 'Melilla');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `CODIGO` (`codigo`),
  ADD KEY `CODIGO_2` (`codigo`),
  ADD KEY `CODIGO_3` (`codigo`);

ALTER TABLE `provincias`
  ADD CONSTRAINT `cod_com_1` FOREIGN KEY (`codigo_comunidad`) REFERENCES `comunidades` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
