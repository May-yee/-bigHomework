-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-03-25 03:08:11
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
  `headShot` varchar(100) NOT NULL,
  `submitDate` varchar(11) NOT NULL,
  `submitTime` varchar(11) NOT NULL,
  `message` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `coment`
--

INSERT INTO `coment` (`commentID`, `cmName`, `com_postID`, `commenter`, `headShot`, `submitDate`, `submitTime`, `message`) VALUES
(1, '', 0009, 2, '', '2024-03-14', '15:52', '好吃嗎'),
(2, '', 0009, 2, '', '2023/3/15', '09:47', '還行，比茶六好吃'),
(4, '', 0009, 0, '', '', '', '燒肉風間沒比較好吃嗎'),
(5, '', 0009, 0, '', '', '', '乾阿捏'),
(6, '', 0009, 0, '', '', '', '可能吧'),
(7, '', 0009, 0, '', '', '', '走走走開吃'),
(13, '', 0006, 0, '', '', '', '你好'),
(14, '', 0006, 0, '', '', '', '真不錯'),
(15, '', 0006, 0, '', '', '', '好嗎'),
(28, '力宏敢不敢', 0027, 13, '', '', '', '金價有影'),
(29, '行走XD', 0025, 15, '', '', '', '123'),
(30, '行走XD', 0029, 15, '', '', '', '666'),
(31, '行走XD', 0029, 15, '\\headshots\\1711087889191-id.png', '', '', '9898'),
(32, '熱狗', 0029, 16, '\\headshots\\1711093719671-id.png', '', '', '我是差不多先生'),
(33, '熱狗', 0028, 16, '\\headshots\\1711093719671-id.png', '', '', '我是誰'),
(34, '熱狗', 0028, 16, '\\headshots\\1711093719671-id.png', '', '', '熟狗'),
(35, '熱狗', 0029, 16, '\\headshots\\1711093719671-id.png', '', '', '9898'),
(36, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '666'),
(37, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '877'),
(38, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '666'),
(39, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(40, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(41, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(42, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(43, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(44, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(45, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(46, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(47, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(48, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(49, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(50, '熱狗', 0025, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(51, '熱狗', 0026, 16, '\\headshots\\1711093719671-id.png', '', '', '666'),
(52, '熱狗', 0026, 16, '\\headshots\\1711093719671-id.png', '', '', '555'),
(53, '熱狗', 0026, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(54, '熱狗', 0026, 16, '\\headshots\\1711093719671-id.png', '', '', '123'),
(55, '熱狗', 0026, 16, '\\headshots\\1711093719671-id.png', '', '', '123');

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
  MODIFY `commentID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
