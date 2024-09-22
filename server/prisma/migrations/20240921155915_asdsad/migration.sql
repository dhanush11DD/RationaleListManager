-- DropForeignKey
ALTER TABLE `rationaledecision` DROP FOREIGN KEY `RationaleDecision_id_fkey`;

-- AddForeignKey
ALTER TABLE `RationaleDecision` ADD CONSTRAINT `RationaleDecision_decisionId_fkey` FOREIGN KEY (`decisionId`) REFERENCES `DecisionList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
