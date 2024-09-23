/*
  Warnings:

  - You are about to drop the column `decisionText` on the `rationaledecision` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[decision]` on the table `DecisionList` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `rationaledecision` DROP COLUMN `decisionText`;

-- CreateIndex
CREATE UNIQUE INDEX `DecisionList_decision_key` ON `DecisionList`(`decision`);
