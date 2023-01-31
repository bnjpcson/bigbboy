-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2023 at 10:26 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bigbboy`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `paragraph` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `paragraph`, `created_at`, `updated_at`) VALUES
(3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis facere soluta voluptatum vitae sunt voluptates dicta, ducimus in. Laudantium delectus voluptas, porro sunt quidem tempore quas assumenda voluptatem fugit ab?', '2022-06-13 14:11:52', '2022-06-13 14:11:52'),
(4, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis animi cupiditate distinctio dolore? Repudiandae possimus similique tempora rem quod iusto provident distinctio illum, dolorum repellat quos recusandae rerum mollitia aliquam?', '2022-06-13 14:12:08', '2022-06-13 14:12:08'),
(5, 'orem ipsum dolor sit amet, consectetur adipisicing elit. Neque voluptas esse fuga nesciunt maiores aliquam fugit fugiat vel impedit iusto, officia, repellendus quaerat blanditiis? Provident perferendis accusantium similique explicabo ea.', '2022-06-13 23:58:25', '2022-06-14 00:46:22'),
(7, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores eius ex fugit veritatis ducimus laboriosam dolorum maiores rerum voluptatum? Consequuntur at officiis quod neque distinctio nulla tenetur est magni mollitia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quasi quis consequatur repellat doloremque beatae sed ea velit, obcaecati iusto sapiente eligendi aut veritatis expedita amet a, vel libero dolorum!', '2022-06-14 01:12:53', '2022-06-14 01:12:53'),
(8, 'asdasdas', '2022-06-14 23:45:20', '2022-06-14 23:45:20');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phonenum` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `name`, `username`, `email`, `phonenum`, `password`) VALUES
(3, 'bigbboy', 'bigbboy', 'bigbboy@example.com', '09123456789', '$2b$10$0vBYkKvt49SMaYkV.r0XEOKrEMCkxxQLx5fl9LaV8wWzsq/sfwlRy'),
(4, 'John Doe', 'admin', 'admin@example.com', '09123456789', '$2b$10$cEOxkPVS/m3tRKWlfsTYL.ixshL61b.jGrgtfexk6JpoFj88sbHH.');

-- --------------------------------------------------------

--
-- Table structure for table `carousels`
--

CREATE TABLE `carousels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carousels`
--

INSERT INTO `carousels` (`id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'bg1_1655337708.jpg', '2022-06-15 16:01:48', '2022-06-15 16:01:48'),
(3, 'bg2_1655337728.jpg', '2022-06-15 16:02:08', '2022-06-15 16:02:08'),
(4, 'bg_1655338908.jpg', '2022-06-15 16:21:48', '2022-06-15 16:21:48'),
(7, 'IMG20220618152219_1655704809.jpg', '2022-06-19 22:00:09', '2022-06-19 22:00:09');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ckeditor`
--

CREATE TABLE `ckeditor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ckeditor`
--

INSERT INTO `ckeditor` (`id`, `content`, `created_at`, `updated_at`) VALUES
(1, '<p>BIGBBOY</p>\n\n<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab in quidem deserunt aliquam ducimus laborum recusandae dolores expedita nemo odit saepe eveniet, laboriosam quibusdam, voluptate facere amet architecto similique ad?</p>\n\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam distinctio, libero ducimus dolor, quam corrupti ullam molestiae harum delectus veniam repellat culpa commodi illum consectetur quod possimus mollitia quasi deserunt!</p>\n\n<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores obcaecati placeat reiciendis soluta in doloribus nihil, odio quasi omnis. Perspiciatis minima non animi odit praesentium iste sequi fugiat nesciunt temporibus.</p>\n\n<p>edited</p>', '2022-06-15 14:31:53', '2022-06-19 22:01:20');

-- --------------------------------------------------------

--
-- Table structure for table `contact-details`
--

CREATE TABLE `contact-details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contact` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact-details`
--

INSERT INTO `contact-details` (`id`, `contact`, `details`, `created_at`, `updated_at`) VALUES
(1, 'Email', 'bigbboy@example.com', '2022-06-14 00:39:47', '2022-06-14 01:05:39'),
(3, 'Phone Number', '09123456789', '2022-06-14 01:05:57', '2022-06-15 13:48:29'),
(4, 'Open Hours', '7:00 AM - 5:00 PM', '2022-06-14 01:06:18', '2022-06-18 04:54:22'),
(5, 'Location', '#10 Rizal Street Poblacion District IV, Pozorrubio, Pangasinan', '2022-06-14 01:06:58', '2022-06-18 04:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `fbposts`
--

CREATE TABLE `fbposts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fbposts`
--

INSERT INTO `fbposts` (`id`, `post_url`, `created_at`, `updated_at`) VALUES
(2, 'https://www.facebook.com/Bigbboy-Motorcycle-Parts-and-Accessories-Shop-102031421334719/photos/a.108828347321693/574039827467207', '2022-06-13 13:36:37', '2022-06-13 13:36:37'),
(4, 'https://www.facebook.com/Bigbboy-Motorcycle-Parts-and-Accessories-Shop-102031421334719/photos/pcb.578000783737778/578038063734050/', '2022-06-14 23:05:44', '2022-06-14 23:05:44'),
(5, 'https://www.facebook.com/Bigbboy-Motorcycle-Parts-and-Accessories-Shop-102031421334719/photos/a.102031571334704/179546153583245', '2022-06-14 23:39:16', '2022-06-14 23:39:16'),
(6, 'https://www.facebook.com/Bigbboy-Motorcycle-Parts-and-Accessories-Shop-102031421334719/photos/pcb.580690456802144/580690433468813/', '2022-06-18 04:50:48', '2022-06-18 04:50:48');

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `gallery_id` bigint(20) UNSIGNED NOT NULL,
  `image_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`gallery_id`, `image_title`, `image_path`, `description`, `created_at`, `updated_at`) VALUES
(2, 'BigBBoy', '287838760_578038060400717_7658665126971798648_n_1655199122.jpg', '#buhaymekaniko', '2022-06-14 01:32:02', '2022-06-14 01:32:02'),
(3, 'BigBBoy', '287769668_578000717071118_2092457946598175511_n_1655199155.jpg', '#buhaymekaniko', '2022-06-14 01:32:35', '2022-06-14 01:32:35'),
(4, 'BigBBoy', '286619186_574690527402137_8638083837758085379_n_1655199198.jpg', '#buhaymekaniko', '2022-06-14 01:33:18', '2022-06-14 01:33:18'),
(5, 'BigBBoy', '286725105_574039824133874_5421850577248417632_n_1655199223.jpg', '#buhaymekaniko', '2022-06-14 01:33:43', '2022-06-14 01:33:43'),
(6, 'BigBBoy', '286209230_573544450850078_1088063957837672857_n_1655199271.jpg', '#buhaymekaniko', '2022-06-14 01:34:31', '2022-06-14 01:34:31'),
(7, 'BigBBoy', '286214510_572921894245667_2863669283829528764_n_1655199297.jpg', '#buhaymekaniko', '2022-06-14 01:34:57', '2022-06-14 01:34:57'),
(8, 'Bigbboy', 'bg1_1655556734.jpg', '#buhaymekaniko (edited)', '2022-06-14 01:35:41', '2022-06-18 04:52:14'),
(9, 'BigBBoy', '286259060_573544494183407_4966973526489993570_n_1655199530.jpg', '#buhaymekaniko', '2022-06-14 01:36:53', '2022-06-14 01:38:50'),
(10, 'BigBBoy', '286641484_573544457516744_4940767763889757219_n_1655199584.jpg', '#buhaymekaniko', '2022-06-14 01:39:44', '2022-06-14 01:39:44'),
(11, 'Sample', '286214510_572921894245667_2863669283829528764_n_1655279015.jpg', 'Hello World', '2022-06-14 23:42:42', '2022-06-14 23:43:35');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `subject`, `message`, `created_at`, `updated_at`) VALUES
(2, 'bigbboy', 'bigbboy@example.com', 'Try Subject', 'Hello po', '2022-06-15 17:08:16', '2022-06-15 17:08:16'),
(3, 'asd', 'asd@yahoo.com', 'asd', 'asd', '2022-06-15 17:14:14', '2022-06-15 17:14:14'),
(4, 'Benjie Pecson', 'benjiepecson1@gmail.com', 'New Subject', 'New message from me', '2022-06-15 17:46:04', '2022-06-15 17:46:04'),
(5, 'Benjie Pecson', 'benjiepecson@yahoo.com', 'Subject', 'Message', '2022-06-18 04:45:37', '2022-06-18 04:45:37'),
(6, 'asdasd', 'asdasd@example.com', 'asdsa', 'dasds', '2022-06-19 22:03:28', '2022-06-19 22:03:28');

-- --------------------------------------------------------

--
-- Table structure for table `mvision`
--

CREATE TABLE `mvision` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mvision`
--

INSERT INTO `mvision` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Mission', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ab totam laboriosam, qui quos suscipit odit minus consequuntur velit, accusamus atque architecto praesentium earum deleniti beatae voluptatem. Consequatur, qui corporis!', '2022-06-13 21:02:36', '2022-06-13 23:17:39'),
(2, 'Vision', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam eius aliquid modi eligendi impedit perferendis cum laborum aspernatur maiores repudiandae dolores ratione quis itaque rem, quaerat laboriosam harum. Sunt, soluta.', '2022-06-13 21:05:20', '2022-06-13 23:18:40');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `userOrders_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `prod_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `prod_name` varchar(255) NOT NULL,
  `prod_price` decimal(18,2) NOT NULL,
  `prod_srp` decimal(18,2) NOT NULL,
  `prod_desc` varchar(255) NOT NULL,
  `imgpath` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`prod_id`, `supplier_id`, `prod_name`, `prod_price`, `prod_srp`, `prod_desc`, `imgpath`, `qty`) VALUES
(1, 2, 'Original Honda TMX Clutch Lining', '468.00', '600.00', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At nisi obcaecati voluptatem dolore nesciunt, laboriosam ea debitis ad laudantium. Quisquam, quasi omnis. Ex doloremque dolores repudiandae voluptatibus, quidem eos laboriosam.', 'Original Honda TMX Clutch Lining_1675083033502.jpg', 10),
(2, 1, 'Break Pads', '410.00', '500.00', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, praesentium autem hic amet voluptatum eos, asperiores quo voluptates officiis temporibus, esse assumenda corporis fugit architecto vitae reiciendis laborum odio quibusdam.', 'Brake Pads_1675087042421.webp', 5),
(6, 1, 'Fuel Floater', '115.00', '200.00', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam dolore, eos illum assumenda voluptatum ratione error itaque sit libero autem non labore nostrum in! Architecto velit voluptate delectus repellat tempore?', 'Fuel Floater_1675087091124.webp', 10),
(7, 1, 'Air Filter', '95.00', '150.00', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum, beatae quae soluta esse, quos, unde hic reiciendis sapiente corporis quis recusandae sit necessitatibus dolore adipisci dolor nihil qui fuga ab.', 'Air Filter_1675087302677.webp', 15),
(8, 1, 'Spark Plug', '120.00', '200.00', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora iste minus sequi ab, aperiam aliquam beatae iusto. Quod incidunt fugiat vero est sit voluptatum beatae illo quaerat, soluta quos error?', 'Sparkplug_1675105633907.webp', 15);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `icon` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `icon`, `title`, `description`, `created_at`, `updated_at`) VALUES
(11, 'screwdriver-wrench-solid_1655704622.svg', 'Repair', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quo aliquid maiores facere quod vero amet ducimus fuga nisi, debitis distinctio quae quibusdam architecto neque vitae est assumenda minus fugit!', '2022-06-15 13:23:09', '2022-06-19 21:57:02'),
(12, 'cart-shopping-solid_1655484236.svg', 'Sell', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum maiores, vero in dolorum labore sit dicta omnis laborum iure iste soluta non sint inventore architecto quis harum, voluptatem facilis. Veritatis.', '2022-06-15 13:23:24', '2022-06-17 08:43:56');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`) VALUES
(1, 'AAA'),
(2, 'BBB');

-- --------------------------------------------------------

--
-- Table structure for table `userorders`
--

CREATE TABLE `userorders` (
  `userOrders_id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `checkout` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userorders`
--

INSERT INTO `userorders` (`userOrders_id`, `user_id`, `prod_id`, `quantity`, `checkout`) VALUES
(1, 5, 8, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phonenum` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `username`, `email`, `phonenum`, `password`) VALUES
(4, 'Benjie Pecson', 'bnjpcson', 'bnjpcson@example.com', '09123456789', '$2b$10$R3Be.QHtE6Cpl/LRui7sJehJ8KVM2wVoctS2kZkyLamPko0OTT/fK'),
(5, 'John Doe', 'admin', 'johndoe@example.com', '09123456789', '$2b$10$e6miw6pFTn1KgKmrxoszMe.9h3vxQ9K2jsOSm2jb0l2EDecQxqSeq'),
(6, 'asd', 'asd', 'asd@example.com', 'asd', '$2b$10$.q3COO.7SKNRSgmHOL7wZ.SIwhOYhV3JDMDZaX/xC4OXGKQZsPow2'),
(7, 'Tim Mc Key', 'timmckey', 'timmckey@gmail.com', '09123456789', '$2b$10$wTH4Zina4RqydNkOox9JleJM1nFJG.bbYrrvA7bxF2HZfI2UfZtlm'),
(8, 'Juana Change', 'juana', 'juanachange@yahoo.com', '09123456789', '$2b$10$0q7DjzOLtgq0D7GHOiBDq.wXaVt5YoujEbpwi5hiBdg1XYyyKz4WG'),
(11, 'Guest', 'Guest', 'guest@example.com', '09123456789', '$2b$10$BQNjap33KrwtFmnfKSVG0..BkrmLwU8MGjmchm5JRSSLV./HB2Spy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `carousels`
--
ALTER TABLE `carousels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ckeditor`
--
ALTER TABLE `ckeditor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact-details`
--
ALTER TABLE `contact-details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fbposts`
--
ALTER TABLE `fbposts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mvision`
--
ALTER TABLE `mvision`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `userOrders_id` (`userOrders_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`prod_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `userorders`
--
ALTER TABLE `userorders`
  ADD PRIMARY KEY (`userOrders_id`),
  ADD KEY `userorders_ibfk_1` (`prod_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `carousels`
--
ALTER TABLE `carousels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ckeditor`
--
ALTER TABLE `ckeditor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact-details`
--
ALTER TABLE `contact-details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `fbposts`
--
ALTER TABLE `fbposts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `gallery_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mvision`
--
ALTER TABLE `mvision`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userorders`
--
ALTER TABLE `userorders`
  MODIFY `userOrders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userOrders_id`) REFERENCES `userorders` (`userOrders_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`);

--
-- Constraints for table `userorders`
--
ALTER TABLE `userorders`
  ADD CONSTRAINT `userorders_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userorders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
