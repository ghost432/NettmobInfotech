-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 22 fév. 2026 à 11:07
-- Version du serveur : 8.0.43-0ubuntu0.24.04.2
-- Version de PHP : 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nettmobinfotech_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `ads`
--

CREATE TABLE `ads` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `imageUrl` longtext,
  `buttonText` varchar(100) DEFAULT 'En savoir plus',
  `buttonUrl` varchar(500) DEFAULT NULL,
  `format` enum('square','rectangle','vertical','horizontal') DEFAULT 'rectangle',
  `pages` json DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `ads`
--

INSERT INTO `ads` (`id`, `title`, `description`, `imageUrl`, `buttonText`, `buttonUrl`, `format`, `pages`, `isActive`, `createdAt`) VALUES
(1, 'Automatisez vos tâches avec l\'IA', 'AI Agency Nexus – La plateforme d\'automatisation intelligente qui transforme votre productivité. Gagnez du temps, réduisez les erreurs.', 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1932&auto=format&fit=crop', 'Découvrir la plateforme', 'https://aiagencynexus.com', 'rectangle', '[\"home\", \"services\", \"expertise\", \"actus\", \"devis\", \"cahier\", \"service-detail\"]', 1, '2026-02-21 12:23:27'),
(2, 'Créez votre site web en quelques clics', 'Quantum Insight Agency génère des sites web professionnels grâce à l\'IA. Design unique, code optimisé, déployé en minutes.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop', 'Générer mon site', 'https://quantuminsightagency.com', 'square', '[\"home\", \"services\", \"expertise\", \"actus\", \"devis\", \"cahier\", \"service-detail\"]', 1, '2026-02-21 12:23:27'),
(3, 'Chatbots IA & Génération d\'images', 'Neural Sphere Agency – Des chatbots intelligents et une génération d\'images créative propulsés par l\'IA pour votre entreprise.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop', 'Explorer Neural Sphere', 'https://neuralsphereagency.com', 'vertical', '[\"home\", \"services\", \"expertise\", \"actus\", \"devis\", \"cahier\", \"service-detail\"]', 1, '2026-02-21 12:23:28'),
(4, 'L\'IA au service de votre croissance', 'AI Agency Nexus automatise vos workflows, vos emails et vos rapports. Intégration simple avec vos outils existants.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop', 'Essayer gratuitement', 'https://aiagencynexus.com', 'horizontal', '[\"home\", \"services\", \"expertise\", \"actus\", \"devis\", \"cahier\", \"service-detail\"]', 1, '2026-02-21 12:23:28'),
(5, 'Votre site web sur mesure en 24h', 'Quantum Insight Agency utilise l\'IA pour créer des sites web élégants et performants. SEO optimisé, responsive, 100% personnalisé.', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1920&auto=format&fit=crop', 'Voir une démo', 'https://quantuminsightagency.com', 'rectangle', '[\"home\", \"services\", \"expertise\", \"actus\", \"devis\", \"cahier\", \"service-detail\"]', 1, '2026-02-21 12:23:28'),
(6, 'Chatbots & Images IA pour votre marque', 'Neural Sphere Agency : créez des assistants virtuels sur-mesure et des visuels époustouflants grâce à notre suite IA.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop', 'Commencer maintenant', 'https://neuralsphereagency.com', 'square', '[\"home\", \"services\", \"expertise\", \"actus\", \"devis\", \"cahier\", \"service-detail\"]', 1, '2026-02-21 12:23:28');

-- --------------------------------------------------------

--
-- Structure de la table `analytics`
--

CREATE TABLE `analytics` (
  `id` int NOT NULL,
  `page_url` varchar(500) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `user_agent` text,
  `referrer` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `analytics`
--

INSERT INTO `analytics` (`id`, `page_url`, `ip_address`, `country`, `city`, `user_agent`, `referrer`, `created_at`) VALUES
(1, '/cahier-des-charges', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-17 12:24:37'),
(2, '/cahier-des-charges', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/cahier-des-charges', '2026-02-17 12:34:49'),
(3, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/cahier-des-charges', '2026-02-17 12:38:04'),
(4, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/cahier-des-charges', '2026-02-17 12:39:27'),
(5, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-17 12:40:32'),
(6, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-17 12:44:28'),
(7, '/actus/nettmobinfotech-le-partenaire-digital-qui-transforme-les-idees-en-solutions-numeriques-performantes', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-17 12:44:32'),
(8, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-17 12:44:58'),
(9, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-17 13:18:54'),
(10, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-17 13:20:10'),
(11, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:10:36'),
(12, '/services/solution-ia', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:18:00'),
(13, '/services/conception-graphique', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:18:16'),
(14, '/services/creation-de-contenu', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:18:23'),
(15, '/services/referencement-seo', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:18:33'),
(16, '/services/developpement-applications-mobiles', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:18:42'),
(17, '/services/creation-de-site-web', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:18:52'),
(18, '/services/marketing-digital', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:20:22'),
(19, '/rgpd', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:20:34'),
(20, '/politique-confidentialite', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:20:40'),
(21, '/contact', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:20:48'),
(22, '/cahier-des-charges', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:20:56'),
(23, '/a-propos', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:21:02'),
(24, '/a-propos', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:21:09'),
(25, '/a-propos', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:22:12'),
(26, '/demande-de-devis', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/a-propos', '2026-02-21 12:23:15'),
(27, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/a-propos', '2026-02-21 12:24:46'),
(28, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 12:47:43'),
(29, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 12:49:50'),
(30, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 12:50:05'),
(31, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 12:51:18'),
(32, '/demande-de-devis', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 12:52:23'),
(33, '/cahier-des-charges', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 12:52:36'),
(34, '/services/creation-de-site-web', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 12:52:45'),
(35, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 12:58:23'),
(36, '/services', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:01:44'),
(37, '/services', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:10:02'),
(38, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:11:34'),
(39, '/services/creation-de-site-web', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:19:53'),
(40, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:20:44'),
(41, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:26:05'),
(42, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:26:49'),
(43, '/%20services%20/%20creation-de-site-web', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:27:17'),
(44, '/%20services%20/%20developpement-applications-mobiles', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:27:30'),
(45, '/%20services%20/%20referencement-seo', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:27:32'),
(46, '/%20services%20/%20conception-graphique', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:27:38'),
(47, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:32:26'),
(48, '/actus/pourquoi-choisir-nettmobinfotech-une-solution-complete-pour-accelerer-votre-transformation-digitale', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:32:44'),
(49, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:32:52'),
(50, '/services', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:33:07'),
(51, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 13:33:21'),
(52, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:39:49'),
(53, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:39:52'),
(54, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:39:55'),
(55, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:40:40'),
(56, '/%20services%20/%20creation-de-site-web', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:42:45'),
(57, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:43:09'),
(58, '/services/marketing-digital', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:44:30'),
(59, '/services/creation-de-site-web', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:44:33'),
(60, '/services/developpement-applications-mobiles', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:44:34'),
(61, '/services/referencement-seo', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:44:36'),
(62, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:45:06'),
(63, '/services/referencement-seo', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:52:03'),
(64, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:52:18'),
(65, '/cahier-des-charges', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 13:52:37'),
(66, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 14:11:20'),
(67, '/demande-de-devis', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 14:12:45'),
(68, '/demande-de-devis', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 14:13:22'),
(69, '/demande-de-devis', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 14:13:23'),
(70, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 14:13:27'),
(71, '/demande-de-devis', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 14:13:38'),
(72, '/a-propos', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 14:13:52'),
(73, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 14:14:17'),
(74, '/services', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/', '2026-02-21 14:14:19'),
(75, '/services', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/services', '2026-02-21 14:50:13'),
(76, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 14:52:39'),
(77, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 15:02:55'),
(78, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 15:49:58'),
(79, '/cahier-des-charges', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 15:50:09'),
(80, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 15:50:45'),
(81, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 15:54:58'),
(82, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:04:57'),
(83, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:09:59'),
(84, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:20:23'),
(85, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:26:09'),
(86, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:27:14'),
(87, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:47:16'),
(88, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:52:02'),
(89, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:59:38'),
(90, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 16:59:49'),
(91, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://localhost:5173/services', '2026-02-21 17:02:18'),
(92, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 17:43:38'),
(93, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 17:52:30'),
(94, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 17:52:43'),
(95, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:20:01'),
(96, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:20:35'),
(97, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:21:09'),
(98, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:21:45'),
(99, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:24:46'),
(100, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:33:20'),
(101, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:35:51'),
(102, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'http://127.0.0.1:5173/', '2026-02-21 18:36:51'),
(103, '/a-propos', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:37:19'),
(104, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-21 18:38:00'),
(105, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/17.5 Mobile/15A5370a Safari/602.1', 'http://localhost:5173/actus', '2026-02-21 18:41:28'),
(106, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:19:27'),
(107, '/contact', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:19:53'),
(108, '/a-propos', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:20:45'),
(109, '/actus', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:21:10'),
(110, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:21:32'),
(111, '/services', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:22:14'),
(112, '/services/marketing-digital', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:22:25'),
(113, '/services/creation-de-contenu', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:22:38'),
(114, '/services/creation-de-site-web', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:22:50'),
(115, '/services/conception-graphique', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:23:00'),
(116, '/services/developpement-applications-mobiles', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:23:08'),
(117, '/services/solution-ia', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:23:10'),
(118, '/services/referencement-seo', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:23:12'),
(119, '/rgpd', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:23:24'),
(120, '/politique-confidentialite', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:24:17'),
(121, '/cahier-des-charges', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:24:23'),
(122, '/contact', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:24:30'),
(123, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:24:42'),
(124, '/rgpd', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:28:06'),
(125, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:28:17'),
(126, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:30:18'),
(127, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:38:46'),
(128, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:39:02'),
(129, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/17.5 Mobile/15A5370a Safari/602.1', 'https://nettmobinfotech.fr/expertise', '2026-02-22 09:41:36'),
(130, '/expertise', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:42:24'),
(131, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:42:32'),
(132, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:42:43'),
(133, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 09:43:00'),
(134, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 10:27:33'),
(135, '/', '::1', NULL, NULL, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', NULL, '2026-02-22 10:55:42');

-- --------------------------------------------------------

--
-- Structure de la table `blog`
--

CREATE TABLE `blog` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` longtext NOT NULL,
  `imageUrl` longtext,
  `category` varchar(100) NOT NULL,
  `author` varchar(100) DEFAULT 'L''équipe NettmobInfotech',
  `usefulCount` int DEFAULT '0',
  `notUsefulCount` int DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `content`, `imageUrl`, `category`, `author`, `usefulCount`, `notUsefulCount`, `createdAt`) VALUES
(1, 'NettmobInfotech – Une vision moderne du digital au service des entreprises ambitieuses', 'nettmobinfotech-une-vision-moderne-du-digital-au-service-des-entreprises-ambitieuses', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech n’est pas seulement un prestataire technique : c’est un partenaire stratégique qui accompagne les entreprises dans la réalisation de leurs ambitions digitales.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">1. Une vision tournée vers la croissance et l’innovation</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Le digital évolue rapidement, et NettmobInfotech suit constamment les tendances et technologies innovantes pour apporter de la valeur aux entreprises :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">automatisations intelligentes,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">IA intégrée dans les processus,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">interfaces ultra-modernes,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">performance optimisée sur mobile,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">expérience utilisateur immersive.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette vision permet aux entreprises de rester en avance sur la concurrence.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">2. Un design moderne, esthétique et orienté performance</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">L’identité visuelle est devenue un élément clé pour attirer et retenir les clients.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech propose :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des interfaces fluides et intuitives,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des designs professionnels alignés avec les tendances,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une ergonomie pensée pour maximiser les conversions,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une cohérence graphique qui renforce la marque.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Le résultat : des sites qui inspirent confiance et augmentent les ventes.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">3. Une transparence totale et une collaboration simplifiée</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Tout au long du projet, NettmobInfotech :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">communique clairement,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">partage chaque étape,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">fournit des rapports,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">adapte les décisions en fonction du retour du client.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette transparence crée un climat de confiance et garantit une collaboration saine et durable.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">4. Une solution idéale pour les entreprises de toutes tailles</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Que ce soit pour :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une startup,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une PME,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une grande entreprise,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">un entrepreneur indépendant,</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech propose des solutions adaptées, flexibles et évolutives.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Chaque projet bénéficie de la même rigueur, de la même expertise et du même engagement.</span></p><p><br></p>', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop', 'Création de site Web', 'L\'équipe NettmobInfotech', 1, 0, '2026-02-15 22:59:00'),
(3, 'Pourquoi choisir NettmobInfotech ? Une solution complète pour accélérer votre transformation digitale', 'pourquoi-choisir-nettmobinfotech-une-solution-complete-pour-accelerer-votre-transformation-digitale', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">La digitalisation est devenue un impératif pour rester compétitif. NettmobInfotech apporte une réponse concrète et efficace grâce à ses services complets et à son savoir-faire multidisciplinaire.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">1. Un guichet unique pour tous les besoins numériques</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Au lieu de multiplier les prestataires, les entreprises trouvent chez NettmobInfotech </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">tous les services digitaux au même endroit</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\"> :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">développement de logiciels et d’applications,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">marketing digital et réseaux sociaux,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">création graphique et identité visuelle,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">maintenance et sécurité informatique,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">hébergement et gestion de serveurs.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette centralisation permet un gain de temps considérable, une cohérence globale et un suivi beaucoup plus efficace.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">2. Des solutions sur mesure, adaptées à chaque entreprise</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Chaque entreprise a ses propres objectifs, contraintes et ambitions.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">C’est pourquoi NettmobInfotech privilégie :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les projets personnalisés,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les designs sur mesure,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les fonctionnalités adaptées,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les stratégies uniques.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette personnalisation garantit un impact maximal et évite les solutions génériques qui ne répondent pas aux besoins réels.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">3. Un rapport qualité-prix particulièrement avantageux</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech combine :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une expertise de haut niveau,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des coûts compétitifs,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">une transparence totale,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">un excellent retour sur investissement.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Les entreprises bénéficient ainsi de prestations premium sans exploser leur budget.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">4. Une équipe réactive, passionnée et disponible</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">L’un des atouts majeurs de NettmobInfotech est la disponibilité de son équipe.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Les clients soulignent particulièrement :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">la rapidité d’exécution,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">la flexibilité,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">le soutien technique continu,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">les conseils stratégiques personnalisés.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Ce suivi rapproché sécurise les entreprises et garantit la réussite du projet à long terme.</span></p><p><br></p>', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop', 'Marketing Digital', 'L\'équipe NettmobInfotech', 1, 0, '2026-02-15 22:59:01'),
(5, 'NettmobInfotech – Le partenaire digital qui transforme les idées en solutions numériques performantes', 'nettmobinfotech-le-partenaire-digital-qui-transforme-les-idees-en-solutions-numeriques-performantes', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Dans un monde où la présence digitale conditionne la croissance des entreprises, </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\"> s’impose comme un partenaire incontournable pour toutes les organisations souhaitant développer des solutions numériques puissantes, modernes et adaptées à leurs besoins. Son expertise couvre l’ensemble de la chaîne digitale, offrant un accompagnement complet et fiable.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">1. Une expertise solide en développement web et mobile</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">L’un des principaux atouts de NettmobInfotech est sa capacité à concevoir :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">sites web professionnels</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">applications mobiles intuitives et performantes</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">plateformes e-commerce avancées</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">des </span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">solutions sur mesure pour les entreprises</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Chaque projet est développé selon les standards les plus récents, garantissant des performances optimales, une sécurité renforcée et une maintenance durable.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">2. Une approche 100% orientée client</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Les équipes de NettmobInfotech placent toujours le client au centre du processus.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Avant toute création, l’entreprise :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">analyse les objectifs,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">étudie le marché,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">identifie les besoins réels,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">élabore un plan stratégique personnalisé.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette approche participative assure un résultat parfaitement aligné avec les attentes de chaque entreprise.</span></p><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">3. Innovation et technologies de pointe</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">NettmobInfotech utilise les frameworks et outils les plus modernes :</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">React, Node.js, Laravel, Flutter, WordPress optimisé, API avancées, intelligence artificielle, automatisations, etc.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Cette maîtrise technologique permet de développer des solutions :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">rapides,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">évolutives,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">sécurisées,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">adaptées aux exigences actuelles du marché.</span></li></ol><h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(5, 106, 157);\">4. Un accompagnement global pour booster la visibilité</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Au-delà du développement, NettmobInfotech propose :</span></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">SEO complet</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\"> (référencement naturel),</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">stratégies marketing digital</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">optimisation de l’expérience utilisateur (UX/UI)</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">,</span></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">communication visuelle et branding</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">.</span></li></ol><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(74, 78, 86);\">Résultat : les marques gagnent en visibilité, en crédibilité et en attractivité sur le web.</span></p><p><br></p>', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop', 'Développement d\'applications mobiles', 'L\'équipe NettmobInfotech', 2, 0, '2026-02-15 22:59:02'),
(7, 'L\'IA et l\'automatisation : Révolutionner votre entreprise avec NettmobInfotech', 'ia-et-automatisation-revolution', 'L\'intelligence artificielle n\'est plus une technologie du futur, c\'est un outil indispensable pour les entreprises d\'aujourd\'hui. Elle transforme radicalement la façon dont les PME interagissent avec leurs clients et optimisent leurs opérations. Chez NettmobInfotech, nous développons des solutions d\'IA personnalisées, des chatbots intelligents et des systèmes d\'automatisation pour booster votre productivité et votre innovation.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop', 'Solution IA (Applications & Chatbots)', 'L\'équipe NettmobInfotech', 1, 0, '2026-02-15 22:59:03');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `firstName`, `lastName`, `email`, `phone`, `subject`, `message`, `isRead`, `createdAt`) VALUES
(1, 'Mounchili', 'thierry', 'ulrichthierry47@gmail.com', '+237655974875', 'cccccc', 'bcbbcb cfdfddfb ggdggd', 1, '2026-02-14 04:20:34'),
(2, 'Test', 'User', 'test@example.com', '+33123456789', 'Test Message', 'This is a test message for admin messages validation.', 1, '2026-02-14 05:26:58');

-- --------------------------------------------------------

--
-- Structure de la table `mailing_contacts`
--

CREATE TABLE `mailing_contacts` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT '',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `mailing_contacts`
--

INSERT INTO `mailing_contacts` (`id`, `email`, `name`, `createdAt`) VALUES
(1, 'mounchilithierry432@gmail.com', 'Ghost', '2026-02-21 14:41:03');

-- --------------------------------------------------------

--
-- Structure de la table `project_specifications`
--

CREATE TABLE `project_specifications` (
  `id` int NOT NULL,
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
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `project_specifications`
--

INSERT INTO `project_specifications` (`id`, `companyName`, `contactName`, `email`, `phone`, `projectType`, `otherProjectType`, `description`, `budget`, `deadline`, `startDate`, `status`, `createdAt`) VALUES
(1, 'Nettmob', 'thierry', 'mounchilithierry432@gmail.com', '0891037459', 'Services Plateforme', NULL, 'test formulaire cahier des charges', '< 1k€', '2026-02-28', '2026-02-19', 'archived', '2026-02-17 12:36:53');

-- --------------------------------------------------------

--
-- Structure de la table `quotations`
--

CREATE TABLE `quotations` (
  `id` int NOT NULL,
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
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `quotations`
--

INSERT INTO `quotations` (`id`, `firstName`, `lastName`, `email`, `phone`, `company`, `services`, `budget`, `timeline`, `details`, `isRead`, `createdAt`) VALUES
(1, 'Thierry', 'Ninja', 'thierry.ninja@test.com', '0601010101', 'Ninja AI', '[\"referencement-seo\",\"conception-graphique\"]', '1500-3000', '1-3', '', 1, '2026-02-15 15:56:17');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `isAdmin`, `createdAt`) VALUES
(1, 'admin@nettmobinfotech.fr', '$2b$10$0k1m9QUjQpgqv264QjV7Q.Mhn6qkY6NgkOkftbKUDOnP6xXUOS.um', 'Admin', 'Nettmob', 1, '2026-02-14 02:32:12'),
(2, 'testadmin@example.com', '$2b$10$1yNKxaO7BNJaroGtLVDgZOkbBb0tjlMiJoUZVT4h5.Dm11kPHWgmy', 'Test', 'Admin', 0, '2026-02-16 11:48:11');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_page_url` (`page_url`),
  ADD KEY `idx_country` (`country`);

--
-- Index pour la table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `mailing_contacts`
--
ALTER TABLE `mailing_contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `project_specifications`
--
ALTER TABLE `project_specifications`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `quotations`
--
ALTER TABLE `quotations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `analytics`
--
ALTER TABLE `analytics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT pour la table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `mailing_contacts`
--
ALTER TABLE `mailing_contacts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `project_specifications`
--
ALTER TABLE `project_specifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
