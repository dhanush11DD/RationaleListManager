/*
  Warnings:

  - A unique constraint covering the columns `[decisionId]` on the table `RationaleDecision` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RationaleDecision_decisionId_key` ON `RationaleDecision`(`decisionId`);
