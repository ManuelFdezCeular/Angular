-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2020 a las 18:14:47
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

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
-- Estructura de tabla para la tabla `archivo`
--

CREATE TABLE `archivo` (
  `id` int(3) UNSIGNED NOT NULL,
  `investigador_id` int(4) UNSIGNED NOT NULL,
  `explicacion` varchar(200) DEFAULT NULL,
  `fechaArchivo` date DEFAULT NULL,
  `lugarArchivo` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `archivo`
--

INSERT INTO `archivo` (`id`, `investigador_id`, `explicacion`, `fechaArchivo`, `lugarArchivo`) VALUES
(1, 1, 'La mujer invisible no resultó ser más que una sábana bastante vieja que no se veía a simple vista', '2019-11-30', 'Alcalá del Río');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id` int(3) UNSIGNED NOT NULL,
  `nombreEstado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id`, `nombreEstado`) VALUES
(1, 'En investigación'),
(2, 'Demostrado'),
(3, 'Sin explicación'),
(4, 'Para archivar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fenomenosparanormales`
--

CREATE TABLE `fenomenosparanormales` (
  `id` int(3) UNSIGNED NOT NULL,
  `investigador_id` int(4) UNSIGNED NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `fechaOcurrencia` date NOT NULL,
  `lugarOcurrencia` varchar(20) DEFAULT NULL,
  `provinciaOcurrencia` varchar(20) DEFAULT NULL,
  `comunidadAutonoma` varchar(20) DEFAULT NULL,
  `estado_id` int(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `fenomenosparanormales`
--

INSERT INTO `fenomenosparanormales` (`id`, `investigador_id`, `descripcion`, `fechaOcurrencia`, `lugarOcurrencia`, `provinciaOcurrencia`, `comunidadAutonoma`, `estado_id`) VALUES
(1, 2, 'Movimiento extraño de una persiana en un lugar sin apenas viento. La persiana subía y bajaba sin mot', '2019-09-07', 'Alquézar', 'Huesca', 'Aragón', 1),
(2, 4, 'Sonidos extraños en un hospital abandonado durante el día, intensificados cuando llegan las 2 de la ', '2019-10-04', 'Alarcón', 'Cuenca', 'Castilla-La Mancha', 2),
(3, 1, 'Aullidos en una zona desierta, sin animales alrededor.', '2020-01-05', 'Mojácar', 'Almería', 'Andalucía', 3),
(4, 1, 'Aparición de manchas de sangre en una casa deshabitada desde hace 20 años.', '2020-03-09', 'Pedraza', 'Segovia', 'Castilla y León', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `investigadores`
--

CREATE TABLE `investigadores` (
  `id` int(4) UNSIGNED NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `clave` varchar(100) DEFAULT NULL,
  `dni` varchar(15) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `residencia` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `investigadores`
--

INSERT INTO `investigadores` (`id`, `nombre`, `apellidos`, `clave`, `dni`, `telefono`, `email`, `residencia`) VALUES
(1, 'Federico', 'Fernández López', 'hVYYxR4xKYt4CHH+l+UqvUMaLrtiAnRKI8z2bSudtvEJzbwh9oxqW+h63UEz4y/442aZp5euIzxxVmwlw7KI0w==', '56729832U', '899134333', 'FedFerLop@gmail.com', 'Huesca'),
(2, 'María', 'Rueda Perea', 'hVYYxR4xKYt4CHH+l+UqvUMaLrtiAnRKI8z2bSudtvEJzbwh9oxqW+h63UEz4y/442aZp5euIzxxVmwlw7KI0w==', '67123231H', '812367222', 'MarRuePer@gmail.com', 'Madrid'),
(3, 'Yolanda', 'Silva Romero', 'hVYYxR4xKYt4CHH+l+UqvUMaLrtiAnRKI8z2bSudtvEJzbwh9oxqW+h63UEz4y/442aZp5euIzxxVmwlw7KI0w==', '45628909B', '678111021', 'YolSilRom@gmail.com', 'Bilbao'),
(4, 'Rodrigo', 'Zambrano Rodriguez', 'hVYYxR4xKYt4CHH+l+UqvUMaLrtiAnRKI8z2bSudtvEJzbwh9oxqW+h63UEz4y/442aZp5euIzxxVmwlw7KI0w==', '43210987D', '998765123', 'RodZamRod@gmail.com', 'Barcelona');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `investigador_id` (`investigador_id`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fenomenosparanormales`
--
ALTER TABLE `fenomenosparanormales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `investigador_id` (`investigador_id`),
  ADD KEY `estado_id` (`estado_id`);

--
-- Indices de la tabla `investigadores`
--
ALTER TABLE `investigadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo`
--
ALTER TABLE `archivo`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `fenomenosparanormales`
--
ALTER TABLE `fenomenosparanormales`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `investigadores`
--
ALTER TABLE `investigadores`
  MODIFY `id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD CONSTRAINT `archivo_ibfk_1` FOREIGN KEY (`investigador_id`) REFERENCES `investigadores` (`id`);

--
-- Filtros para la tabla `fenomenosparanormales`
--
ALTER TABLE `fenomenosparanormales`
  ADD CONSTRAINT `fenomenosparanormales_ibfk_1` FOREIGN KEY (`investigador_id`) REFERENCES `investigadores` (`id`),
  ADD CONSTRAINT `fenomenosparanormales_ibfk_2` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
