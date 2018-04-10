-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Czas generowania: 19 Lut 2018, 20:25
-- Wersja serwera: 5.7.19
-- Wersja PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `technikiwww`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `filmy`
--

DROP TABLE IF EXISTS `filmy`;
CREATE TABLE IF NOT EXISTS `filmy` (
  `idFilm` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dataFilm` datetime DEFAULT NULL,
  `nazwaFilm` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`idFilm`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `filmy`
--

INSERT INTO `filmy` (`idFilm`, `dataFilm`, `nazwaFilm`) VALUES
(3, '2018-02-27 14:15:00', 'Narzeczony na niby'),
(4, '2018-02-24 18:00:00', 'Wszystkie pieniądze świata'),
(5, '2018-02-25 21:30:00', 'Pasażer'),
(6, '2018-02-25 16:00:00', 'Czwarta władza'),
(7, '2018-02-26 22:45:00', 'Czarna Pantera');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rezerwacja`
--

DROP TABLE IF EXISTS `rezerwacja`;
CREATE TABLE IF NOT EXISTS `rezerwacja` (
  `idRezerwacja` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dataRezerwacja` datetime DEFAULT CURRENT_TIMESTAMP,
  `miejsceRezerwacja` int(10) UNSIGNED DEFAULT NULL,
  `imieRezerwacja` varchar(20) DEFAULT NULL,
  `nazwiskoRezerwacja` varchar(20) DEFAULT NULL,
  `filmRezerwacja` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`idRezerwacja`),
  KEY `filmRezerwacja` (`filmRezerwacja`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `rezerwacja`
--

INSERT INTO `rezerwacja` (`idRezerwacja`, `dataRezerwacja`, `miejsceRezerwacja`, `imieRezerwacja`, `nazwiskoRezerwacja`, `filmRezerwacja`) VALUES
(1, '2018-02-19 20:58:31', 37, 'Jan', 'Kowalski', 3),
(4, '2018-02-19 20:59:31', 52, 'Karolina', 'Kowalska', 4);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `rezerwacja`
--
ALTER TABLE `rezerwacja`
  ADD CONSTRAINT `rezerwacja_ibfk_1` FOREIGN KEY (`filmRezerwacja`) REFERENCES `filmy` (`idFilm`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
