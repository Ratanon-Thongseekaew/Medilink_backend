const prisma = require("../src/configs/prisma");
const { execSync } = require("node:child_process");
// require("dotenv").config();

async function run() {
  try {
    await prisma.$executeRawUnsafe("DROP DATABASE IF EXISTS `db-medilink`");
    await prisma.$executeRawUnsafe("CREATE DATABASE `db-medilink`");

    execSync("npx prisma db push");
  } catch (err) {
    console.log(err);
  }
}

console.log("Reset DB...");
run();
