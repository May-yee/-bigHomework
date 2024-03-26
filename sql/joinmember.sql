-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-03-26 08:07:30
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `jiuing`
--

-- --------------------------------------------------------

--
-- 資料表結構 `joinmember`
--

CREATE TABLE `joinmember` (
  `postID` int(11) NOT NULL,
  `participants` int(11) NOT NULL,
  `joinL` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `joinmember`
--

INSERT INTO `joinmember` (`postID`, `participants`, `joinL`) VALUES
(31, 15, 'C'),
(31, 16, 'C'),
(32, 15, 'Y');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `joinmember`
--
ALTER TABLE `joinmember`
  ADD PRIMARY KEY (`postID`,`participants`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
