-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2021 a las 18:08:54
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sena_llamado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas`
--

CREATE TABLE `fichas` (
  `id` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas_materias`
--

CREATE TABLE `fichas_materias` (
  `ficha_id` varchar(15) NOT NULL,
  `materia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `llamados`
--

CREATE TABLE `llamados` (
  `id` int(11) NOT NULL,
  `regla_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `persona_id` varchar(15) NOT NULL,
  `observacion` varchar(150) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas_fichas`
--

CREATE TABLE `personas_fichas` (
  `ficha_id` varchar(15) NOT NULL,
  `persona_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas_materias`
--

CREATE TABLE `personas_materias` (
  `materia_id` int(11) NOT NULL,
  `persona_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reglas`
--

CREATE TABLE `reglas` (
  `id` int(11) NOT NULL,
  `articulo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `persona_id` varchar(15) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fichas`
--
ALTER TABLE `fichas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fichas_materias`
--
ALTER TABLE `fichas_materias`
  ADD PRIMARY KEY (`ficha_id`),
  ADD KEY `ficha_id` (`ficha_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `llamados`
--
ALTER TABLE `llamados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `regla_id` (`regla_id`),
  ADD KEY `materia_id` (`materia_id`),
  ADD KEY `observacion` (`observacion`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `personas_fichas`
--
ALTER TABLE `personas_fichas`
  ADD KEY `ficha_id` (`ficha_id`),
  ADD KEY `persona_id` (`persona_id`);

--
-- Indices de la tabla `personas_materias`
--
ALTER TABLE `personas_materias`
  ADD KEY `materia_id` (`materia_id`),
  ADD KEY `persona_id` (`persona_id`);

--
-- Indices de la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articulo` (`articulo`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`persona_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `llamados`
--
ALTER TABLE `llamados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reglas`
--
ALTER TABLE `reglas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fichas_materias`
--
ALTER TABLE `fichas_materias`
  ADD CONSTRAINT `fichas_materias_ibfk_1` FOREIGN KEY (`ficha_id`) REFERENCES `fichas` (`id`),
  ADD CONSTRAINT `fichas_materias_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);

--
-- Filtros para la tabla `llamados`
--
ALTER TABLE `llamados`
  ADD CONSTRAINT `llamados_ibfk_1` FOREIGN KEY (`regla_id`) REFERENCES `reglas` (`id`),
  ADD CONSTRAINT `llamados_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`),
  ADD CONSTRAINT `llamados_ibfk_3` FOREIGN KEY (`observacion`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `personas_fichas`
--
ALTER TABLE `personas_fichas`
  ADD CONSTRAINT `personas_fichas_ibfk_1` FOREIGN KEY (`ficha_id`) REFERENCES `fichas` (`id`),
  ADD CONSTRAINT `personas_fichas_ibfk_2` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `personas_materias`
--
ALTER TABLE `personas_materias`
  ADD CONSTRAINT `personas_materias_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`),
  ADD CONSTRAINT `personas_materias_ibfk_2` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`);

--
-- Filtros para la tabla `reglas`
--
ALTER TABLE `reglas`
  ADD CONSTRAINT `reglas_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
