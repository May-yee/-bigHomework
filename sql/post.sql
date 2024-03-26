-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-03-26 09:35:27
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
  `postIMG` varchar(200) NOT NULL,
  `type` varchar(10) NOT NULL,
  `host` int(11) UNSIGNED NOT NULL,
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

INSERT INTO `post` (`postID`, `postIMG`, `type`, `host`, `postDate`, `title`, `registeredDate`, `registeredTime`, `activityDate`, `activityTime`, `minPeople`, `maxPeople`, `location`, `price`, `content`) VALUES
(0031, 'http://localhost:8000/uploads/1711353487692.jpg', '0', 14, '2024-03-25 07:58:07', '排球', '2024-03-26', '19:00', '2024-03-26', '21:00', 6, 16, '台中中央公園', 0, 'sadgfhgfhj'),
(0032, 'http://localhost:8000/uploads/1711353609384.jpeg', '0', 14, '2024-03-25 08:00:09', '爬山', '2024-03-28', '19:00', '2024-03-26', '19:01', 2, 0, '大坑9號登山步道', 0, 'safdgdfngn'),
(0033, 'http://localhost:8000/uploads/1711355710773.jpg', '3', 15, '2024-03-25 08:35:10', '你的名字', '2024-03-26', '17:26', '2024-03-26', '19:38', 2, 4, '臺中大遠百威秀影城', 0, 'safdfdgnhg');

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
  MODIFY `postID` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
