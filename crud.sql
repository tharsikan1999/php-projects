-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 09, 2024 at 12:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_no` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `age` int(2) NOT NULL,
  `phone_no` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_no`, `firstname`, `lastname`, `age`, `phone_no`) VALUES
(14, 'Jerry', 'Smith', 36, 444555666),
(15, 'Marry', 'Christmas', 29, 777888998),
(18, 'Charlie', 'Brown', 27, 333444555),
(19, 'David', 'Taylor', 29, 666777888),
(20, 'Emma', 'Anderson', 26, 222333444),
(21, 'Frank', 'Davis', 32, 777666555),
(22, 'Grace', 'Wilson', 23, 444555666),
(24, 'Isabella', 'Hernandez', 24, 555666777),
(27, 'Liam', 'Rodriguez', 25, 333444555),
(28, 'Mia', 'Perez', 34, 999888777),
(29, 'Noah', 'Garcia', 29, 777888999),
(30, 'Olivia', 'Rivera', 26, 555444333),
(31, 'Peter', 'Torres', 35, 222333444),
(32, 'Quinn', 'Ramirez', 30, 888777666),
(41, 'tharsikan', 'tharsikan', 30, 1234567);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_no`),
  ADD UNIQUE KEY `student_no_uni` (`student_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
