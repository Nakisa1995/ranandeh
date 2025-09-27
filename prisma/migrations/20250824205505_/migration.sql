/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `InstructorProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "InstructorProfile" ADD COLUMN     "automatic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "manual" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "yearsExperience" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "InstructorProfile_slug_key" ON "InstructorProfile"("slug");
