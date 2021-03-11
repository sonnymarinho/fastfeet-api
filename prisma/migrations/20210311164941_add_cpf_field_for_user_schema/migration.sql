/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[cpf]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - Added the required column `cpf` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cpf" TEXT NOT NULL,
ALTER COLUMN "deliveryman" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users.cpf_unique" ON "users"("cpf");
