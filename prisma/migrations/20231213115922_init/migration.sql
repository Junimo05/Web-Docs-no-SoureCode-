/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `user` table. All the data in the column will be lost.
  - Added the required column `id_User` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `phone_number`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_User` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `phone` VARCHAR(191) NULL DEFAULT '',
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL,
    ADD PRIMARY KEY (`id_User`);

-- CreateTable
CREATE TABLE `Product_Liked` (
    `id_PL` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Pro` INTEGER NOT NULL,
    `id_User` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `ProLike_Pro_fk`(`id_Pro`),
    INDEX `ProLike_User_fk`(`id_User`),
    PRIMARY KEY (`id_PL`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id_Cate` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `image_Cate` VARCHAR(191) NULL DEFAULT '/images/',
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id_Cate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id_Pro` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Cate` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image_Pro` VARCHAR(191) NULL DEFAULT '/images/',
    `description` TEXT NULL,
    `price` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `sold` INTEGER NULL,
    `slug` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `feature` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `Product_category_id_fkey`(`id_Cate`),
    PRIMARY KEY (`id_Pro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon` (
    `id_Coupon` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'percent',
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `uses_per_customer` INTEGER NOT NULL,
    `uses_per_coupon` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `value` INTEGER NULL,
    `min_spend` FLOAT NULL,
    `max_spend` FLOAT NULL,

    UNIQUE INDEX `Coupon_code_key`(`code`),
    PRIMARY KEY (`id_Coupon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id_Cart` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Cus` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `Cart_customer_id_fkey`(`id_Cus`),
    PRIMARY KEY (`id_Cart`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Cart` INTEGER NOT NULL,
    `id_Pro` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `CartItem_cart_id_fkey`(`id_Cart`),
    INDEX `CartItem_product_id_fkey`(`id_Pro`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id_Order` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Cus` INTEGER NOT NULL,
    `id_Staff` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `shipping_fee` FLOAT NULL,
    `total` FLOAT NULL,
    `id_Coupon` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `canceled_at` DATETIME(3) NULL,
    `completed_at` DATETIME(3) NULL,
    `delivery_at` DATETIME(3) NULL,

    INDEX `Order_coupon_id_fkey`(`id_Coupon`),
    INDEX `Order_customer_id_fkey`(`id_Cus`),
    INDEX `Order_staff_id_fkey`(`id_Staff`),
    PRIMARY KEY (`id_Order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Product` (
    `id_Order_Pro` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Order` INTEGER NOT NULL,
    `id_Pro` INTEGER NOT NULL,
    `quantity` INTEGER NULL,
    `price` FLOAT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,

    INDEX `order_id`(`id_Order`),
    INDEX `product_id`(`id_Pro`),
    PRIMARY KEY (`id_Order_Pro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History_Order` (
    `id_HOrder` INTEGER NOT NULL AUTO_INCREMENT,
    `code_HOrder` VARCHAR(191) NOT NULL,
    `id_Cus` INTEGER NOT NULL,
    `id_Order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `History_Order_code_HOrder_key`(`code_HOrder`),
    INDEX `HOrder_Order_id_fk`(`id_Order`),
    INDEX `HOrder_User_id_fk`(`id_Cus`),
    PRIMARY KEY (`id_HOrder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id_Review` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Pro` INTEGER NOT NULL,
    `id_Cus` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `like` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `Review_customer_id_fkey`(`id_Cus`),
    INDEX `Review_product_id_fkey`(`id_Pro`),
    PRIMARY KEY (`id_Review`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product_Liked` ADD CONSTRAINT `Product_Liked_id_Pro_fkey` FOREIGN KEY (`id_Pro`) REFERENCES `Product`(`id_Pro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Liked` ADD CONSTRAINT `Product_Liked_id_User_fkey` FOREIGN KEY (`id_User`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_id_Cate_fkey` FOREIGN KEY (`id_Cate`) REFERENCES `Category`(`id_Cate`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_id_Cus_fkey` FOREIGN KEY (`id_Cus`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_id_Cart_fkey` FOREIGN KEY (`id_Cart`) REFERENCES `Cart`(`id_Cart`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_id_Pro_fkey` FOREIGN KEY (`id_Pro`) REFERENCES `Product`(`id_Pro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_Coupon_fkey` FOREIGN KEY (`id_Coupon`) REFERENCES `Coupon`(`id_Coupon`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_Cus_fkey` FOREIGN KEY (`id_Cus`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_Staff_fkey` FOREIGN KEY (`id_Staff`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Product` ADD CONSTRAINT `Order_Product_id_Order_fkey` FOREIGN KEY (`id_Order`) REFERENCES `Order`(`id_Order`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Product` ADD CONSTRAINT `Order_Product_id_Pro_fkey` FOREIGN KEY (`id_Pro`) REFERENCES `Product`(`id_Pro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History_Order` ADD CONSTRAINT `History_Order_id_Order_fkey` FOREIGN KEY (`id_Order`) REFERENCES `Order`(`id_Order`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `History_Order` ADD CONSTRAINT `History_Order_id_Cus_fkey` FOREIGN KEY (`id_Cus`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_id_Cus_fkey` FOREIGN KEY (`id_Cus`) REFERENCES `User`(`id_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_id_Pro_fkey` FOREIGN KEY (`id_Pro`) REFERENCES `Product`(`id_Pro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
DROP INDEX `User_username_key` ON `user`;
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

