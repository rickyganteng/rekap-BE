-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2023 at 04:09 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kendaraan`
--

-- --------------------------------------------------------

--
-- Table structure for table `bengkel`
--

CREATE TABLE `bengkel` (
  `id_bengkel` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_stnk` int(11) NOT NULL,
  `sisa_anggaran_bengkel` varchar(150) NOT NULL,
  `status_bengkel` varchar(50) NOT NULL,
  `bengkel_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `bengkel_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bensin`
--

CREATE TABLE `bensin` (
  `id_bensin` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_stnk` int(11) NOT NULL,
  `sisa_anggaran_bensin` varchar(150) NOT NULL,
  `status_bensin` varchar(50) NOT NULL,
  `bensin_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `bensin_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pemeliharaan`
--

CREATE TABLE `pemeliharaan` (
  `id_pemeliharaan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_stnk` int(11) NOT NULL,
  `sisa_anggaran` varchar(150) NOT NULL,
  `status_pemeliharaan` varchar(150) NOT NULL,
  `pemeliharaan_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pemeliharaan_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pemeliharaan`
--

INSERT INTO `pemeliharaan` (`id_pemeliharaan`, `id_user`, `id_stnk`, `sisa_anggaran`, `status_pemeliharaan`, `pemeliharaan_created_at`, `pemeliharaan_updated_at`) VALUES
(45, 1, 15, '100000', 'bengkel', '2023-02-27 05:19:48', NULL),
(46, 1, 15, '200000', 'bensin', '2023-02-27 05:22:34', NULL),
(47, 1, 15, '200000', 'bensin', '2023-02-27 08:17:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stnk`
--

CREATE TABLE `stnk` (
  `id_stnk` int(11) NOT NULL,
  `id_user` varchar(150) NOT NULL,
  `nopolisi_stnk` varchar(150) NOT NULL,
  `masa_berlaku_STNK` date NOT NULL,
  `masa_berlaku_pajak_tahunan` date NOT NULL,
  `Pemegang_kendaraan_stnk` varchar(150) NOT NULL,
  `merk_stnk` varchar(150) NOT NULL,
  `tipe_stnk` varchar(150) NOT NULL,
  `jenis_bahan_bakar_stnk` varchar(100) NOT NULL,
  `no_rangka_stnk` varchar(100) NOT NULL,
  `no_mesin_stnk` varchar(100) NOT NULL,
  `jumlah_anggaran_bensin_stnk` varchar(150) NOT NULL,
  `pemakaian_anggaran_bensin_stnk` varchar(100) NOT NULL,
  `jumlah_anggaran_pemeliharaan_stnk` varchar(100) NOT NULL,
  `pemakaian_anggaran_pemeliharaan_stnk` varchar(100) NOT NULL,
  `keterangan_stnk` varchar(250) NOT NULL,
  `stnk_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `stnk_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stnk`
--

INSERT INTO `stnk` (`id_stnk`, `id_user`, `nopolisi_stnk`, `masa_berlaku_STNK`, `masa_berlaku_pajak_tahunan`, `Pemegang_kendaraan_stnk`, `merk_stnk`, `tipe_stnk`, `jenis_bahan_bakar_stnk`, `no_rangka_stnk`, `no_mesin_stnk`, `jumlah_anggaran_bensin_stnk`, `pemakaian_anggaran_bensin_stnk`, `jumlah_anggaran_pemeliharaan_stnk`, `pemakaian_anggaran_pemeliharaan_stnk`, `keterangan_stnk`, `stnk_created_at`, `stnk_updated_at`) VALUES
(2, '', 'qwe123456d', '1899-11-30', '1899-11-30', 'wahyu', '12', '12', '', '', '', '1500000', '0', '', '-200000', 'belum terbayar', '2023-02-02 06:33:55', '2023-02-24 08:52:26'),
(3, '', 'G 2638', '0000-00-00', '0000-00-00', 'saaya', 'honda', 'gl', '', '', '', '1200', '0', '', '0', 'baik', '2023-02-02 20:14:21', NULL),
(7, '', 'xc,mvn', '2023-02-09', '0000-00-00', 'sq', 'x,cmv', ',mcxz', '', '', '', '40000', '0', '0', '0', 'qq', '2023-02-05 17:47:55', '2023-02-05 17:49:53'),
(8, '', 'm', '0000-00-00', '0000-00-00', '', 'm', 'm', '', '', '', '50000', '0', '0', '0', '', '2023-02-05 17:57:06', NULL),
(9, '', 'm', '2023-02-04', '0000-00-00', '', 'm', 'm', '', '', '', '10000', '0', '0', '0', 'm', '2023-02-05 17:57:34', NULL),
(15, '1', '1111', '2023-05-05', '2023-02-27', 'admin123', 'asdlk', 'dd1', 'bensin', '12', '22', '1000000', '400000', '100000', '100000', '', '2023-02-24 10:23:26', '2023-02-27 08:17:51');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `user_role` enum('admin','basic') NOT NULL,
  `user_verification` enum('pending','succes') NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_nip` varchar(100) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_nomor` varchar(100) NOT NULL,
  `user_satker` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `user_role`, `user_verification`, `user_name`, `user_nip`, `user_email`, `user_nomor`, `user_satker`, `user_password`, `user_created_at`, `user_updated_at`) VALUES
(1, 'admin', 'succes', 'admin123', '9293939', 'admin123@gmail.com', '+6285712287514', 'sekretariat p2p\r\n', '$2b$10$QgwTwmzjkHP3jX2zNGgywuogjX5OkgGT25iqJCO0cXi1qcRCyYRwS', '2023-02-02 06:38:51', '2023-02-15 07:35:15'),
(2, 'admin', 'pending', 'sapa hayo', '', 'wdas', '+6285712287514', 'qw', '', '2023-02-03 03:21:28', '2023-02-17 07:07:48'),
(3, 'admin', 'pending', 'edia', '', 'edi@gmail.com', '1230984', 'setditjen p2p', '', '2023-02-03 03:25:48', '2023-02-06 13:20:57'),
(5, 'admin', 'succes', 'ricky', '', 'syahputraricky2@gmail.com', '0823531', 'setditjen p2p', '1123', '2023-02-14 07:01:41', NULL),
(6, 'admin', 'succes', 'dedi', '2939', 'ww@gmail.com', '130932', 'setdijen', '1123', '2023-02-15 07:36:17', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bengkel`
--
ALTER TABLE `bengkel`
  ADD PRIMARY KEY (`id_bengkel`);

--
-- Indexes for table `bensin`
--
ALTER TABLE `bensin`
  ADD PRIMARY KEY (`id_bensin`);

--
-- Indexes for table `pemeliharaan`
--
ALTER TABLE `pemeliharaan`
  ADD PRIMARY KEY (`id_pemeliharaan`);

--
-- Indexes for table `stnk`
--
ALTER TABLE `stnk`
  ADD PRIMARY KEY (`id_stnk`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bengkel`
--
ALTER TABLE `bengkel`
  MODIFY `id_bengkel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bensin`
--
ALTER TABLE `bensin`
  MODIFY `id_bensin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pemeliharaan`
--
ALTER TABLE `pemeliharaan`
  MODIFY `id_pemeliharaan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `stnk`
--
ALTER TABLE `stnk`
  MODIFY `id_stnk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
