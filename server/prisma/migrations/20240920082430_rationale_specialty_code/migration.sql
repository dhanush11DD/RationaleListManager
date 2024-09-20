-- CreateTable
CREATE TABLE `Rationale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `module` VARCHAR(191) NOT NULL DEFAULT 'Medical Review',
    `source` VARCHAR(191) NULL,
    `rationaleSummary` VARCHAR(191) NOT NULL,
    `rationaleText` VARCHAR(191) NOT NULL,
    `enable` BOOLEAN NOT NULL DEFAULT true,
    `groupId` INTEGER NOT NULL,
    `sequence` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialtyCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SpecialtyCode_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RationaleSpecialty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `specialtyCodeId` INTEGER NOT NULL,
    `rationaleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RationaleSpecialty` ADD CONSTRAINT `RationaleSpecialty_specialtyCodeId_fkey` FOREIGN KEY (`specialtyCodeId`) REFERENCES `SpecialtyCode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleSpecialty` ADD CONSTRAINT `RationaleSpecialty_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
