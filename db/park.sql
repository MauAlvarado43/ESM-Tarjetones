-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: park
-- ------------------------------------------------------
-- Server version	5.7.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `park`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `park` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `park`;

--
-- Table structure for table `carro`
--

DROP TABLE IF EXISTS `carro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carro` (
  `id_car` int(11) NOT NULL AUTO_INCREMENT,
  `placa_car` varchar(10) NOT NULL,
  `marca_car` varchar(50) NOT NULL,
  `smarca_car` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  PRIMARY KEY (`id_car`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carro`
--

LOCK TABLES `carro` WRITE;
/*!40000 ALTER TABLE `carro` DISABLE KEYS */;
/*!40000 ALTER TABLE `carro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empleado` (
  `nom_emp` varchar(100) NOT NULL,
  `id_emp` int(11) NOT NULL AUTO_INCREMENT,
  `num_emp` int(11) NOT NULL,
  `tar_emp` int(11) NOT NULL,
  `rfc_emp` varchar(20) NOT NULL,
  `dep_emp` varchar(100) NOT NULL,
  `ext_emp` varchar(10) NOT NULL,
  `cel_emp` varchar(12) NOT NULL,
  `email` varchar(100) NOT NULL,
  `apat_emp` varchar(50) NOT NULL,
  `amat_emp` varchar(50) NOT NULL,
  `turno` enum('','Matutino','Vespertino') NOT NULL,
  `fun_emp` enum('Funcionario','Docente','PAAE','Posgrado','Interino','Prestador de Servicio') NOT NULL,
  `est_emp` enum('Base','Interinato','Sustitucion','Confianza') DEFAULT NULL,
  PRIMARY KEY (`id_emp`),
  UNIQUE KEY `num_emp` (`num_emp`)
) ENGINE=InnoDB AUTO_INCREMENT=9901729 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registro` (
  `id_reg` int(11) NOT NULL AUTO_INCREMENT,
  `id_car` int(11) NOT NULL,
  `id_emp` int(11) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  PRIMARY KEY (`id_reg`),
  KEY `id_car` (`id_car`),
  KEY `id_emp` (`id_emp`),
  CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`id_car`) REFERENCES `carro` (`id_car`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `registro_ibfk_2` FOREIGN KEY (`id_emp`) REFERENCES `empleado` (`id_emp`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro`
--

LOCK TABLES `registro` WRITE;
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-28 17:26:14
