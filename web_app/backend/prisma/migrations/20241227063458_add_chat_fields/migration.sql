/*
  Warnings:

  - You are about to drop the column `message` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "message",
ADD COLUMN     "aiImage" TEXT,
ADD COLUMN     "aiMessage" TEXT,
ADD COLUMN     "userImage" TEXT,
ADD COLUMN     "userMessage" TEXT,
ALTER COLUMN "isUserMessage" DROP NOT NULL;
