-- DropForeignKey
ALTER TABLE `rationaledecision` DROP FOREIGN KEY `RationaleDecision_decisionId_fkey`;

-- DropForeignKey
ALTER TABLE `rationaledecision` DROP FOREIGN KEY `RationaleDecision_rationaleId_fkey`;

-- DropForeignKey
ALTER TABLE `rationalemodifier` DROP FOREIGN KEY `RationaleModifier_rationaleId_fkey`;

-- DropForeignKey
ALTER TABLE `rationaleprocedure` DROP FOREIGN KEY `RationaleProcedure_rationaleId_fkey`;

-- DropForeignKey
ALTER TABLE `rationalespecialty` DROP FOREIGN KEY `RationaleSpecialty_rationaleId_fkey`;

-- DropForeignKey
ALTER TABLE `rationalespecialty` DROP FOREIGN KEY `RationaleSpecialty_specialtyCodeId_fkey`;

-- AddForeignKey
ALTER TABLE `RationaleSpecialty` ADD CONSTRAINT `RationaleSpecialty_specialtyCodeId_fkey` FOREIGN KEY (`specialtyCodeId`) REFERENCES `SpecialtyCode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleSpecialty` ADD CONSTRAINT `RationaleSpecialty_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleDecision` ADD CONSTRAINT `RationaleDecision_decisionId_fkey` FOREIGN KEY (`decisionId`) REFERENCES `DecisionList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleDecision` ADD CONSTRAINT `RationaleDecision_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleProcedure` ADD CONSTRAINT `RationaleProcedure_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RationaleModifier` ADD CONSTRAINT `RationaleModifier_rationaleId_fkey` FOREIGN KEY (`rationaleId`) REFERENCES `Rationale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
