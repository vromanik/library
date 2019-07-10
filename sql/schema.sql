USE `library`;

CREATE TABLE IF NOT EXISTS `library`.`authors` (
  `author_id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45),
  `lastName` VARCHAR(45),
  `birthDate` DATE,
  `gender` INT(1),
  `biography` VARCHAR(2048),
  PRIMARY KEY (`author_id`),
  UNIQUE INDEX `author_id_UNIQUE` (`author_id` ASC) VISIBLE);

CREATE TABLE IF NOT EXISTS `library`.`books` (
  `book_id` INT NOT NULL AUTO_INCREMENT,
  `fk_author_id` INT NOT NULL,
  `title` VARCHAR (64) NOT NULL,
  `releaseDate` DATE,
  `rating` INT(1),
  `description` VARCHAR(1024),
  PRIMARY KEY (`book_id`),
  UNIQUE INDEX `book_id_UNIQUE` (`book_id` ASC) VISIBLE,
  FOREIGN KEY (`fk_author_id`) REFERENCES `library`.`authors` (`author_id`)
);

CREATE TABLE IF NOT EXISTS `library`.`publishers` (
`publisher_id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR (64) NOT NULL,
`foundDate` DATE NOT NULL,
`annualRevenue` DECIMAL(7,2),
`description` VARCHAR(2048),
PRIMARY KEY (`publisher_id`),
UNIQUE INDEX `publisher_id_UNIQUE` (`publisher_id` ASC)VISIBLE);

CREATE TABLE IF NOT EXISTS `library`.`user_addresses` (
`userAddress_id` INT NOT NULL AUTO_INCREMENT,
`country` VARCHAR(2),
`region` VARCHAR(64),
`city` VARCHAR(64),
`streetAddress1` VARCHAR(128),
`streetAddress2` VARCHAR(128),
`postalCode` VARCHAR(16),
PRIMARY KEY (`userAddress_id`),
UNIQUE INDEX `userAddress_id_UNIQUE` (`userAddress_id` ASC)VISIBLE);

CREATE TABLE IF NOT EXISTS `library`.`user_phone_numbers` (
`userPhone_id` INT NOT NULL AUTO_INCREMENT,
`homeNumber` INT(2),
`workNumber` INT(2),
`mobileNumber` INT(2),
PRIMARY KEY (`userPhone_id`),
UNIQUE INDEX `userPhone_id_UNIQUE` (`userPhone_id` ASC)VISIBLE);

#Lookup table
CREATE TABLE IF NOT EXISTS `library`.`user_status` (
`userStatus_id` INT NOT NULL AUTO_INCREMENT,
`userStatus` VARCHAR(16),
PRIMARY KEY (`userStatus_id`),
UNIQUE INDEX `userStatus_id_UNIQUE` (`userStatus_id` ASC)VISIBLE);

CREATE TABLE IF NOT EXISTS `library`.`users` (
`user_id` INT NOT NULL AUTO_INCREMENT,
`fk_userAddress_id` INT NOT NULL, 
`fk_userPhone_id` INT NOT NULL,
`fk_userStatus_id`INT NOT NULL,
`firstName` VARCHAR(64) NOT NULL,
`lastName` VARCHAR(256) NOT NULL,
`birthDate` DATE NOT NULL,
`gender` INT(1) NOT NULL,
PRIMARY KEY (`user_id`),
UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC)VISIBLE,
FOREIGN KEY(`fk_userAddress_id`) REFERENCES `library`.`user_addresses`(`userAddress_id`),
FOREIGN KEY(`fk_userPhone_id`) REFERENCES `library`.`user_phone_numbers`(`userPhone_id`),
FOREIGN KEY(`fk_userStatus_id`) REFERENCES `library`.`user_status`(`userStatus_id`)
);

#Lookup table
CREATE TABLE IF NOT EXISTS `library`.`service_types` (
`serviceType_id` INT NOT NULL AUTO_INCREMENT, #PRIMARY KEY,
`serviceTypeName` VARCHAR(24) NOT NULL,
PRIMARY KEY (`serviceType_id`),
UNIQUE INDEX `serviceType_id_UNIQUE` (`serviceType_id` ASC)VISIBLE
);

#Lookup table
CREATE TABLE IF NOT EXISTS `library`.`process_statuses` (
`processStatus_id` INT NOT NULL AUTO_INCREMENT,
`fk_serviceType_id` INT NOT NULL,
`processStatus` VARCHAR(24) NOT NULL,
PRIMARY KEY (`processStatus_id`),
UNIQUE INDEX `processStatus_id_UNIQUE` (`processStatus_id` ASC)VISIBLE,
FOREIGN KEY (`fk_serviceType_id`) REFERENCES `library`.`service_types`(`serviceType_id`)
);

CREATE TABLE IF NOT EXISTS `library`.`service` (
`service_id` INT NOT NULL AUTO_INCREMENT, 
`fk_serviceType_id` INT NOT NULL,
`fk_processStatus_id` INT NOT NULL,
`fk_user_id` INT NOT NULL,
`fk_book_id` INT NOT NULL,
`processStartDate` DATE NOT NULL,
`processCompleteDate` DATE NOT NULL,
PRIMARY KEY (`service_id`),
UNIQUE INDEX `service_id_UNIQUE` (`service_id` ASC)VISIBLE,
FOREIGN KEY (`fk_serviceType_id`) REFERENCES `library`.`service_types`(`serviceType_id`),
FOREIGN KEY (`fk_processStatus_id`) REFERENCES `library`.`process_statuses`(`processStatus_id`),
FOREIGN KEY (`fk_user_id`) REFERENCES `library`.`users`(`user_id`),
FOREIGN KEY (`fk_book_id`) REFERENCES `library`.`books`(`book_id`)
);