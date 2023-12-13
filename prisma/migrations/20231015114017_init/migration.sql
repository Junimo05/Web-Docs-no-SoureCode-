-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL DEFAULT '',
    `last_name` VARCHAR(191) NULL DEFAULT '',
    `email` VARCHAR(191) NULL DEFAULT '',
    `password` VARCHAR(191) NULL DEFAULT '',
    `address` VARCHAR(191) NULL DEFAULT '',
    `city` VARCHAR(191) NULL DEFAULT '',
    `phone_number` VARCHAR(191) NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `role` VARCHAR(191) NULL DEFAULT 'customer',
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
