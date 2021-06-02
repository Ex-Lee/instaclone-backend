/*
  Warnings:

  - You are about to drop the `CoffeeShopPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey";

-- DropTable
DROP TABLE "CoffeeShopPhoto";
