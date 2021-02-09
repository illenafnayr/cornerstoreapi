CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`firstName` VARCHAR(30) NOT NULL,
	`lastName` VARCHAR(30) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	`passwd` VARCHAR(50) NOT NULL,
	`ip` VARCHAR(30) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `addresses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`street` VARCHAR(88) NOT NULL,
	`city` VARCHAR(40) NOT NULL,
	`state` VARCHAR(2) NOT NULL,
	`zipcode` INT(5) NOT NULL,
	`isShipping` BOOLEAN NOT NULL,
	`isBilling` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `payments` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`cc_company` VARCHAR(20) NOT NULL,
	`number` INT(16) NOT NULL UNIQUE,
	`exp_month` INT(2) NOT NULL,
	`exp_year` INT(4) NOT NULL,
	`cvv_code` INT(4) NOT NULL,
	`primary` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `phone_numbers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`country_code` INT(2) NOT NULL,
	`area_code` INT(3) NOT NULL,
	`number` INT(7) NOT NULL,
	`type` VARCHAR(10),
	`primary` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `product` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`category_id` INT NOT NULL,
	`description` VARCHAR(400) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `category` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`subcategory_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `subcategory` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`subcategory_value_id` INT NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `subcategory_value` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`price` DECIMAL NOT NULL,
	`qty` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`date` DATETIME NOT NULL,
	`payment_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `addresses` ADD CONSTRAINT `addresses_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `payments` ADD CONSTRAINT `payments_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `phone_numbers` ADD CONSTRAINT `phone_numbers_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `product` ADD CONSTRAINT `product_fk0` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`);

ALTER TABLE `category` ADD CONSTRAINT `category_fk0` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory`(`id`);

ALTER TABLE `subcategory` ADD CONSTRAINT `subcategory_fk0` FOREIGN KEY (`subcategory_value_id`) REFERENCES `subcategory_value`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk1` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk2` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`id`);
