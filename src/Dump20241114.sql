CREATE DATABASE  IF NOT EXISTS `dbportfolio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbportfolio`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: dbportfolio
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20241031145958_InitialMigrations','8.0.8'),('20241031150119_AddSubjectDetail','8.0.8'),('20241031185341_UpdatedTableSubjectAndOthers','8.0.8'),('20241112061555_UpdateStudentDetailTableInDB20241112','8.0.10'),('20241113125952_UpdateTableForStudentInformation','8.0.10');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminusers`
--

DROP TABLE IF EXISTS `adminusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminusers` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Position` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SchoolEmail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Version` int NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminusers`
--

LOCK TABLES `adminusers` WRITE;
/*!40000 ALTER TABLE `adminusers` DISABLE KEYS */;
INSERT INTO `adminusers` VALUES (1,'Juan AdminOne','admin1','admin1','b3+/uX49pDBtgbIhQC21iF5IX2KSck/cpx/8l/cr2j4=','admin@email.ph',4,'LAVV','2024-10-01 00:17:10.000000','1','2024-11-10 21:00:33.835551');
/*!40000 ALTER TABLE `adminusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcementattendees`
--

DROP TABLE IF EXISTS `announcementattendees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcementattendees` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `StudentAttendanceStatus` int NOT NULL,
  `AnnouncementId` int NOT NULL,
  `StudentUserId` int NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcementattendees`
--

LOCK TABLES `announcementattendees` WRITE;
/*!40000 ALTER TABLE `announcementattendees` DISABLE KEYS */;
INSERT INTO `announcementattendees` VALUES (1,1,3,2,'hjsalamanca@gmail.com','2024-11-11 20:53:18.602128'),(2,1,4,2,'hjsalamanca@gmail.com','2024-11-11 21:09:53.294717');
/*!40000 ALTER TABLE `announcementattendees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcementdetails`
--

DROP TABLE IF EXISTS `announcementdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcementdetails` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `AnnouncementId` int NOT NULL,
  `AttachedImage` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `AttachedPath` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcementdetails`
--

LOCK TABLES `announcementdetails` WRITE;
/*!40000 ALTER TABLE `announcementdetails` DISABLE KEYS */;
INSERT INTO `announcementdetails` VALUES (1,1,'A6','Uploads\\AnnouncementsFiles\\A6_5d65b29e-2350-44f1-a823-22300c6e76b6.png'),(2,1,'A5','Uploads\\AnnouncementsFiles\\A5_35aa55cb-31ee-4184-8a26-e74163c7562b.jpg'),(3,1,'A4','Uploads\\AnnouncementsFiles\\A4_2497f4b6-a391-4daa-9bf3-8b816b3bb2e0.jpg'),(4,3,'istockphoto-1184658011-612x612','Uploads\\AnnouncementsFiles\\istockphoto-1184658011-612x612_d0207728-ec0f-4800-b9b8-e44737d94d42.jpg'),(5,3,'istockphoto-499517325-612x612','Uploads\\AnnouncementsFiles\\istockphoto-499517325-612x612_fad5b84c-f317-4f8f-82bb-21935edddc8f.jpg'),(6,4,'17133510378781','Uploads\\AnnouncementsFiles\\17133510378781_4bb5760f-2cc1-48af-b6aa-fb3757173be1.jpg'),(7,4,'Seminar-on-Teaching','Uploads\\AnnouncementsFiles\\Seminar-on-Teaching_4a5bbf27-ae78-46e4-b53b-75c800a496dd.jpg');
/*!40000 ALTER TABLE `announcementdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DateTimeFrom` datetime(6) NOT NULL,
  `DateTimeTo` datetime(6) NOT NULL,
  `AnnouncementType` int NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  `Delete` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'Announcement 1','What is Lorem Ipsum?\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','2024-10-31 06:00:00.000000','2024-10-31 22:00:00.000000',0,'admin1','2024-10-31 23:05:04.130258','admin1','2024-10-31 23:05:04.130323',0),(2,'Announcement 5','TEST','2024-11-03 06:00:00.000000','2024-11-03 22:00:00.000000',0,'admin1','2024-11-03 21:33:53.587553','admin1','2024-11-03 21:33:53.587632',0),(3,'Seminar 1','Lorem ipsum dolor sit amet. Quo inventore dolorum qui doloremque animi rem voluptas dolorum non illo adipisci. Est assumenda voluptas quo minima excepturi et neque reiciendis. Qui velit maiores 33 nulla sunt quo dolorum voluptatem est molestias animi eum enim molestiae sed ipsum aliquid. Et quas ipsam aut officia omnis et maiores officia.','2024-11-07 06:00:00.000000','2024-11-07 22:00:00.000000',1,'admin1','2024-11-07 20:23:38.908466','admin1','2024-11-07 20:23:38.908612',0),(4,'Seminar 2','Lorem ipsum dolor sit amet. Quo inventore dolorum qui doloremque animi rem voluptas dolorum non illo adipisci. Est assumenda voluptas quo minima excepturi et neque reiciendis. Qui velit maiores 33 nulla sunt quo dolorum voluptatem est molestias animi eum enim molestiae sed ipsum aliquid. Et quas ipsam aut officia omnis et maiores officia.','2024-11-07 06:00:00.000000','2024-11-07 22:00:00.000000',1,'admin1','2024-11-07 20:25:33.130114','admin1','2024-11-07 20:25:33.130114',0);
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CourseName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CourseCode` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TotalUnitsRequired` int NOT NULL,
  `CourseLogo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Bachelor of Science in Information Technology','BSIT',120,'Uploads\\CoursesFiles\\compsci_8d81b654-94ee-4afb-8365-06d907b7f789.png','admin1','2024-10-31 23:16:37.324662','admin1','2024-10-31 23:16:37.324748'),(3,'Bachelor of Science in Computer Science','BSCS',120,'Uploads\\CoursesFiles\\compsci2_6c8ecb3e-f95c-46cb-836c-212086e13a55.png','admin1','2024-10-31 23:57:18.420846','admin1','2024-10-31 23:57:18.420846');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SkillName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentcertifsandrecogs`
--

DROP TABLE IF EXISTS `studentcertifsandrecogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentcertifsandrecogs` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CertRecogType` int NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentcertifsandrecogs`
--

LOCK TABLES `studentcertifsandrecogs` WRITE;
/*!40000 ALTER TABLE `studentcertifsandrecogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentcertifsandrecogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdetails`
--

DROP TABLE IF EXISTS `studentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdetails` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `StudentId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `StudentName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `YearLevel` int NOT NULL,
  `Section` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `YearStart` int NOT NULL,
  `YearEnd` int DEFAULT NULL,
  `SchoolEmail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PersonalEmail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PortfolioUrl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  `UserId` int NOT NULL,
  `CourseId` int NOT NULL,
  `AttachedResume` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetails`
--

LOCK TABLES `studentdetails` WRITE;
/*!40000 ALTER TABLE `studentdetails` DISABLE KEYS */;
INSERT INTO `studentdetails` VALUES (1,'21-00904','Hurry John L. Salamanca',4,'A-1',2001,NULL,'hjsalamanca@gmail.com','hjsalamanca@gmail.com','','admin1','2024-11-12 16:56:14.071074',2,3,'Uploads\\StudentFiles\\A5_adf340ef-442a-49c3-810b-49bfd6daf55c.jpg','admin1','0001-01-01 00:00:00.000000');
/*!40000 ALTER TABLE `studentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentinformations`
--

DROP TABLE IF EXISTS `studentinformations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentinformations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `AboutMe` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  `UserId` int NOT NULL,
  `CoverPhotoFour` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CoverPhotoOne` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CoverPhotoThree` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CoverPhotoTwo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentinformations`
--

LOCK TABLES `studentinformations` WRITE;
/*!40000 ALTER TABLE `studentinformations` DISABLE KEYS */;
INSERT INTO `studentinformations` VALUES (4,'I am an organised, efficient and hard working person, and am willing to discover and accept new ideas which can be put into practice effectively. I am a good listener and learner, able to communicate well with a group and on an individual level. I am able to motivate and direct my talents and skills to meet objectives.','2024-11-14 00:04:20.340716',2,NULL,'Uploads\\StudentCoverPhotos\\cover2_3ead92b9-c693-4d99-b2b5-8a020141ea4e.jpg','','Uploads\\StudentCoverPhotos\\cover3_bf7d58d4-5461-4c48-a2ec-b88b39a2bbba.jpg');
/*!40000 ALTER TABLE `studentinformations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentseminars`
--

DROP TABLE IF EXISTS `studentseminars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentseminars` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Facilitator` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DateAttended` datetime(6) NOT NULL,
  `TimeStart` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TimeEnd` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Reflection` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `SeminarType` smallint NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentseminars`
--

LOCK TABLES `studentseminars` WRITE;
/*!40000 ALTER TABLE `studentseminars` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentseminars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentskills`
--

DROP TABLE IF EXISTS `studentskills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentskills` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SkillRating` smallint NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `SkillId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentskills`
--

LOCK TABLES `studentskills` WRITE;
/*!40000 ALTER TABLE `studentskills` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentskills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentsubjectstaken`
--

DROP TABLE IF EXISTS `studentsubjectstaken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentsubjectstaken` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CreatedDate` datetime(6) NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  `UserId` int NOT NULL,
  `SubjectId` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentsubjectstaken`
--

LOCK TABLES `studentsubjectstaken` WRITE;
/*!40000 ALTER TABLE `studentsubjectstaken` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentsubjectstaken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentusers`
--

DROP TABLE IF EXISTS `studentusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentusers` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `UserName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Version` int NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentusers`
--

LOCK TABLES `studentusers` WRITE;
/*!40000 ALTER TABLE `studentusers` DISABLE KEYS */;
INSERT INTO `studentusers` VALUES (2,'hjsalamanca@gmail.com','Ra99L8oYKSMXYb4i+s9WOuDjsSRlo/Hyk6iquPzMZvY=',0,'admin1','2024-11-01 00:56:21.975722','admin1','2024-11-01 00:56:21.992196');
/*!40000 ALTER TABLE `studentusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectdetails`
--

DROP TABLE IF EXISTS `subjectdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectdetails` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SubjectId` int NOT NULL,
  `CourseId` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectdetails`
--

LOCK TABLES `subjectdetails` WRITE;
/*!40000 ALTER TABLE `subjectdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjectdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `SubjectName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SubjectDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Prereq` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Lec` smallint NOT NULL DEFAULT '0',
  `Lab` smallint NOT NULL DEFAULT '0',
  `Units` smallint NOT NULL DEFAULT '0',
  `Hrs` smallint NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'GE 008','Ethics','None',3,0,3,0,'admin1','2024-11-01 02:59:59.201766','admin1','2024-11-01 02:59:59.201766'),(2,'GEE 002','GE Elective 2 (Living in the IT Era)','None',3,0,3,0,'admin1','2024-11-01 03:14:04.269585','admin1','2024-11-01 03:14:04.269586'),(3,'COMP 104','Data Structures and Algorithms','None',3,2,3,0,'admin1','2024-11-01 03:21:21.644429','admin1','2024-11-01 03:21:21.644429'),(4,'COMP 105','Information Management','None',2,1,3,0,'admin1','2024-11-01 03:21:46.352933','admin1','2024-11-01 03:21:46.352933'),(5,'IT 102','Quantitative Methods','None',3,0,3,0,'admin1','2024-11-01 03:22:17.045586','admin1','2024-11-01 03:22:17.045586'),(6,'IT 201','IT Elective Platform Technologies','None',3,1,3,0,'admin1','2024-11-01 03:22:37.846580','admin1','2024-11-01 03:22:37.846581'),(7,'IT 202','IT Elective Object-Oriented Programming (VB.Net)','None',2,1,3,0,'admin1','2024-11-01 03:23:11.094298','admin1','2024-11-01 03:23:11.094298'),(8,'PE 103','Data Structures and Algorithms','None',2,0,2,0,'admin1','2024-11-01 03:23:36.177842','admin1','2024-11-01 03:23:36.177842');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14 20:54:38
