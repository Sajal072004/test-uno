-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "messages" JSONB NOT NULL DEFAULT '[]';
