/*
  Warnings:

  - The primary key for the `appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointment_date` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `appointment_id` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `doctor_id` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `hospital_id` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `specialty_id` on the `doctor` table. All the data in the column will be lost.
  - The primary key for the `hospital` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contact_info` on the `hospital` table. All the data in the column will be lost.
  - You are about to drop the column `hospital_id` on the `hospital` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `hospital` table. All the data in the column will be lost.
  - The primary key for the `location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `location_id` on the `location` table. All the data in the column will be lost.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_date` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `program_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `order` table. All the data in the column will be lost.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `payment_date` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `payment` table. All the data in the column will be lost.
  - The primary key for the `program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `program_id` on the `program` table. All the data in the column will be lost.
  - The primary key for the `specialty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `specialty_id` on the `specialty` table. All the data in the column will be lost.
  - You are about to drop the column `specialty_name` on the `specialty` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `appointmentDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Specialty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialtyName` to the `Specialty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_doctor_id_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_payment_id_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `Doctor_hospital_id_fkey`;

-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `Doctor_specialty_id_fkey`;

-- DropForeignKey
ALTER TABLE `hospital` DROP FOREIGN KEY `Hospital_location_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_payment_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_program_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_user_id_fkey`;

-- DropIndex
DROP INDEX `Appointment_doctor_id_fkey` ON `appointment`;

-- DropIndex
DROP INDEX `Appointment_payment_id_fkey` ON `appointment`;

-- DropIndex
DROP INDEX `Appointment_user_id_fkey` ON `appointment`;

-- DropIndex
DROP INDEX `Doctor_hospital_id_fkey` ON `doctor`;

-- DropIndex
DROP INDEX `Doctor_specialty_id_fkey` ON `doctor`;

-- DropIndex
DROP INDEX `Hospital_location_id_fkey` ON `hospital`;

-- DropIndex
DROP INDEX `Order_payment_id_fkey` ON `order`;

-- DropIndex
DROP INDEX `Order_program_id_fkey` ON `order`;

-- DropIndex
DROP INDEX `Order_user_id_fkey` ON `order`;

-- AlterTable
ALTER TABLE `appointment` DROP PRIMARY KEY,
    DROP COLUMN `appointment_date`,
    DROP COLUMN `appointment_id`,
    DROP COLUMN `doctor_id`,
    DROP COLUMN `payment_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `appointmentDate` DATETIME(3) NOT NULL,
    ADD COLUMN `doctorId` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `paymentId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `hospital_id`,
    DROP COLUMN `specialty_id`,
    ADD COLUMN `hospitalId` INTEGER NOT NULL,
    ADD COLUMN `specialtyId` INTEGER NOT NULL,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `hospital` DROP PRIMARY KEY,
    DROP COLUMN `contact_info`,
    DROP COLUMN `hospital_id`,
    DROP COLUMN `location_id`,
    ADD COLUMN `contactInfo` VARCHAR(191) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `locationId` INTEGER NOT NULL,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `location` DROP PRIMARY KEY,
    DROP COLUMN `location_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    DROP COLUMN `order_date`,
    DROP COLUMN `order_id`,
    DROP COLUMN `payment_id`,
    DROP COLUMN `program_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentId` INTEGER NULL,
    ADD COLUMN `programId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    DROP COLUMN `payment_date`,
    DROP COLUMN `payment_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `program` DROP PRIMARY KEY,
    DROP COLUMN `program_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `specialty` DROP PRIMARY KEY,
    DROP COLUMN `specialty_id`,
    DROP COLUMN `specialty_name`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `specialtyName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `Specialty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hospital` ADD CONSTRAINT `Hospital_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
