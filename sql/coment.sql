-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-03-22 08:22:23
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
-- 資料表結構 `coment`
--

CREATE TABLE `coment` (
  `commentID` int(10) UNSIGNED NOT NULL,
  `cmName` varchar(10) NOT NULL,
  `com_postID` int(4) UNSIGNED ZEROFILL NOT NULL,
  `commenter` int(11) NOT NULL,
  `submitDate` varchar(11) NOT NULL,
  `submitTime` varchar(11) NOT NULL,
  `message` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `coment`
--

INSERT INTO `coment` (`commentID`, `cmName`, `com_postID`, `commenter`, `submitDate`, `submitTime`, `message`) VALUES
(1, '', 0009, 2, '2024-03-14', '15:52', '好吃嗎'),
(2, '', 0009, 2, '2023/3/15', '09:47', '還行，比茶六好吃'),
(4, '', 0009, 0, '', '', '燒肉風間沒比較好吃嗎'),
(5, '', 0009, 0, '', '', '乾阿捏'),
(6, '', 0009, 0, '', '', '可能吧'),
(7, '', 0009, 0, '', '', '走走走開吃'),
(13, '', 0006, 0, '', '', '你好'),
(14, '', 0006, 0, '', '', '真不錯'),
(15, '', 0006, 0, '', '', '好嗎');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `coment`
--
ALTER TABLE `coment`
  ADD PRIMARY KEY (`commentID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `coment`
--
ALTER TABLE `coment`
  MODIFY `commentID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
