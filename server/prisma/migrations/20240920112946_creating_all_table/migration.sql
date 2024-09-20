/*
  Warnings:

  - You are about to drop the column `createdAt` on the `specialtycode` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `specialtycode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `specialtycode` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `DecisionList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `decision` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RationaleDecision` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `decisionText` VARCHAR(191) NOT NULL,
    `decisionId` INTEGER NOT NULL,
    `rationaleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RationaleDecision_decisionId_key`(`decisionId`),
    UNIQUE INDEX `RationaleDecision_rationaleId_key`(`rationaleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RationaleProcedure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceCodeFrom` INTEGER NOT NULL,
    `serviceCodeTo` INTEGER NOT NULL,
    `serviceCodeList` INTEGER NOT NULL,
    `rationaleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RationaleModifier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modifierList` VARCHAR(191) NOT NULL,
    `rationaleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RationaleDecision` ADD CONSTRAINT `RationaleDecision_decisionId_fkey` FOREIGN KEY (`decisionId`) REFERENCES `DecisionList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleDecision` ADD CONSTRAINT `RationaleDecision_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleProcedure` ADD CONSTRAINT `RationaleProcedure_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleModifier` ADD CONSTRAINT `RationaleModifier_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
