-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2021 at 07:25 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `t&pcell`
--

-- --------------------------------------------------------

--
-- Table structure for table `applydrives`
--

CREATE TABLE `applydrives` (
  `UserId` int(11) NOT NULL,
  `CompanyId` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `applydrives`
--

INSERT INTO `applydrives` (`UserId`, `CompanyId`, `CreatedAt`) VALUES
(48, 1, '2020-09-20 15:19:47'),
(48, 2, '2020-09-20 15:19:50'),
(48, 3, '2020-09-20 15:19:53'),
(48, 4, '2020-09-20 15:19:56'),
(48, 79, '2020-09-20 15:20:00'),
(106, 1, '2020-09-20 15:19:47'),
(106, 2, '2020-09-20 15:19:50'),
(106, 3, '2020-09-20 15:19:53'),
(106, 4, '2020-09-20 15:19:56'),
(106, 79, '2020-09-20 15:20:00'),
(127, 1, '2020-09-20 21:20:07'),
(127, 2, '2020-09-20 21:20:30'),
(128, 1, '2020-09-21 04:48:35'),
(128, 2, '2020-09-21 04:48:38'),
(128, 3, '2020-09-21 04:50:38');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `ID` int(11) NOT NULL,
  `Firstname` varchar(30) NOT NULL,
  `Lastname` varchar(50) NOT NULL,
  `Email` varchar(80) NOT NULL,
  `Phonenumber` varchar(15) NOT NULL,
  `Description` text NOT NULL,
  `Status` enum('Read','Unread') NOT NULL DEFAULT 'Unread',
  `IpAddress` int(90) NOT NULL,
  `ContactedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`ID`, `Firstname`, `Lastname`, `Email`, `Phonenumber`, `Description`, `Status`, `IpAddress`, `ContactedAt`) VALUES
(3, 'nitin', 'yadav', 'nitin@yadav.com', '7030261413', 'testing description for nitin yadav', 'Read', 0, '2020-09-21 04:10:43'),
(4, 'brijesh', 'brijesh', 'brijesh74454@gmail.com', '7030261413', 'tetsing the function of conatct us and post mehtod', 'Read', 0, '2020-09-21 04:10:46'),
(5, 'kamlesh', 'singh', 'brijes445@gmail.com', '7030261413', 'nkljsadlkajsdlk', 'Read', 0, '2020-09-21 04:10:48'),
(6, 'kamlesh', 'sdajds', 'kamles@gmail.com', '77777777777', 'ksdjsladj', 'Unread', 0, '2020-03-07 07:10:49'),
(7, 'kamlesh', 'sdajds', 'kamles@gmail.com', '77777777777', 'ksdjsladj', 'Unread', 0, '2020-03-07 07:10:49'),
(8, 'kamlesh', 'sajalsd', 'kasdkldja@gmail.com', '777777777', 'akjaslfkj', 'Unread', 0, '2020-03-07 07:13:46'),
(9, 'kamlesh', 'lkjdlkajslas', 'jahdkjahskhdasd@gmail.com', '898899898998', 'sjadkjahkdsj\n', 'Unread', 0, '2020-03-07 07:15:22'),
(10, 'lkaslkdl', 'dkjhfdq', 'brijes@jo-mail.com', '8887887878787', 'sdkasdkljaskldklasdkkasd\n\n', 'Unread', 0, '2020-03-07 07:19:05'),
(11, 'lkaslkdl', 'dkjhfdq', 'brijes@jo-mail.com', '8887887878787', 'sdkasdkljaskldklasdkkasd\n\n', 'Unread', 0, '2020-03-07 07:19:06'),
(12, 'sdjkasdl', 'kasadjasd', 'klkk@gmail.com', '8888888888', 'djadlkjlakdjdlkasjdklasjlkd', 'Unread', 0, '2020-03-07 07:21:23'),
(13, 'kljfsdfkjds', 'jdasljlkajsd', 'ksjdkljs@gmail.comk', '8889898989', 'sdkjaskdklasdjlkajsdlk', 'Unread', 0, '2020-03-07 07:22:21'),
(14, 'ajdjkhkjhsd', 'djjkasdkjasd', 'asddas@gmail.com', '988888999999', 'jsadkjasdhaskjd', 'Unread', 0, '2020-03-07 07:24:30'),
(15, 'nandni', 'upa', 'nan@gmail.com', '7030261413', 'FJSHDKJFHKJDSHFKJSDHFKJSDHFKJSDHF DSHJFKHDS KJFHSDKF', 'Unread', 0, '2020-03-11 09:00:40'),
(16, 'DURGESHWAR', 'DURGESHWAR', 'durgeshwar@gmail.ccom', '07030261413', 'CDFNVDLSKJFLSDJFSDLJKFSDF', 'Read', 0, '2020-09-21 04:54:44');

-- --------------------------------------------------------

--
-- Table structure for table `drives`
--

CREATE TABLE `drives` (
  `ID` int(11) NOT NULL,
  `CompanyName` varchar(150) NOT NULL,
  `DriveDate` date DEFAULT NULL,
  `Detail` text,
  `Salary` double DEFAULT NULL,
  `AllowedBranches` set('COMPS','IT','ETRX','CIVIL','EXTC','MECH') DEFAULT NULL,
  `PercentageCrieteria` int(11) DEFAULT NULL,
  `LastDateApply` date DEFAULT NULL,
  `UserID` int(11) NOT NULL,
  `Status` enum('Active','NotActive') DEFAULT 'NotActive',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `drives`
--

INSERT INTO `drives` (`ID`, `CompanyName`, `DriveDate`, `Detail`, `Salary`, `AllowedBranches`, `PercentageCrieteria`, `LastDateApply`, `UserID`, `Status`, `CreatedAt`) VALUES
(1, 'L&T', '2020-09-12', 'Larsen & Toubro Limited, commonly known as L&T is an Indian multinational conglomerate company headquartered in Mumbai, Maharashtra, India. It was founded by two Danish engineers taking refuge in India', 7, 'COMPS,IT,ETRX,CIVIL,EXTC,MECH', 7, '2020-06-08', 48, 'Active', '2020-03-07 00:00:00'),
(2, 'Microsoft', '2020-03-13', 'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.', 5.8, 'IT,ETRX', 55, '2020-03-13', 48, 'Active', '2020-03-13 00:00:00'),
(3, 'TCS', '2020-03-20', 'TATA Consultancy Services Limited is an Indian multinational information technology service and consulting company headquartered in Mumbai, Maharashtra, India.', 5.7, 'IT,ETRX', 65, '2020-03-19', 48, 'Active', '2020-03-17 00:00:00'),
(4, 'Capgemini', '2020-05-20', 'Capgemini SE is a French multinational corporation that provides consulting, technology, professional, and outsourcing services. It is headquartered in Paris, France. Capgemini has over 200,000 employees in over 40 countries, of whom nearly 120,000 are in India', 5.5, 'IT,ETRX,CIVIL', 75, '2020-05-20', 85, 'Active', '2020-04-23 00:00:00'),
(77, 'Salesforce', '2020-04-26', 'Salesforce is an american company which devloped CRM software , it is one the best CRM company', 8, 'IT,ETRX,CIVIL', 8, '2020-04-26', 85, 'NotActive', '2020-04-24 18:30:06'),
(78, 'Cognizant', '2020-04-25', 'Cognizant is an American multinational corporation that provides IT services, including digital, technology, consulting, and operations services. It is headquartered in Teaneck, New Jersey, United States. Cognizant is part of the NASDAQ-100 and trades under CTSH.', 4.5, 'IT,ETRX,EXTC', 6, '2020-04-25', 85, 'NotActive', '2020-04-26 10:12:19'),
(79, 'Test', '2020-09-20', 'test description', 7.8, 'IT', 8, '2020-09-20', 106, 'Active', '2020-09-20 15:08:03'),
(80, 'testimage', '2020-09-15', 'fsdfsfsdfsdfsdf', 7, 'IT,ETRX,CIVIL,EXTC,MECH', 7, '2020-09-15', 127, 'NotActive', '2020-09-20 21:26:59');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `UserID` int(11) NOT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT 'Other',
  `PhNo` varchar(50) DEFAULT NULL,
  `Branch` enum('COMPS','IT','EXTC','ETRX','CIVIL','MECH') DEFAULT 'COMPS',
  `SscMarks` double DEFAULT NULL,
  `HscMarks` double DEFAULT NULL,
  `BeAvg` double DEFAULT NULL,
  `Placed` enum('Placed','NotPlaced') DEFAULT 'NotPlaced',
  `CreatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`UserID`, `Gender`, `PhNo`, `Branch`, `SscMarks`, `HscMarks`, `BeAvg`, `Placed`, `CreatedAt`) VALUES
(48, 'Male', '7030261413', 'COMPS', 78.78, 78, 7.8, 'Placed', '2020-03-12'),
(85, 'Male', '9221401243', 'COMPS', 79.78, 80, 6.5, 'Placed', '2020-04-24'),
(92, 'Male', '7030261413', 'CIVIL', 78.78, 75.75, 7.39, 'Placed', '2020-03-17'),
(99, 'Female', '9594662011', 'MECH', 80, 72, 7.5, 'NotPlaced', '2020-04-15'),
(100, 'Female', '9619313711', 'COMPS', 79, 72, 7.5, 'NotPlaced', '2020-03-05'),
(101, 'Male', '8452028306', 'CIVIL', 90, 79, 8.5, 'Placed', '2020-04-14'),
(102, 'Male', '07030261413', 'IT', 98, 80, 8.5, 'Placed', '2020-04-23'),
(106, 'Male', '989800058', 'EXTC', 70, 68, 7, 'NotPlaced', '0000-00-00'),
(123, 'Male', '78888', 'ETRX', 88, 78, 8, 'Placed', '2020-04-24'),
(124, 'Male', '7030261413', 'IT', 90, 80, 7, 'Placed', '2020-04-24'),
(125, 'Male', '7030289586', 'COMPS', 80, 75, 7.3, 'NotPlaced', '2020-05-30'),
(127, 'Male', '7030261413', 'COMPS', 89, 78, 8.5, 'Placed', '2020-09-20'),
(128, 'Male', '7030261413', 'COMPS', 89, 78, 7.5, 'NotPlaced', '2020-09-21'),
(129, 'Other', NULL, 'COMPS', NULL, NULL, NULL, 'NotPlaced', '2020-10-02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(20) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` text NOT NULL,
  `Role` enum('User','Admin','Manager') NOT NULL DEFAULT 'User',
  `AccessToken` text NOT NULL,
  `CreatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Name`, `Email`, `Password`, `Role`, `AccessToken`, `CreatedAt`) VALUES
(48, 'author', 'author@gmail.com', '$2a$11$kZtRYZnchh08Pi402MLhqeyK.QloXnkAMS1cNCfO3UXsA2/2Iv8Ha', 'Manager', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NDgsIlJvbGUiOiJNYW5hZ2VyIiwiRW1haWwiOiJhdXRob3JAZ21haWwuY29tIiwiaWF0IjoxNTg3MTA2NzQwLCJleHAiOjE1ODcxOTMxNDB9.qjCnT3oT2k4f6wPdeeB8MYB-Qc2eKqlHW9ILPJ14hNo', '2020-03-03'),
(99, 'sonal', 'sonal@gmail.com', '$2a$13$UbTo7Bnq6Iyrk4gaomeaPOK3vw19dinCZHFOBweC/7tfFyvhS5AHm', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InNvbmFsQGdtYWlsLmNvbSIsImlhdCI6MTU4NzE1NDQyMSwiZXhwIjoxNTg3MjQwODIxfQ.fKS6sJt7RxIo5JBisOrQM_coCKKJmpZ-69QsF5T7oiA', '2020-04-17'),
(100, 'Madhura Lad', 'madhu@gmail.com', '$2a$14$3sohBhMXdTPgqVt5Vgs1COsOzxMejOJf.WszkWYMPt686dlin1O1.', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTAwLCJSb2xlIjoiVXNlciIsIkVtYWlsIjoibWFkaHVAZ21haWwuY29tIiwiaWF0IjoxNTg3NjE5NjM0LCJleHAiOjE1ODc3MDYwMzR9.hF431yApklAf_ZOfgVf4STqKJuAE1bQMT8sv6Cub42c', '2020-04-17'),
(101, 'Avinash Mishra', 'avinashmishra755@gmail.com', '$2a$13$qlDGvVRGLxHPTbm65qxaSuPYafK5cWZXdHcHOnPEkzaCVtCOhQada', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTAxLCJSb2xlIjoiVXNlciIsIkVtYWlsIjoiYXZpbmFzaG1pc2hyYTc1NUBnbWFpbC5jb20iLCJpYXQiOjE1ODc2MTkzOTIsImV4cCI6MTU4NzcwNTc5Mn0.Mb4ybOjvtcUxVCI-0_FZPlyR_I0z1-xsubrgVJEYrUA', '2020-04-17'),
(102, 'Abhilasha Mishra', 'abhilashamishra238@gmail.com ', '$2a$10$Mkx9A959Q9PQsQcqDSox6uzf9yz/VuoY8x2vcxzU5Wqj.zM104a8.', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImFiaGlsYXNoYW1pc2hyYTIzOEBnbWFpbC5jb20gIiwiaWF0IjoxNTg3MTU0NjAyLCJleHAiOjE1ODcyNDEwMDJ9.OgVBb11CmWji5Bl9ZOt49OZzVVQqdD38Wx9DDBkXg8A', '2020-04-17'),
(103, 'Ajinkya Pawar', 'ajinkyapawar886@gmail.com', '$2a$11$A90VLpVRpzKEA0T4wA5RmuC12uJ3xMyqi.SIdqnL2aVIZAlgxGgPa', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImFqaW5reWFwYXdhcjg4NkBnbWFpbC5jb20iLCJpYXQiOjE1ODcxNTQ2MzksImV4cCI6MTU4NzI0MTAzOX0.4fHAVS5zTQOFXm2EjNJy62e7H4cGDU9dIc_kxxYgMoI', '2020-04-17'),
(104, 'Aakash Kashyap', 'aakashkashyap049@gmail.com', '$2a$14$7x3DJfo9aKI2rvKEby/R2.BsWCL5WUbcOQpDNyohUMfAaLd3DDPCu', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImFha2FzaGthc2h5YXAwNDlAZ21haWwuY29tIiwiaWF0IjoxNTg3MTU0NjYzLCJleHAiOjE1ODcyNDEwNjN9.ccBSh-L-n3q_UwTZLmw_euG7TBbi-Uk6oogPi2x6uPI', '2020-04-17'),
(105, 'Harshit Mishra', 'mishraharshit59@gmail.com', '$2a$13$msyQI0bye/3761vathM0WOsg2vs01hYcbcFQ1y9/QgGY8l6oFfT2K', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6Im1pc2hyYWhhcnNoaXQ1OUBnbWFpbC5jb20iLCJpYXQiOjE1ODcxNTQ4MDUsImV4cCI6MTU4NzI0MTIwNX0.MSKxOx5z7G3VpxyHwbFXcoz3-0oBv6EnIzLXYbnGD3I', '2020-04-17'),
(106, 'Amit Maurya', 'amtmaurya2648@gmail.com', '$2a$12$nfflbYlONj/gI8YRWf5oVOn0..wyP.Hf7N0Xr/AaKVAfB6u/lktEW', 'Admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTA2LCJSb2xlIjoiQWRtaW4iLCJFbWFpbCI6ImFtdG1hdXJ5YTI2NDhAZ21haWwuY29tIiwiaWF0IjoxNjAwNjE0MDcxLCJleHAiOjE2MDA3MDA0NzF9.OXtlgGid6Q7sTyuBzPyuQVvVcytVZFUrGLHLcdDt9k0', '2020-04-17'),
(107, 'Saajan Kumar Jha', 'saajanjha1998@gmail.com', '$2a$12$jY1ZbgufRkBvISgV55JF4eLE2.8mWrZwAeZmyqxu/aTI9DYibwF.C', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InNhYWphbmpoYTE5OThAZ21haWwuY29tIiwiaWF0IjoxNTg3MTU0ODQ5LCJleHAiOjE1ODcyNDEyNDl9.3XIO0eAPP5M5jbndv4ZMrco_Pu2pLlOxtq2LabuMmiM', '2020-04-17'),
(108, 'Srushti Kamthe', 'srushtikamthe04@gmail.com', '$2a$12$V8/HMWEe6FhuEb9DWmtHQeBPo7WrZpwWET2BtdkSKTJUGb4ztiZfq', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InNydXNodGlrYW10aGUwNEBnbWFpbC5jb20iLCJpYXQiOjE1ODcxNTQ4NzAsImV4cCI6MTU4NzI0MTI3MH0.oCHmBlP6ts-cBxSab50YG9f0-MEPRJb4SmcJS6tnV6U', '2020-04-17'),
(109, 'Pragati Pandey', 'pandeypragati65@gmail.com', '$2a$11$Zhh5vaVyvVGsTF8ClUKfp.MVvOx5/NUUmT0BKXoRY8EWO.WTfGxjS', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InBhbmRleXByYWdhdGk2NUBnbWFpbC5jb20iLCJpYXQiOjE1ODcxNTQ4OTIsImV4cCI6MTU4NzI0MTI5Mn0.sJsj6yX0Nd4Yq78KQlIcNiYjf43dETunD52B58Vbhm4', '2020-04-17'),
(110, 'Praful Pillay', 'prafulpillay66@gmail.com', '$2a$12$ZXzo6Nxtaefdmmi.3VoJi.V9V4LuAe.pT00FOsOeMnSVq733Jyxq2', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InByYWZ1bHBpbGxheTY2QGdtYWlsLmNvbSIsImlhdCI6MTU4NzE1NDkxMywiZXhwIjoxNTg3MjQxMzEzfQ.MUNQwEon-X45eTPC8N05xpZK5Klf4ldTL0lWUyYXpjg', '2020-04-17'),
(111, 'Yash Chowdhary', 'yashchowdhary2000@gmail.com', '$2a$11$XM.SiIr8fgLG6ZgPPq3ON.KQ9JnDM3j5sTnko6B9/emxEsvU7s57S', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6Inlhc2hjaG93ZGhhcnkyMDAwQGdtYWlsLmNvbSIsImlhdCI6MTU4NzE1NDkzMSwiZXhwIjoxNTg3MjQxMzMxfQ.do9N07C28KqI4ZNm9PLC4UbtD5RhPhBKq18j85nK4Gw', '2020-04-17'),
(112, 'Swapnil Shukla', 'imswapnilshukla@gmail.com', '$2a$12$EX92/eybZEVGaONjabrYGu0Zvckm83CArFiQ1rRVlkcdd9jKkiY72', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6Imltc3dhcG5pbHNodWtsYUBnbWFpbC5jb20iLCJpYXQiOjE1ODcxNTQ5NTEsImV4cCI6MTU4NzI0MTM1MX0.h1PeSvnAirHK--Q2QDnrLtjLZNI7mV7GpeVZGA51KsI', '2020-04-17'),
(113, 'Anuj Singh', 'anujsinghemailid@gmail.com', '$2a$11$AS5D62sPP492hKny/jdb6exAD4/AK9Cx/1GanibrFFZ.NEQGLQWTa', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImFudWpzaW5naGVtYWlsaWRAZ21haWwuY29tIiwiaWF0IjoxNTg3MTU0OTcyLCJleHAiOjE1ODcyNDEzNzJ9.CWjC0DZ9geZfEKjl0-0gPmGy7CsZMh_tmBwBMH4Ordg', '2020-04-17'),
(114, 'Meghank Upadhyay', 'meghanku@gmail.com', '$2a$12$xx/Wbyi3txz4uPjMcODOzOyl01iiYjG8ZrRZEmA5uoa0rGCIFFN2a', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6Im1lZ2hhbmt1QGdtYWlsLmNvbSIsImlhdCI6MTU4NzE1NDk5MywiZXhwIjoxNTg3MjQxMzkzfQ.HmQLS7IiQOSKx1qnk9Wch5HiiAy8lIJPKaVtG4CexUQ', '2020-04-17'),
(115, 'yogesh mourya', 'mouryayogesh09@gmail.com', '$2a$11$UCR0TnUa535rfuxTlxOfret8tSkiXXoJWphS1NVu70LxJZ8gEUxhy', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6Im1vdXJ5YXlvZ2VzaDA5QGdtYWlsLmNvbSIsImlhdCI6MTU4NzE1NTAxMywiZXhwIjoxNTg3MjQxNDEzfQ.vqq4cf_dxlypzq2OMMXEFzUem3GmmVjcSna3hnYTrV4', '2020-04-17'),
(116, 'Raj Rajeshirke', 'rajeshirker@gmail.com', '$2a$11$cJ2Qvtxbf6rFusJ/.8Bvk.jf2fRUal5LYjEem8HoCd7vOEXb2g.7y', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InJhamVzaGlya2VyQGdtYWlsLmNvbSIsImlhdCI6MTU4NzE1NTAzMiwiZXhwIjoxNTg3MjQxNDMyfQ.b4Bf1i0WfpRHin-uXpQ_Tze1ZDn2gVOnSJuMwPEpbPk', '2020-04-17'),
(117, 'Hariom Saw', 'hariomsav7@gmail.com', '$2a$12$FgqGblm6Twa7WRtiSL8kCuJvy.NMNaSYcefERqaT3yXkTdIUdtuGS', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImhhcmlvbXNhdjdAZ21haWwuY29tIiwiaWF0IjoxNTg3MTU1MDU3LCJleHAiOjE1ODcyNDE0NTd9.DtQzYzizkHH4-OVjDkrmNRAuzMZubN6fleQTM7JqItg', '2020-04-17'),
(118, 'Nitin Yadav', 'ynitin8451@gmail.com', '$2a$10$.hAtWjmre2P1SgGISB6l1uMAlD3GWlzkZfSmaiOSZz9DM4vB1decG', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InluaXRpbjg0NTFAZ21haWwuY29tIiwiaWF0IjoxNTg3MTU1MDc2LCJleHAiOjE1ODcyNDE0NzZ9.ImwQUyDWCimHrOrwcNSiM8HLeX-IGZAg_Y1hSHaLq44', '2020-04-17'),
(119, 'Priyanka ', 'priya@gmail.com', '$2a$10$61O8zgAEmzW54K1D7H.C3eHSfOOxY0PftFkqEe6FUCh1fMTdpgEZi', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InByaXlhQGdtYWlsLmNvbSIsImlhdCI6MTU4NzY0MDMwNiwiZXhwIjoxNTg3NzI2NzA2fQ.P7YFLhVTDG0o9NxR6P0hqJXjRHeYKUMJSr83IaUt0yk', '2020-04-23'),
(123, 'testinguser', 'test45@gmail.com', '$2a$13$nvHaRd/JN5CI1JLpYGY11O4Ix5ej5W2XyTw5ZDvxzqMFzloJvdlgW', 'Admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6InRlc3Q0NUBnbWFpbC5jb20iLCJpYXQiOjE1ODc3NDM2NzUsImV4cCI6MTU4NzgzMDA3NX0.iNOjdGszNMDrQiKeEiU-QIdpLjWsIUU9sDZz6-bT0Is', '2020-04-24'),
(124, 'Amit kushwaha', 'amitrk6192@gmail.com', '$2a$10$nld7nQmX4BVbINczCmEqn.0XIzXFiLzP9abeyqaA8ZQdznLYYjhSy', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTI0LCJSb2xlIjoiVXNlciIsIkVtYWlsIjoiYW1pdHJrNjE5MkBnbWFpbC5jb20iLCJpYXQiOjE2MDA2MTI1NTQsImV4cCI6MTYwMDY5ODk1NH0.a3sc3rcdvwYr1KKj-Ff3hBwGgl1hjWAyaTa6CD1_tlw', '2020-04-24'),
(125, '', 'singhdurgeshwar1896@gmail.com', '$2a$11$W.FJpKTJDn3e2e722xmPOeGSUhfHC2aOJgNUOPXmPUEC6D5j38QPG', 'Admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTI1LCJSb2xlIjoiQWRtaW4iLCJFbWFpbCI6InNpbmdoZHVyZ2VzaHdhcjE4OTZAZ21haWwuY29tIiwiaWF0IjoxNTkwODQ0OTU0LCJleHAiOjE1OTA5MzEzNTR9.xab1kFejuiaRXPX4z3HWKgIuRnrSJjvIuCuI3YTRcGk', '2020-05-30'),
(127, 'Brijesh Yadav', 'brijes445@gmail.com', '$2a$12$pPT6eJVqSN7uG.rmVGSTPO6jlp9vIoZHVQFZfWDVrlFlKggdvhVzO', 'Admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTI3LCJSb2xlIjoiQWRtaW4iLCJFbWFpbCI6ImJyaWplczQ0NUBnbWFpbC5jb20iLCJpYXQiOjE2MDM4MjA3NjEsImV4cCI6MTYwMzkwNzE2MX0.ajyRM88CeeUqcohFC_n_9XcWm5-yl0nhS8UUen6J2JY', '2020-09-20'),
(128, 'radiuspc', 'radiuspc@gmail.com', '$2a$10$gfj3aYiwFPHlIE/TtOdTbOY1W6gW4Zza8Zh/tFhl7Sd8tPEDur35.', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTI4LCJSb2xlIjoiVXNlciIsIkVtYWlsIjoicmFkaXVzcGNAZ21haWwuY29tIiwiaWF0IjoxNjAwNjYzNjcyLCJleHAiOjE2MDA3NTAwNzJ9.l4PRsgDfQWKHffm4UxymsQii3ZTSKR971i55b39KhTE', '2020-09-21'),
(129, 'test', 'test@test.com', '$2a$11$R5QnFLqOPBRSrf/X6Iemgu7nCdB.s9xzBepYaHauY/g5WBmTujEri', 'Admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTI5LCJSb2xlIjoiQWRtaW4iLCJFbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MDE2MTc3MDYsImV4cCI6MTYwMTcwNDEwNn0.qQDgUkljqFc-Gr8_NX-gtMHretCEN_tb_CwSZnZxUnU', '2020-10-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applydrives`
--
ALTER TABLE `applydrives`
  ADD PRIMARY KEY (`UserId`,`CompanyId`),
  ADD KEY `CompanyId` (`CompanyId`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `drives`
--
ALTER TABLE `drives`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CompanyName` (`CompanyName`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `drives`
--
ALTER TABLE `drives`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
