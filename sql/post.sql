-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-03-22 05:00:19
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
-- 資料表結構 `post`
--

CREATE TABLE `post` (
  `postID` int(4) UNSIGNED ZEROFILL NOT NULL,
  `postIMG` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `userID` int(11) UNSIGNED NOT NULL,
  `postDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `title` text NOT NULL,
  `registeredDate` varchar(10) NOT NULL,
  `registeredTime` varchar(10) NOT NULL,
  `activityDate` varchar(10) NOT NULL,
  `activityTime` varchar(10) NOT NULL,
  `minPeople` int(11) UNSIGNED NOT NULL,
  `maxPeople` int(11) UNSIGNED NOT NULL,
  `location` text NOT NULL,
  `price` int(11) UNSIGNED NOT NULL,
  `content` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `post`
--

INSERT INTO `post` (`postID`, `postIMG`, `type`, `userID`, `postDate`, `title`, `registeredDate`, `registeredTime`, `activityDate`, `activityTime`, `minPeople`, `maxPeople`, `location`, `price`, `content`) VALUES
(0017, 'http://localhost:8000/uploads/1711076813896.jpg', '2', 13, '2024-03-22 03:06:53', '享受咖啡甜點', '2024-03-27', '11:00', '2024-03-25', '03:10', 2, 4, 'dsvdsvdsvsd', 0, 'dvdsvVVDSVsdvdsv'),
(0021, 'http://localhost:8000/uploads/1711078161904.jpg', '5', 13, '2024-03-22 03:29:21', 'rvrrvvrv', '2024-03-26', '03:33', '2024-03-26', '16:34', 0, 6, 'vrvr4v', 0, '4rvrvr4v'),
(0025, 'http://localhost:8000/uploads/1711078980344.jpg', '4', 13, '2024-03-22 03:43:00', 'RTGTGT5', '2024-03-28', '01:44', '2024-03-26', '02:45', 2, 8, 'H53HT5H3T', 0, 'THT5H35TH'),
(0026, 'http://localhost:8000/uploads/1711079076727.png', '1', 13, '2024-03-22 03:44:36', '4v4v4v', '2024-03-27', '02:47', '2024-03-27', '02:47', 2, 8, '4vv4', 0, 'dsvdsvDSV');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `post`
--
ALTER TABLE `post`
  MODIFY `postID` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
