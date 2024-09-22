-- DropIndex
DROP INDEX `RationaleDecision_decisionId_key` ON `rationaledecision`;

-- AddForeignKey
ALTER TABLE `RationaleDecision` ADD CONSTRAINT `RationaleDecision_id_fkey` FOREIGN KEY (`id`) REFERENCES `DecisionList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
