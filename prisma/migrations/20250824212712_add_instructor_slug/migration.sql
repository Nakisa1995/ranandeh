/*
  Warnings:

  - You are about to drop the column `automatic` on the `InstructorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `InstructorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `InstructorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `InstructorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `manual` on the `InstructorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `yearsExperience` on the `InstructorProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InstructorProfile" DROP COLUMN "automatic",
DROP COLUMN "avatarUrl",
DROP COLUMN "displayName",
DROP COLUMN "languages",
DROP COLUMN "manual",
DROP COLUMN "yearsExperience";
