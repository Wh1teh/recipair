-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 22, 2023 at 07:57 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipair`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(10) NOT NULL,
  `writer_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` mediumtext NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `edit_date` date NOT NULL DEFAULT current_timestamp(),
  `edited` tinyint(1) NOT NULL DEFAULT 0,
  `rating` float(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `writer_id`, `title`, `content`, `date`, `edit_date`, `edited`, `rating`) VALUES
(4, 2, 'Tonkatsu', 'Instructions:\n1. Start by pounding the pork chops to tenderize them. Place each pork chop between two sheets of plastic wrap and gently pound with a meat mallet or rolling pin until they are about 1/4 inch thick. Season both sides of the pork chops with salt and pepper.\n\n2. Set up a breading station. Place the flour on a plate. In a shallow bowl, lightly beat the eggs. Put the panko breadcrumbs on another plate.\n\n3. Dredge each pork chop in the flour, shaking off any excess. Next, dip them into the beaten eggs, allowing the excess to drain off. Finally, coat the pork chops evenly with the panko breadcrumbs, pressing gently to adhere.\n\n4. Heat vegetable oil in a large frying pan or deep fryer to about 350°F (180°C). Make sure the oil is deep enough to fully submerge the pork chops.\n\n5. Carefully place the breaded pork chops into the hot oil and fry for about 3-4 minutes on each side, or until golden brown and crispy. You may need to cook them in batches to avoid overcrowding the pan.\n\n6. Once cooked, transfer the tonkatsu to a paper towel-lined plate to drain excess oil.\n\n7. Slice the tonkatsu into thick pieces and serve with tonkatsu sauce, shredded cabbage, and cooked rice on the side. You can also garnish with some chopped scallions or serve with a side of miso soup for a complete Japanese meal.\n\nEnjoy your homemade tonkatsu!', '2023-09-22', '2023-09-22', 0, 4.51),
(5, 1, 'American Pancakes', 'Instructions:\n1. In a mixing bowl, whisk together the flour, baking powder, salt, and sugar.\n2. In a separate bowl, whisk together the milk, egg, and melted butter until well combined.\n3. Pour the wet ingredients into the dry ingredients and stir until just combined. Be careful not to overmix; it\'s okay if there are a few lumps.\n4. Preheat a non-stick pan or griddle over medium heat. If needed, lightly grease the pan with butter or cooking spray.\n5. Spoon about 1/4 cup of batter onto the pan for each pancake. Cook until bubbles form on the surface and the edges look set, around 2-3 minutes.\n6. Flip the pancake and cook for an additional 1-2 minutes, or until golden brown and cooked through.\n7. Remove the pancake from the pan and keep warm. Repeat the process with the remaining batter.\n8. Serve the pancakes warm with your choice of toppings such as maple syrup, fresh berries, or chocolate chips.\n\nEnjoy your homemade American pancakes!', '2023-09-22', '2023-09-22', 0, 3.57),
(6, 1, 'Egg Fried Rice', 'Heat the oil in a large skillet or wok over medium heat.\r\nAdd the diced carrots and cook for about 2-3 minutes until they start to soften.\r\nAdd the frozen peas and cook for another 2 minutes.\r\nPush the vegetables to one side of the skillet and pour the beaten eggs into the other side.\r\nScramble the eggs until they are cooked through, then mix them with the vegetables.\r\nAdd the cold cooked rice to the skillet and mix well with the vegetables and scrambled eggs.\r\nDrizzle the soy sauce over the rice mixture and season with salt and pepper to taste.\r\nStir fry everything together for about 3-4 minutes, ensuring the rice is heated through.\r\nAdd the chopped spring onions and cook for an additional minute.\r\nRemove from heat and serve hot.\r\nEnjoy your homemade egg fried rice!', '2023-09-27', '2023-09-27', 0, 4.02),
(7, 2, 'Omelette', 'Crack the eggs into a bowl and whisk until well beaten. Season with salt and pepper according to your taste.\r\nHeat a non-stick frying pan over medium heat. Add the butter and let it melt, ensuring it coats the entire pan.\r\nPour the beaten eggs into the pan and let them cook undisturbed for about 1-2 minutes until the edges start to set.\r\nUse a spatula to gently lift the edges of the omelette, tilting the pan to distribute the uncooked eggs to the edges.\r\nOnce the omelette is mostly set, add your desired fillings on one half of the omelette.\r\nFold the other half of the omelette over the fillings and gently press down with the spatula.\r\nCook for an additional 1-2 minutes to ensure the fillings are heated through and the omelette is fully cooked.\r\nSlide the omelette onto a plate and serve hot with a side of toast, salad, or any other accompaniments you prefer.\r\nEnjoy your delicious omelette!', '2023-09-27', '2023-09-27', 0, 2.50),
(8, 1, 'Crispy Chicken Burger', 'Preheat the oven to 375°F (190°C).\r\nPlace the chicken breasts between two sheets of plastic wrap and gently pound them until they are about 1/2 inch thick. Season with salt and pepper on both sides.\r\nIn three separate shallow bowls, prepare your breading station. In the first bowl, mix flour with paprika, garlic powder, onion powder, salt, and pepper. In the second bowl, beat the eggs. In the third bowl, combine breadcrumbs with salt and pepper.\r\nCoat each chicken breast in flour mixture, shaking off any excess. Then dip it into the beaten eggs, allowing any excess to drip off, and finally coat the chicken in the breadcrumb mixture, pressing down lightly to adhere.\r\nHeat vegetable oil in a large skillet over medium-high heat. Once the oil is hot, add the breaded chicken breasts and cook for about 4-5 minutes on each side or until golden brown and crispy. Transfer the chicken to a baking sheet and finish cooking in the preheated oven for about 10-12 minutes or until fully cooked through.\r\nWhile the chicken is baking, prepare your burger buns. Toast the buns for a few minutes in a pan or oven until they are slightly crispy.\r\nOnce the chicken is cooked and crispy, remove it from the oven and let it rest for a few minutes. Then assemble your crispy chicken burgers.\r\nSpread mayonnaise and mustard on the toasted buns. Place a lettuce leaf on the bottom bun, followed by a crispy chicken breast. Top with sliced tomatoes, onions, and pickles. Finish off with the top bun.\r\nServe immediately and enjoy your delicious crispy chicken burger! Optionally, accompany it with your favorite sides such as fries or coleslaw.\r\nNote: Feel free to experiment with additional toppings and condiments to suit your preferences.)', '2023-09-27', '2023-09-27', 0, 4.99),
(9, 2, 'Orange Chicken', 'In a medium-sized bowl, whisk together the orange juice, soy sauce, honey, rice vinegar, minced garlic, grated ginger, salt, and pepper. Set aside.\r\nIn a small bowl, mix together the cornstarch and water until smooth. Set aside. This will be used as a thickening agent for the sauce.\r\nSeason the chicken pieces with salt and pepper. Heat oil in a large skillet or wok over medium-high heat.\r\nAdd the chicken to the skillet and cook, stirring occasionally, until well-browned and cooked through. This usually takes about 5-7 minutes. Remove the chicken from the skillet and set aside.\r\nIn the same skillet, reduce the heat to medium and add the orange sauce mixture. Bring it to a simmer and cook for about 2-3 minutes until heated through.\r\nSlowly pour the cornstarch-water mixture into the skillet while stirring constantly. Continue stirring until the sauce thickens, usually within 1-2 minutes.\r\nReturn the cooked chicken to the skillet and stir until all the chicken pieces are well coated with the orange sauce. Cook for an additional 2-3 minutes to heat the chicken through.\r\nOnce the chicken is coated with the sauce and heated through, remove from heat. Garnish with chopped green onions.\r\nServe the orange chicken hot over steamed rice, noodles, or with a side of vegetables. Enjoy!\r\nNote: You can also add extra orange zest or red pepper flakes for more flavor and heat, respectively.', '2023-09-27', '2023-09-27', 0, 3.75);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredient`
--

CREATE TABLE `recipe_ingredient` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `unit` varchar(8) DEFAULT NULL,
  `optional` tinyint(1) NOT NULL DEFAULT 0,
  `snippet` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_ingredient`
--

INSERT INTO `recipe_ingredient` (`id`, `recipe_id`, `name`, `amount`, `unit`, `optional`, `snippet`) VALUES
(1, 4, 'pork', 300, 'gram', 0, ''),
(2, 4, 'panko', 2, 'dl', 0, ''),
(3, 4, 'flour', 1, 'dl', 0, ''),
(4, 4, 'egg', 1, '', 0, ''),
(6, 4, 'salt', NULL, NULL, 0, ''),
(7, 4, 'pepper', NULL, NULL, 0, ''),
(8, 4, 'ketchup', 60, 'ml', 0, ''),
(9, 4, 'oil', NULL, NULL, 0, ''),
(10, 4, 'worcestershire sauce', 40, 'ml', 0, ''),
(11, 4, 'soy sauce', 15, 'ml', 0, ''),
(12, 4, 'garlic powder', NULL, NULL, 0, ''),
(13, 4, 'onion powder', NULL, NULL, 0, ''),
(14, 4, 'sugar', 8, 'ml', 0, ''),
(15, 5, 'self-raising flour', 200, 'g', 0, NULL),
(16, 5, 'baking powder', 2, 'tsp', 0, NULL),
(17, 5, 'golden caster sugar', 1, 'tbsp', 0, NULL),
(18, 5, 'large eggs', 3, NULL, 0, NULL),
(19, 5, 'melted butter', 25, 'g', 0, NULL),
(20, 5, 'milk', 200, 'ml', 0, NULL),
(21, 5, 'vegetable oil', NULL, NULL, 0, NULL),
(22, 6, 'eggs', 4, NULL, 0, NULL),
(23, 6, 'cooking oil', 3, 'tbsp', 0, NULL),
(24, 6, 'diced onion', 1, 'cup', 0, NULL),
(25, 6, 'vegetables', 2, 'cup', 0, NULL),
(26, 6, 'sliced scallions', 1, 'cup', 0, NULL),
(27, 6, 'salt', NULL, NULL, 0, NULL),
(28, 6, 'cooked overnight jasmine rice', 4, 'cup', 0, NULL),
(29, 6, 'soy sauce', 3, 'tbsp', 0, NULL),
(30, 6, 'five-spice powder', 1, 'tsp', 0, NULL),
(31, 6, 'ground white pepper', NULL, NULL, 1, NULL),
(32, 6, 'toasted sesame oil', 1, 'tsp', 0, NULL),
(33, 7, 'eggs', 3, NULL, 0, NULL),
(34, 7, 'unsalted butter', 2, 'knobs', 0, NULL),
(35, 7, 'finely, freshly grated parmesan', 1, 'tsp', 0, NULL),
(36, 7, 'chopped tarragon leaves', 2, NULL, 1, NULL),
(37, 7, 'snipped chives and chopped chervil or parsley', 1, 'tbsp', 1, NULL),
(38, 8, 'large chicken breasts', 3, NULL, 0, NULL),
(39, 8, 'buttermilk', 1, 'cup', 0, NULL),
(40, 8, 'salt', 1, 'tsp', 0, NULL),
(41, 8, 'white pepper', 0, 'tsp', 0, NULL),
(42, 8, 'garlic salt', 0, 'tsp', 0, NULL),
(43, 8, 'plain all-purpose flour', 180, 'g', 0, NULL),
(44, 8, 'salt', 1, 'tsp', 0, NULL),
(45, 8, 'ground black pepper', 1, 'tsp', 0, NULL),
(46, 8, 'garlic salt', 1, 'tsp', 0, NULL),
(47, 8, 'celery salt', 1, 'tsp', 0, NULL),
(48, 8, 'dried thyme', 1, 'tsp', 0, NULL),
(49, 8, 'parika', 1, 'tsp', 0, NULL),
(50, 8, 'baking powder', 1, 'tsp', 0, NULL),
(51, 8, 'chilli flakes', 1, 'tsp', 0, NULL),
(52, 8, 'coleslaw', NULL, NULL, 0, NULL),
(53, 8, 'frying oil', 1, 'l', 0, NULL),
(54, 8, 'gouda cheese', 4, 'slices', 0, NULL),
(55, 8, 'brioche buns', 4, NULL, 0, NULL),
(56, 8, 'crunchy lettuce', NULL, NULL, 0, NULL),
(57, 8, 'red onion', 1, NULL, 0, NULL),
(58, 8, 'jalapenos', 2, NULL, 0, NULL),
(59, 9, 'Boneless Skinless Chicken Breasts', 4, NULL, 0, NULL),
(60, 9, 'eggs', 3, NULL, 0, NULL),
(61, 9, 'Cornstarch', 0, 'cup', 0, NULL),
(62, 9, 'Flour', 0, 'cup', 0, NULL),
(63, 9, 'Salt', NULL, NULL, 0, NULL),
(64, 9, 'cooking oil', NULL, NULL, 0, NULL),
(65, 9, 'Orange Juice', 1, 'cup', 0, NULL),
(66, 9, 'Sugar', 1, 'cup', 0, NULL),
(67, 9, 'Rice Vinegar or White Vinegar', 2, 'tbsp', 0, NULL),
(68, 9, 'Soy Sauce', 2, 'tbsp', 0, NULL),
(69, 9, 'ginger', 0, 'tsp', 0, NULL),
(70, 9, 'garlic powder', 0, 'tsp', 0, NULL),
(71, 9, 'red chili flakes', 1, 'tsp', 0, NULL),
(72, 9, 'orange zest', NULL, NULL, 0, NULL),
(73, 9, 'cornstarch', 1, 'tbsp', 0, NULL),
(74, 9, 'Green Onions', NULL, NULL, 0, NULL),
(75, 9, 'Orange Zest', NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_picture`
--

CREATE TABLE `recipe_picture` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `picture` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `writer`
--

CREATE TABLE `writer` (
  `id` int(11) NOT NULL,
  `nickname` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `writer`
--

INSERT INTO `writer` (`id`, `nickname`) VALUES
(1, 'Fennekki'),
(2, 'Markus');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_writer_id` (`writer_id`) USING BTREE;

--
-- Indexes for table `recipe_ingredient`
--
ALTER TABLE `recipe_ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`) USING BTREE;

--
-- Indexes for table `recipe_picture`
--
ALTER TABLE `recipe_picture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_recipe_id` (`recipe_id`);

--
-- Indexes for table `writer`
--
ALTER TABLE `writer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `recipe_ingredient`
--
ALTER TABLE `recipe_ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `recipe_picture`
--
ALTER TABLE `recipe_picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `writer`
--
ALTER TABLE `writer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipe`
--
ALTER TABLE `recipe`
  ADD CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`id`);

--
-- Constraints for table `recipe_ingredient`
--
ALTER TABLE `recipe_ingredient`
  ADD CONSTRAINT `recipe_ingredient_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipe_picture`
--
ALTER TABLE `recipe_picture`
  ADD CONSTRAINT `recipe_picture_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
