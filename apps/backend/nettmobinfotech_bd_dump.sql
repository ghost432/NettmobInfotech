-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: nettmobinfotech_bd
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `analytics`
--

DROP TABLE IF EXISTS `analytics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analytics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_url` varchar(500) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `user_agent` text,
  `referrer` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_page_url` (`page_url`),
  KEY `idx_country` (`country`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analytics`
--

LOCK TABLES `analytics` WRITE;
/*!40000 ALTER TABLE `analytics` DISABLE KEYS */;
INSERT INTO `analytics` VALUES (1,'/cahier-des-charges','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','http://localhost:5173/','2026-02-17 12:24:37'),(2,'/cahier-des-charges','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','http://localhost:5173/cahier-des-charges','2026-02-17 12:34:49'),(3,'/','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','http://localhost:5173/cahier-des-charges','2026-02-17 12:38:04'),(4,'/','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','http://localhost:5173/cahier-des-charges','2026-02-17 12:39:27'),(5,'/','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',NULL,'2026-02-17 12:40:32'),(6,'/actus','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',NULL,'2026-02-17 12:44:28'),(7,'/actus/nettmobinfotech-le-partenaire-digital-qui-transforme-les-idees-en-solutions-numeriques-performantes','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',NULL,'2026-02-17 12:44:32'),(8,'/actus','::1',NULL,NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',NULL,'2026-02-17 12:44:58');
/*!40000 ALTER TABLE `analytics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` longtext NOT NULL,
  `imageUrl` longtext,
  `category` varchar(100) NOT NULL,
  `author` varchar(100) DEFAULT 'L''équipe NettmobInfotech',
  `usefulCount` int DEFAULT '0',
  `notUsefulCount` int DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,'NettmobInfotech – Une vision moderne du digital au service des entreprises ambitieuses','nettmobinfotech-une-vision-moderne-du-digital-au-service-des-entreprises-ambitieuses','<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech n’est pas seulement un prestataire technique : c’est un partenaire stratégique qui accompagne les entreprises dans la réalisation de leurs ambitions digitales.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">1. Une vision tournée vers la croissance et l’innovation</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Le digital évolue rapidement, et NettmobInfotech suit constamment les tendances et technologies innovantes pour apporter de la valeur aux entreprises :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">automatisations intelligentes,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">IA intégrée dans les processus,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">interfaces ultra-modernes,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">performance optimisée sur mobile,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">expérience utilisateur immersive.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette vision permet aux entreprises de rester en avance sur la concurrence.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">2. Un design moderne, esthétique et orienté performance</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">L’identité visuelle est devenue un élément clé pour attirer et retenir les clients.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech propose :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des interfaces fluides et intuitives,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des designs professionnels alignés avec les tendances,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une ergonomie pensée pour maximiser les conversions,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une cohérence graphique qui renforce la marque.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Le résultat : des sites qui inspirent confiance et augmentent les ventes.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">3. Une transparence totale et une collaboration simplifiée</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Tout au long du projet, NettmobInfotech :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">communique clairement,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">partage chaque étape,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">fournit des rapports,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">adapte les décisions en fonction du retour du client.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette transparence crée un climat de confiance et garantit une collaboration saine et durable.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">4. Une solution idéale pour les entreprises de toutes tailles</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Que ce soit pour :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une startup,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une PME,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une grande entreprise,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">un entrepreneur indépendant,</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech propose des solutions adaptées, flexibles et évolutives.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Chaque projet bénéficie de la même rigueur, de la même expertise et du même engagement.</span></p><p><br></p>','https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop','Création de site Web','L\'équipe NettmobInfotech',1,0,'2026-02-15 22:59:00'),(3,'Pourquoi choisir NettmobInfotech ? Une solution complète pour accélérer votre transformation digitale','pourquoi-choisir-nettmobinfotech-une-solution-complete-pour-accelerer-votre-transformation-digitale','<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">La digitalisation est devenue un impératif pour rester compétitif. NettmobInfotech apporte une réponse concrète et efficace grâce à ses services complets et à son savoir-faire multidisciplinaire.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">1. Un guichet unique pour tous les besoins numériques</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Au lieu de multiplier les prestataires, les entreprises trouvent chez NettmobInfotech </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">tous les services digitaux au même endroit</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\"> :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">développement de logiciels et d’applications,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">marketing digital et réseaux sociaux,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">création graphique et identité visuelle,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">maintenance et sécurité informatique,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">hébergement et gestion de serveurs.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette centralisation permet un gain de temps considérable, une cohérence globale et un suivi beaucoup plus efficace.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">2. Des solutions sur mesure, adaptées à chaque entreprise</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Chaque entreprise a ses propres objectifs, contraintes et ambitions.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">C’est pourquoi NettmobInfotech privilégie :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les projets personnalisés,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les designs sur mesure,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les fonctionnalités adaptées,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les stratégies uniques.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette personnalisation garantit un impact maximal et évite les solutions génériques qui ne répondent pas aux besoins réels.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">3. Un rapport qualité-prix particulièrement avantageux</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech combine :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une expertise de haut niveau,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des coûts compétitifs,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une transparence totale,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">un excellent retour sur investissement.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Les entreprises bénéficient ainsi de prestations premium sans exploser leur budget.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">4. Une équipe réactive, passionnée et disponible</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">L’un des atouts majeurs de NettmobInfotech est la disponibilité de son équipe.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Les clients soulignent particulièrement :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">la rapidité d’exécution,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">la flexibilité,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">le soutien technique continu,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les conseils stratégiques personnalisés.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Ce suivi rapproché sécurise les entreprises et garantit la réussite du projet à long terme.</span></p><p><br></p>','https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop','Marketing Digital','L\'équipe NettmobInfotech',1,0,'2026-02-15 22:59:01'),(5,'NettmobInfotech – Le partenaire digital qui transforme les idées en solutions numériques performantes','nettmobinfotech-le-partenaire-digital-qui-transforme-les-idees-en-solutions-numeriques-performantes','<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Dans un monde où la présence digitale conditionne la croissance des entreprises, </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\"> s’impose comme un partenaire incontournable pour toutes les organisations souhaitant développer des solutions numériques puissantes, modernes et adaptées à leurs besoins. Son expertise couvre l’ensemble de la chaîne digitale, offrant un accompagnement complet et fiable.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">1. Une expertise solide en développement web et mobile</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">L’un des principaux atouts de NettmobInfotech est sa capacité à concevoir :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">sites web professionnels</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">applications mobiles intuitives et performantes</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">plateformes e-commerce avancées</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">solutions sur mesure pour les entreprises</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Chaque projet est développé selon les standards les plus récents, garantissant des performances optimales, une sécurité renforcée et une maintenance durable.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">2. Une approche 100% orientée client</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Les équipes de NettmobInfotech placent toujours le client au centre du processus.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Avant toute création, l’entreprise :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">analyse les objectifs,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">étudie le marché,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">identifie les besoins réels,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">élabore un plan stratégique personnalisé.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette approche participative assure un résultat parfaitement aligné avec les attentes de chaque entreprise.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">3. Innovation et technologies de pointe</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech utilise les frameworks et outils les plus modernes :</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">React, Node.js, Laravel, Flutter, WordPress optimisé, API avancées, intelligence artificielle, automatisations, etc.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette maîtrise technologique permet de développer des solutions :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">rapides,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">évolutives,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">sécurisées,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">adaptées aux exigences actuelles du marché.</span></li></ol><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">4. Un accompagnement global pour booster la visibilité</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Au-delà du développement, NettmobInfotech propose :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">SEO complet</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\"> (référencement naturel),</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">stratégies marketing digital</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">optimisation de l’expérience utilisateur (UX/UI)</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">communication visuelle et branding</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Résultat : les marques gagnent en visibilité, en crédibilité et en attractivité sur le web.</span></p><p><br></p>','https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop','Développement d\'applications mobiles','L\'équipe NettmobInfotech',2,0,'2026-02-15 22:59:02'),(7,'L\'IA et l\'automatisation : Révolutionner votre entreprise avec NettmobInfotech','ia-et-automatisation-revolution','L\'intelligence artificielle n\'est plus une technologie du futur, c\'est un outil indispensable pour les entreprises d\'aujourd\'hui. Elle transforme radicalement la façon dont les PME interagissent avec leurs clients et optimisent leurs opérations. Chez NettmobInfotech, nous développons des solutions d\'IA personnalisées, des chatbots intelligents et des systèmes d\'automatisation pour booster votre productivité et votre innovation.','https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop','Solution IA (Applications & Chatbots)','L\'équipe NettmobInfotech',1,0,'2026-02-15 22:59:03');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Mounchili','thierry','ulrichthierry47@gmail.com','+237655974875','cccccc','bcbbcb cfdfddfb ggdggd',1,'2026-02-14 04:20:34'),(2,'Test','User','test@example.com','+33123456789','Test Message','This is a test message for admin messages validation.',1,'2026-02-14 05:26:58');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_specifications`
--

DROP TABLE IF EXISTS `project_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_specifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `contactName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `projectType` varchar(100) NOT NULL,
  `otherProjectType` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `budget` varchar(100) DEFAULT NULL,
  `deadline` varchar(100) DEFAULT NULL,
  `startDate` varchar(100) DEFAULT NULL,
  `status` enum('unread','read','archived') DEFAULT 'unread',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_specifications`
--

LOCK TABLES `project_specifications` WRITE;
/*!40000 ALTER TABLE `project_specifications` DISABLE KEYS */;
INSERT INTO `project_specifications` VALUES (1,'Nettmob','thierry','mounchilithierry432@gmail.com','0891037459','Services Plateforme',NULL,'test formulaire cahier des charges','< 1k€','2026-02-28','2026-02-19','archived','2026-02-17 12:36:53');
/*!40000 ALTER TABLE `project_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotations`
--

DROP TABLE IF EXISTS `quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `company` varchar(200) DEFAULT NULL,
  `services` text,
  `budget` varchar(100) DEFAULT NULL,
  `timeline` varchar(100) DEFAULT NULL,
  `details` text,
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotations`
--

LOCK TABLES `quotations` WRITE;
/*!40000 ALTER TABLE `quotations` DISABLE KEYS */;
INSERT INTO `quotations` VALUES (1,'Thierry','Ninja','thierry.ninja@test.com','0601010101','Ninja AI','[\"referencement-seo\",\"conception-graphique\"]','1500-3000','1-3','',1,'2026-02-15 15:56:17');
/*!40000 ALTER TABLE `quotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@nettmobinfotech.fr','$2b$10$0k1m9QUjQpgqv264QjV7Q.Mhn6qkY6NgkOkftbKUDOnP6xXUOS.um','Admin','Nettmob',1,'2026-02-14 02:32:12'),(2,'testadmin@example.com','$2b$10$1yNKxaO7BNJaroGtLVDgZOkbBb0tjlMiJoUZVT4h5.Dm11kPHWgmy','Test','Admin',0,'2026-02-16 11:48:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-17 13:57:03
