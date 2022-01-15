-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-01-2022 a las 03:43:35
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.4.16

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
  `nombre` varchar(50) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `color`) VALUES
(1, 'Leve', '#5D91F8'),
(2, 'Grave', '#E9BC17'),
(3, 'Gravisimo', '#F85D5D\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fichas`
--

CREATE TABLE `fichas` (
  `id` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fichas`
--

INSERT INTO `fichas` (`id`, `nombre`) VALUES
('205146', 'Analisis de datos');

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
  `docente_id` varchar(15) NOT NULL,
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

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id`, `nombre`) VALUES
(1, 'Algoritmos'),
(2, 'Matematicas'),
(3, 'Algebra'),
(4, 'Etica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `nombre`, `apellido`, `correo`, `fecha_creacion`) VALUES
('000', 'Docente', 'Niez', 'docenteNiez@mail.com', '2021-12-06 21:11:42'),
('123', 'Juan', 'Restrepo', 'jotarestrepo01@gmail.com', '2021-11-28 16:23:37'),
('123456789', 'Juanito', 'Perez', 'juanito@mail.com', '2021-12-12 16:46:07'),
('999', 'javi', 'martinez', 'javi@mail.com', '2022-01-05 21:52:56'),
('9991', 'javi', 'martinez', 'javi@mail.com', '2022-01-05 21:54:29'),
('9992', 'javi', 'martinez', 'javi@mail.com', '2022-01-05 21:58:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas_fichas`
--

CREATE TABLE `personas_fichas` (
  `ficha_id` varchar(15) NOT NULL,
  `persona_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas_fichas`
--

INSERT INTO `personas_fichas` (`ficha_id`, `persona_id`) VALUES
('205146', '000'),
('205146', '123'),
('205146', '999'),
('205146', '9991'),
('205146', '9992');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas_materias`
--

CREATE TABLE `personas_materias` (
  `materia_id` int(11) NOT NULL,
  `persona_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas_materias`
--

INSERT INTO `personas_materias` (`materia_id`, `persona_id`) VALUES
(1, '123'),
(1, '000'),
(2, '000'),
(3, '000');

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

--
-- Volcado de datos para la tabla `reglas`
--

INSERT INTO `reglas` (`id`, `articulo`, `nombre`, `categoria_id`, `descripcion`, `fecha_creacion`) VALUES
(1, '15', 'Concesion de reglas', 1, 'El estudiante no hace caso', '2021-12-06 21:31:21'),
(2, '90', 'Argumento verbal', 2, 'Manera inapropiada de expresarse', '2021-12-06 21:31:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'Estudiante'),
(2, 'Docente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `persona_id` varchar(15) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `persona_id`, `contrasena`, `rol_id`, `fecha_creacion`) VALUES
(1, '000', '123', 2, '2021-12-06 21:11:59'),
(2, '123', '12345', 1, '2021-11-29 22:47:07'),
(5, '123456789', '123', 1, '2021-12-12 16:47:55'),
(6, '123456789', '123', 1, '2022-01-01 19:54:36'),
(7, '123456789', '123', 1, '2022-01-01 19:55:38'),
(8, '123456789', '123', 1, '2022-01-01 19:56:08'),
(9, '123456789', '123', 1, '2022-01-01 19:56:29'),
(10, '123456789', '123', 1, '2022-01-01 19:58:25'),
(15, '999', '123', 1, '2022-01-05 21:52:56'),
(16, '9991', '123', 1, '2022-01-05 21:54:29'),
(17, '9992', '123', 1, '2022-01-05 21:58:11');

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
  ADD KEY `observacion` (`observacion`),
  ADD KEY `llamados_ibfk_3` (`persona_id`),
  ADD KEY `docente_id` (`docente_id`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_id` (`rol_id`),
  ADD KEY `persona_id` (`persona_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `llamados`
--
ALTER TABLE `llamados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reglas`
--
ALTER TABLE `reglas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  ADD CONSTRAINT `llamados_ibfk_3` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `llamados_ibfk_4` FOREIGN KEY (`docente_id`) REFERENCES `personas` (`id`);

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
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
