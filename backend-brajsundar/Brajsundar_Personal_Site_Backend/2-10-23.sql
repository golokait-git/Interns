-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: brajsundar
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `admin_login`
--

DROP TABLE IF EXISTS `admin_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` text,
  `last_name` text,
  `token` text,
  `created_time` text,
  `email` text,
  `password` text,
  `password_decrypted` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_login`
--

LOCK TABLES `admin_login` WRITE;
/*!40000 ALTER TABLE `admin_login` DISABLE KEYS */;
INSERT INTO `admin_login` VALUES (1,'ADMIN','ADMIN','8a0b3a74-41a9-4609-95eb-9a8ef2ee196a','2023-03-11 17:51:30','admin@gmail.com','6b0366ae9548fec3446506fe89769833dca69e078f2dc7667efb0e67f58336b9a548f3d9ee9c772e6fdfa222fff13870320b5c72db9f536334b1ee9a9f484074','123456');
/*!40000 ALTER TABLE `admin_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_name` text,
  `article_path` text,
  `article_title` text,
  `create_date` text,
  `update_date` text,
  `details` text,
  `title` text,
  `pdf` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (2,'file-1694365206185.jpg','public\\uploads\\file-1694365206185.jpg',NULL,'2023-09-10 22:30:06',NULL,'new','new',NULL),(3,'file-1694365214007.jpg','public\\uploads\\file-1694365214007.jpg',NULL,'2023-09-10 22:30:14',NULL,'new','new',NULL),(12,'file-1696008967817.png','\\var\\www\\data\\public\\uploads\\file-1696008967817.png',NULL,'2023-09-29 23:06:07',NULL,'null','sefsef','file2-1696008967818.pdf');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_name` text,
  `book_path` text,
  `create_date` text,
  `update_date` text,
  `details` text,
  `title` text,
  `lang` text,
  `prebook` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (2,'file-1694261912035.jpg','public\\uploads\\file-1694261912035.jpg','2023-09-09 17:48:32',NULL,'https://www.amazon.com/dp/B0BS6VDTDQ','Taking Shelter of Srimad Bhagavatam',NULL,NULL),(3,'file-1694264702367.jpg','public\\uploads\\file-1694264702367.jpg','2023-09-09 17:56:45',NULL,'https://www.amazon.com/dp/B0BS6VDTDQ','Taking Shelter of Srimad Bhagavatam',NULL,NULL),(4,'file-1694266851386.jpg','public\\uploads\\file-1694266851386.jpg','2023-09-09 19:10:51',NULL,'https://www.amazon.de/dp/B0BS6VDTDQ','Taking Shelter of Srimad Bhagavatam',NULL,NULL),(11,'file-1696067738199.png','hfthtfh','2023-09-30 15:25:38',NULL,'fthfthtf','fthft','Aruba','NO'),(12,'file-1696067823222.png','gdrgdrg','2023-09-30 15:27:03',NULL,'drgdrg','drgdg','Antigua and Barbuda','undefined'),(13,'file-1696068122198.png','drgdrg','2023-09-30 15:32:02',NULL,'drgdrg','serfgdrg','undefined','YES'),(14,'file-1696068133099.png','drgdrg','2023-09-30 15:32:13',NULL,'drgdrg','serfgdrg','undefined','YES'),(15,'file-1696068150928.png','drgdrg','2023-09-30 15:32:30',NULL,'drgdrg','serfgdrg','undefined','NO');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emagazine`
--

DROP TABLE IF EXISTS `emagazine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emagazine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emagazine_name` text,
  `emagazine_path` text,
  `emagazine_title` text,
  `create_date` text,
  `update_date` text,
  `details` text,
  `title` text,
  `pdf` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emagazine`
--

LOCK TABLES `emagazine` WRITE;
/*!40000 ALTER TABLE `emagazine` DISABLE KEYS */;
INSERT INTO `emagazine` VALUES (2,'file-1694365232641.jpg','public\\uploads\\file-1694365232641.jpg',NULL,'2023-09-10 22:30:32',NULL,'xyz','xyz',NULL),(3,'file-1694365233304.jpg','public\\uploads\\file-1694365233304.jpg',NULL,'2023-09-10 22:30:33',NULL,'xyz','xyz',NULL),(4,'file-1694365233944.jpg','public\\uploads\\file-1694365233944.jpg',NULL,'2023-09-10 22:30:33',NULL,'xyz','xyz',NULL);
/*!40000 ALTER TABLE `emagazine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `podcast`
--

DROP TABLE IF EXISTS `podcast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `podcast` (
  `id` int NOT NULL AUTO_INCREMENT,
  `podcast_name` text,
  `podcast_title` text,
  `podcast_desc` text,
  `podcast_path` text,
  `create_date` text,
  `update_date` text,
  `podcast_image_name` text,
  `podcast_image_path` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=813 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `podcast`
--

LOCK TABLES `podcast` WRITE;
/*!40000 ALTER TABLE `podcast` DISABLE KEYS */;
INSERT INTO `podcast` VALUES (697,NULL,'The Passing Away of Bhīṣmadeva in the Presence of Lord Kṛṣṇa | Chapter 9 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_14_09_41_14_03b0b45f-cdae-4942-ac78-154edbd28d26.mp3','2023-08-21 23:00:54','2023-09-05 11:49:37','file-1693894777524.png','public\\uploads\\file-1693894777524.png'),(698,NULL,'Prayers by Queen Kuntī and Parīkṣit Saved | Chapter 8 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_13_07_45_17_6ba95ef8-7788-400c-b2a7-c4a5a2aa6013.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(699,NULL,'Day 7 | Overview of Srimad Bhagavatam | ISKCON Coventry | United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_22_04_34_59_11ffa5b2-8f7f-4b28-bd60-c34c07b06933.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(700,NULL,'The Son of Droṇa Punished | Chapter 7 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_09_10_51_31_d024a7a0-1645-48f8-92a0-dd132ddc3cbe.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(701,NULL,'Deliverance of Putana | Session 7 |  Putana\'s liberation',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_26_10_01_28_9cbd280b-2b03-41df-9f2e-90de862df6fa.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(702,NULL,'Day 6 | Overview of Srimad Bhagavatam | ISKCON Coventry | United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_20_18_12_34_fd2d2036-1ae1-4a08-86ef-8939a0ac396e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(703,NULL,'Conversation Between Nārada and Vyāsadeva | Chapter 6 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_07_09_24_05_8661ac89-204b-4227-b69d-8ee0c9727e66.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(704,NULL,'Deliverance of Putana | Session 6 | How gopis protecting Krishna',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_23_13_01_46_6b86c9cf-aa95-466b-bbb4-3ee0b6cf586b.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(705,NULL,'Day 5 | Overview of Srimad Bhagavatam | ISKCON Coventry | United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_19_20_33_20_0e220d58-809d-4104-953e-d2289d0fd27e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(706,NULL,'Nārada’s Instructions on Śrīmad-Bhāgavatam for Vyāsadeva | Chapter 5 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_03_08_41_31_0adb649b-b115-45a2-b487-f01619709c4c.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(707,NULL,'The Power of Holy Name: Story of Ajamila | Session-5 | Yamarāja described the glories of the Lord and His devotees',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_13_11_42_24_6c188970-b400-4fc5-9470-6ba5e96de152.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(708,NULL,'Deliverance of Putana | Session 5 | Putana killed by Lord Krishna',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_19_12_33_31_17a735d6-99c3-4838-a2ff-4f452a6bf3d2.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(709,NULL,'Day 4 | Overview of Srimad Bhagavatam | ISKCON Coventry | United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_18_21_28_13_e369d297-bc3e-47af-b3ce-388ff1cb48ce.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(710,NULL,'The Appearance of Śrī Nārada | Chapter 4 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_02_08_23_30_a41de3b0-fddf-4c8b-bd6a-9d17d0be629b.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(711,NULL,'The Power of Holy Name: Story of Ajamila | Session- 4 | Yamaraja Instructs his Messengers',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_12_05_02_03_f4071b72-bf7f-4370-9229-41ba1e59545b.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(712,NULL,'Deliverance of Putana | Session 4 | Who is Putna?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_18_11_39_28_a1b0c347-2a91-4e36-b7ba-d1d088439bb0.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(713,NULL,'Day 3 | Overview of Srimad Bhagavatam | ISKCON Coventry | United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_18_02_47_28_323bfe62-67ab-450c-89a7-525b728a59e3.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(714,NULL,'Kṛṣṇa Is the Source of All Incarnations | Chapter 3 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_01_10_38_47_ad02cf37-3a10-45aa-a600-12dabfd2360e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(715,NULL,'The Power of Holy Name: Story of Ajamila | Session-3 | ??????????? freed Ajamila from the bondage of ????????',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_11_11_10_27_7f1088f3-7b7c-4cb7-9908-64dbf50e0561.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(716,NULL,'Deliverance of Putana | Session 3 | Meeting of Nanda Maharaj and Vasudev',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_14_11_36_33_e9f9bee2-092d-4a05-9bb3-0c8a658d6acf.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(717,NULL,'Life of Sudama | Session 3 | Lords causeless mercy on Sudama',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_22_10_22_23_80bc4e66-4d57-49c5-ae9a-d05477e76f8f.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(718,NULL,'The Life of King Yayati | Session 3 | How to get out of clutches of Maya to become liberated?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_14_10_34_45_d1c01b72-4f39-49f0-8cdc-075232eb5aba.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(719,NULL,'Day 2 | Overview of Srimad Bhagavatam | ISKOCN Conventry | United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_30_06_27_00_36ebeb18-ce13-4b29-bc06-60141d7805d4.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(720,NULL,'Divinity and Divine Service | Chapter 2 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_28_08_43_54_c7ef4236-742e-475c-9a9b-c16926fe001c.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(721,NULL,'Can one attain salvation by staying at Grihastha-ashram? | Ideal Householder Life | Part 2 | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_21_04_17_13_1cd54600-0774-452e-9d06-3fa2504c3abb.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(722,NULL,'The Power of Holy Name: Story of Ajamila | Session- 2 | Conversation between Vishnudutas and Yamdutas',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_09_11_42_40_426aff52-757f-440e-93ee-39a9caee14be.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(723,NULL,'Deliverance of Putana | Session 2 | Birth Ceremony of Lord Sri Krishna',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_12_12_46_05_2f47be6a-a62b-4e57-9046-27ce46cb695b.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(724,NULL,'Lord Krishna chastises Kaliya | Session 2 | Why did Krishna ask Kaliya to leave Vrindavan?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_27_12_05_11_6a561d28-8352-47fa-af8b-498144b6bde3.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(725,NULL,'Life of Sudama | Session 2 | When sudama met Krishna',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_21_13_01_14_455a484b-8c58-41b9-bc28-543dba73d7f6.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(726,NULL,'The Life of King Yayati | Session 2 | Why was Yadu\'s rejection accepted as religious and his brother\'s rejection as irreligious?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_13_12_24_32_ca9f56f7-cfe6-477b-883c-0ea027b1513a.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(727,NULL,'Day 1 | Overview of Srimad Bhagavatam | ISKCON Conventry | United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_13_18_20_58_3262e3d4-4ba1-4c80-bc25-e55626084fe0.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(728,NULL,'Questions by the sages | Chapter 1 | Canto 1 | Overview of Srimad Bhagavatam',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_27_10_33_45_c9867e65-9a51-4a09-b7cf-55d9704db032.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(729,NULL,'Can one attain salvation by staying at Grihastha-ashram?  | Part 1 | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_20_11_13_22_abc7a5b1-3da4-4d62-a4e8-a1465d3a9dfe.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(730,NULL,'The Power of Holy Name: Story of Ajamila | Session-1 | How Ajamila was about to give up his body?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_08_12_04_20_9c7b0eb3-5fc2-4d4f-ae1d-5f6f6755ae9c.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(731,NULL,'Deliverance of Putana | Session 1 | Minister\'s advice to Kamsa',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_11_08_22_16_a682576d-132e-4bcf-a78e-60e4f4c8e722.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(732,NULL,'Lord Krishna chastises Kaliya | Session 1 | Black serpent enwrapped Krishna in the coils',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_23_12_42_55_ff2bcab3-0bd6-4b13-aff9-3ff70499e483.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(733,NULL,'Life of Sudama | Session 1 | Sudama\'s departure for Dwarka',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_20_11_24_47_4116a1a9-c915-4b9c-958d-6695a17518af.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(734,NULL,'Relevance of Devotion: Story of Bhakti Devi and her sons',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_15_12_11_13_3ef950e0-d158-4e43-a597-06abf9e13465.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(735,NULL,'The Life of King Yayati | Session 1 | How the daughter of a king became the maidservant of Shukracharya\'s daughter Devayani.',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_12_12_18_09_58be334c-0995-4975-98a3-70e0fd90eefc.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(736,NULL,'Why did mother Sita give up her life? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_31_19_28_14_9ceb1f20-4808-43a3-b414-a232b321fd4e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(737,NULL,'7 Days notice | Mayapur ISKCON | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_23_18_21_38_79155509-9f60-4a65-bdc0-3180695ff046.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(738,NULL,'3 hour overview of entire Srimad Bhagavatam | Cambridge University Campus | United Kingdom',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_11_20_09_30_d96aa96a-0e31-4d37-a552-f3446ddabda6.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(739,NULL,'Three logs of Wood | Untold pastimes of Lord Krishna coming back to Vrindavan | Birmingham, United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_03_18_32_03_3a6409c1-70db-4f28-b797-241986851a5d.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(740,NULL,'Practising Vanaprastha in modern scenario | Bhaktivedanta Manor, United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_07_02_18_57_21_ac60acbd-0e8c-4b0b-80b2-ecdb6604ddfc.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(741,NULL,'How to deal with offences? | Bhaktivedanta Manor, United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_30_20_44_36_9ccbaa5b-e66b-4716-9c61-ab0d5a7dfcd3.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(742,NULL,'How Srila Prabhupada delivered the English language? ISKCON Bhaktivedanta  Manor, United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_25_18_38_11_e454bcd0-45d1-4174-bdc5-219678321509.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(743,NULL,'How to understand the plan of Lord in our life? | ISKCON London | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_23_19_05_53_1055db8e-f9a0-4a32-9783-f0dc4baba88b.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(744,NULL,'What to learn from life of Bhaktivinod Thakura? | ISKCON London, Soho | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_21_19_53_40_aae92288-d045-4fe1-9220-a85ea063ef91.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(745,NULL,'The curse that gave Srimad Bhagavatam to the world | London | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_20_18_37_22_ee1409ab-b5ed-48d1-90d5-de8ffa68cab2.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(746,NULL,'Mahaprabhu, Laxmi and Gopis | Bhaktivedanta Manor, United Kingdom | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_18_19_23_53_d1fbfb7b-20c0-4a8e-aaa8-16f70f71d2d1.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(747,NULL,'Glories of Srimad Bhagavatam | ISKCON-Scotland | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_15_04_40_24_66ed33f3-5de0-40c1-8663-d47a872aa59e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(748,NULL,'How to make householder life smoother? | ISKCON-Scotland | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_14_14_00_20_e816f677-8f15-4805-8b32-9d9d40ebb921.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(749,NULL,'Are pure devotees themselves holy place? | ISKCON-Scotland | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_13_09_55_22_2d801d4f-1ac6-41ea-bafe-257554134321.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(750,NULL,'Ideal Householder Life | ISKCON-Scotland | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_06_12_11_32_35_e9e18ce3-1833-4535-aeb1-06997131d826.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(751,NULL,'Importance of Associating  with Sadhu | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_27_10_51_55_74d1d4ca-c462-4c8f-92e3-bb3ba8159ad8.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(752,NULL,'Life of Maharaja Parikshit | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_26_12_39_43_6689984d-cf9f-43bd-897c-5f6b56ca9df7.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(753,NULL,'Glories of Uddhava | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_25_11_28_46_797190fb-10b2-42a9-90ce-cf0f55207bff.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(754,NULL,'Did Vyasadeva Compose two editions of Srimad Bhagavatam | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_23_06_28_17_404a422f-5774-4496-bd10-f40acc4963bd.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(755,NULL,'Glories of Srimad Bhagavatam | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_19_08_26_02_aed8542a-687a-495c-bc6c-e0bbab42f3f7.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(756,NULL,'Why did Lord Krishna enjoy the wounds created on the body by the sharpened arrows of Sri Bhishma Deva? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_18_10_35_08_66818c13-97bd-40fd-9baf-755681940047.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(757,NULL,'Purpose of Performing Parikrama | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_16_09_24_27_ccf8a2df-6fb5-43b6-9a25-b65ea1766c16.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(758,NULL,'Do Not Disturb The Mood Of Lord Chaitanya | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_15_08_52_49_ea5a3f7a-de9c-4b93-ae33-febcb2c7b30e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(759,NULL,'Qualifications of a bonafide Spiritual Master | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_13_08_18_33_a329f133-2e8f-48c1-ac76-24e99f0de7a6.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(760,NULL,'The curse that gave Srimad Bhagavatam to the world | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_11_10_38_03_61a33b72-adb0-45e9-b02d-9ccf37f26872.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(761,NULL,'Can Ghosts get delivered by hearing Srimad Bhagavatam? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_10_11_01_16_81a73113-3c83-4d7c-8cc2-cd75f8bb2551.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(762,NULL,'How Gajendra the Elephant devotee remembered his past life? |  Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_09_06_44_20_e91a3823-c3c2-4614-92b4-1fdc28f4d116.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(763,NULL,'The Only 3 Destination of our life | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_08_11_16_52_7bb25bd0-14cd-4a7c-8f36-b8e8d7e2f954.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(764,NULL,'Although a demon how did Maharaja Bali became a Pure devotee? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_06_12_36_22_567559be-c56d-46e1-8cea-c0a7858f53c3.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(765,NULL,'Churning of the Milk Ocean | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_03_13_09_23_d4ac87c9-18df-4659-bb28-c2ead2c6742e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(766,NULL,'Nine types of Devotion and their respective acharyas | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_02_11_31_31_c1bdcbff-e890-4d04-b661-4fd325e5b7b5.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(767,NULL,'Glories of Srila Prabhupada | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_05_01_10_02_17_7a26d5a2-6e33-4931-8ddb-e42f1951db31.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(768,NULL,'Are there in total 8 regulative principles for devotees? | Brajsundar das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_28_09_06_27_0eb3ecf1-f6f2-451d-a4d9-73daf47967d8.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(769,NULL,'The Story Of An Ancient Deity of Sri Ramchandra | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_22_08_15_50_5a8aab32-944e-446a-ab99-633ad8cb8fe8.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(770,NULL,'Why Did Mother Sita Prevent Hanuman From Killing Ravana? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_21_10_13_11_76764b7e-6a75-49ab-b66a-514b6937da49.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(771,NULL,'Is Śrīmad-Bhāgavatam the 19th Purana? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_19_08_57_19_97818d4a-0018-4415-9c8c-480804045a53.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(772,NULL,'Who Made Codes Of Religion ? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_17_09_54_29_3f5a93eb-1b82-49ed-837e-8dd91383a4f3.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(773,NULL,'The Nine Processes Of Devotional Service | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_15_08_52_24_a4214dac-789b-4ad3-999e-4f489316bc6f.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(774,NULL,'How to become a friend of all living entities ? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_14_11_45_52_062fafe3-9342-44a3-9fd9-39da1def2add.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(775,NULL,'The Life Of Queen Kunti | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_13_12_08_19_46a23c1d-e401-4a0c-8373-3a816a8b2c41.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(776,NULL,'Significance Of The Six Arm Form Of Lord Chaitanya Mahaprabhu | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_12_08_23_16_8e015c6e-ec89-47f2-bae6-1e761f17476d.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(777,NULL,'Transcendental competition between Lord Caitanya and Lord Jagannatha | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_11_08_47_18_9ab437d1-ea59-4b8e-8a9f-bf32c8a9312b.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(778,NULL,'How Śrīmad-Bhāgavatam uproots demoniac influence in the society? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_08_10_35_45_839e02d5-298f-4560-8898-6927e410ee7d.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(779,NULL,'How Sarvabhauma Bhattacharya Became A Pure Vaishnava? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_07_10_23_46_5c471126-b68a-49ec-8e50-d7de135333a9.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(780,NULL,'What are the dangers of bad association? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_06_09_17_05_b87ed222-9841-496a-8c84-6175adefbe91.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(781,NULL,'How to attract Krishna? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_05_08_51_11_dc8d4a8d-9ba6-463c-919c-46f4f9cd0d80.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(782,NULL,'What is the qualification needed to read Srimad Bhagavatam? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_04_08_02_34_927d1fef-be43-4a99-93ba-d9138a603258.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(783,NULL,'The Glories of Śrīmad-Bhāgavatam | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_03_09_33_31_7e3e4f79-2a97-44ce-8339-f4e15dc8f655.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(784,NULL,'Prabhupada Japa 16 rounds | Prabhupada Chanting 16 rounds | Prabhupada Japa',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_02_04_38_40_0cfb4181-32d4-4452-8ced-cf3267913942.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(785,NULL,'Srila Prabhupada Chanting Japa 32 rounds | Srila Prabhupada Chanting 32 rounds',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_02_06_02_55_41a1aa0b-898b-4ec8-be3e-f297049d5cbf.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(786,NULL,'Why is it Said Krishna Never Leave Vrindavan? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_04_01_12_50_44_b7c64103-3132-4303-a09c-cd1ce44f7644.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(787,NULL,'Who is a Mahā-bhāgavata? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_31_11_30_48_8267be44-7d94-4f6f-9165-07032b4c0d94.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(788,NULL,'How to eliminate all the inauspicious things? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_30_10_11_52_a94e442d-41cc-454f-b0c1-0a0292978da2.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(789,NULL,'The Glories of Srimati Radha Rani | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_29_10_23_55_6860e624-8bde-44e5-ada7-04a74366376a.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(790,NULL,'The Position Of A Pure Devotee | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_28_09_17_53_40cee423-87f7-43c2-8f70-32c4492526a6.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(791,NULL,'How to bind Krishna? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_27_10_51_29_59e0a4fc-b3f2-4293-b021-7163a93642f9.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(792,NULL,'Glories of Sri Radha-Kunda | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_25_11_31_41_d46bc7e9-119f-4c6c-a73d-4c0342415aa4.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(793,NULL,'How does the association with Sadhus help our devotional life? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_03_24_13_04_52_0595fd42-3011-47ba-9ba7-2f9aa19271d0.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(794,NULL,'The secret of Krishna consciousness | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_25_09_55_38_1455cac9-6639-4df7-b702-965b2bbe56ed.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(795,NULL,'Can people born in the western world become pure devotees? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_24_10_30_17_dfc0fc8e-965f-41e8-8c14-978c4712a24f.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(796,NULL,'What instructions does Prahlad Maharaja give to his classmates? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_18_10_58_55_d1b79494-6c14-40bd-99c5-4e9d77c0dc23.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(797,NULL,'How to deal with an irritable husband? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_17_10_02_13_72169c7e-b23b-41e1-b5b6-caaeec70c577.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(798,NULL,'What if we don\'t practice Krishna Consciousness? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_07_10_17_01_4f5a5d3d-5f84-480f-b63a-83abb9d4c354.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(799,NULL,'Are you hopeless in Krishna Consciousness? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_06_10_15_51_64159ebb-7994-4811-868d-f386bd04055e.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(800,NULL,'Why not to commit offences unto Vaishnavas? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_04_11_38_54_83dd8752-e0ce-4780-afaf-276e07054ce1.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(801,NULL,'What were the prayers that forced Supreme Lord Krishna to change his course of action? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_03_11_09_33_df82b05b-c922-47e9-86d2-51bac769c25a.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(802,NULL,'How to be attracted towards Krishna? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_02_12_19_12_eea7891d-40b8-475a-a925-f90825e410c6.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(803,NULL,'Unheard Mysteries of Kaliya Daman Lila | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_02_01_11_13_11_5ef0c21d-41e7-40c3-b8e9-c6c7a67043c1.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(804,NULL,'How to liberate oneself from the cycle of birth and death? | Brajsundar Das',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_30_12_21_03_80db9ee3-dcef-443e-b153-488ebada2864.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(805,NULL,'How should devotees offer shraddha to their forefathers?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_27_12_06_49_fed811a8-17d5-4955-931a-02235de0d25d.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(806,NULL,'The struggle of raising children in Krishna Consciousness',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_09_12_18_49_a1e92126-b8fd-4b35-8c15-68f4328e3c52.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(807,NULL,'Is it possible for a woman to gain supernatural powers?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_03_09_22_55_c0ac94fa-4f23-47d4-9b05-19cba5a499e5.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(808,NULL,'Is there a story about how King Indradyumna became Gajendra in the next life?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2023_01_02_10_38_24_d5da6988-f316-4fd6-9e86-bd1c16106867.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(809,NULL,'A Glimpse into Uddhava\'s life',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_30_14_34_57_6a5be67e-d146-4b42-a996-0b8cc68473a9.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(810,NULL,'Is it possible to see the Supreme Lord face-to-face?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_29_09_33_38_17703a3c-3b27-4014-ae43-d4a7e6019f8d.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(811,NULL,'Three Secrets of Life',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_17_09_16_14_7ca49620-a902-446d-90d1-5c4cd2bfb85c.mp3','2023-08-21 23:00:54',NULL,NULL,NULL),(812,NULL,'What is Srimad Bhagavatam?',NULL,'https://pdcn.co/e/media.rss.com/onepurpose/2022_12_07_09_11_17_e668871f-9ca7-4f0c-81a3-fc2459396ee0.mp3','2023-08-21 23:00:54',NULL,NULL,NULL);
/*!40000 ALTER TABLE `podcast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `details` text,
  `filename` text,
  `create_date` text,
  `update_date` text,
  `file_path` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
INSERT INTO `quotes` VALUES (13,'edfsef','file-1694373090022.jpg','2023-09-11 00:41:30',NULL,'public\\uploads\\file-1694373090022.jpg'),(14,'edfsef','file-1694374438897.jpg','2023-09-11 01:03:58',NULL,'public\\uploads\\file-1694374438897.jpg'),(15,'edfsef','file-1694374440052.jpg','2023-09-11 01:04:00',NULL,'public\\uploads\\file-1694374440052.jpg');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reels`
--

DROP TABLE IF EXISTS `reels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reel_name` text,
  `reel_path` text,
  `create_date` text,
  `update_date` text,
  `reel_type` text,
  `download_directory` text,
  `unique_file_name` text,
  `url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reels`
--

LOCK TABLES `reels` WRITE;
/*!40000 ALTER TABLE `reels` DISABLE KEYS */;
INSERT INTO `reels` VALUES (51,'https://www.instagram.com/reel/CuqhM2_IGjD/','file-1695392494954.jpg','2023-09-22 19:51:34',NULL,NULL,NULL,NULL,'https://www.instagram.com/reel/CuqhM2_IGjD/'),(52,'fsefsefs','file-1695403819837.png','2023-09-22 23:00:19',NULL,NULL,NULL,NULL,'efsef'),(53,'fsefsefs','file-1695403831090.png','2023-09-22 23:00:31',NULL,NULL,NULL,NULL,'efsef');
/*!40000 ALTER TABLE `reels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_name` text,
  `video_path` text,
  `video_title` text,
  `create_date` text,
  `update_date` text,
  `details` text,
  `title` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `youtube`
--

DROP TABLE IF EXISTS `youtube`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `youtube` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_name` text,
  `video_url` text,
  `video_title` text,
  `create_date` text,
  `update_date` text,
  `details` text,
  `title` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `youtube`
--

LOCK TABLES `youtube` WRITE;
/*!40000 ALTER TABLE `youtube` DISABLE KEYS */;
INSERT INTO `youtube` VALUES (9,NULL,'https://www.youtube.com/watch?v=g8QhdosTel8&t=4s',NULL,'2023-09-18 12:53:37',NULL,NULL,'Test ACD'),(11,NULL,'https://www.youtube.com/watch?v=zgyn_Dazcss',NULL,'2023-09-20 01:18:19',NULL,NULL,'Sunday Feast Class, Glories of Srimad Bhagavatam'),(12,NULL,'https://www.youtube.com/watch?v=DOYnyveo_6g',NULL,'2023-09-20 10:57:39',NULL,NULL,'Are pure devotees themselves holy place? | ISKCON Scotland');
/*!40000 ALTER TABLE `youtube` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-02 10:35:14
