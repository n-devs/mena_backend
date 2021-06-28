CREATE TABLE IF NOT EXISTS `manage_project`.`privilege` (
  `type` INT NOT NULL,
  `detail` VARCHAR(5) NULL DEFAULT NULL,
  PRIMARY KEY (`type`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `manage_project`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullName` TEXT NULL DEFAULT NULL,
  `email` TEXT NULL DEFAULT NULL,
  `phoneNumber` VARCHAR(15) NULL DEFAULT NULL,
  `profession` TEXT NULL DEFAULT NULL,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `password` TEXT NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `privilege_type` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_user_privilege_idx` (`privilege_type` ASC) VISIBLE,
  CONSTRAINT `fk_user_privilege`
    FOREIGN KEY (`privilege_type`)
    REFERENCES `manage_project`.`privilege` (`type`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `manage_project`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_id` VARCHAR(45) NULL,
  `title` TEXT NULL,
  `detail` TEXT NULL,
  `type` TEXT NULL,
  `abstract` TEXT NULL,
  `year` INT NULL,
  `url` TEXT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_project_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `manage_project`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `manage_project`.`view` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `project_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_view_project1_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk_view_project1`
    FOREIGN KEY (`project_id`)
    REFERENCES `manage_project`.`project` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `manage_project`.`contact_us` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullName` TEXT NULL,
  `profession` TEXT NULL,
  `phoneNumber` VARCHAR(15) NULL,
  `email` VARCHAR(255) NULL,
  `message` TEXT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;