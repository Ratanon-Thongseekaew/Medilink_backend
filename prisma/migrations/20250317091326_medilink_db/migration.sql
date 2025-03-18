/*
  Warnings:

  - You are about to alter the column `startTime` on the `time` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.
  - You are about to alter the column `endTime` on the `time` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.

*/
-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `doctorleave` DROP FOREIGN KEY `DoctorLeave_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `doctorovertime` DROP FOREIGN KEY `DoctorOvertime_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `doctorschedule` DROP FOREIGN KEY `DoctorSchedule_doctorId_fkey`;

-- DropIndex
DROP INDEX `Appointment_doctorId_fkey` ON `appointment`;

-- DropIndex
DROP INDEX `DoctorLeave_doctorId_fkey` ON `doctorleave`;

-- DropIndex
DROP INDEX `DoctorOvertime_doctorId_fkey` ON `doctorovertime`;

-- DropIndex
DROP INDEX `DoctorSchedule_doctorId_fkey` ON `doctorschedule`;

-- AlterTable
ALTER TABLE `time` MODIFY `startTime` DATETIME(3) NOT NULL,
    MODIFY `endTime` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorSchedule` ADD CONSTRAINT `DoctorSchedule_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorOvertime` ADD CONSTRAINT `DoctorOvertime_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoctorLeave` ADD CONSTRAINT `DoctorLeave_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
