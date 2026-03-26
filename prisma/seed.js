// prisma/seed.js
require("dotenv/config"); // 加载 .env 文件

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString = process.env.DIRECT_URL;
if (!connectionString) {
  throw new Error("❌ DIRECT_URL is not defined in .env");
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

const products = require("./products.json");

async function main() {
  console.log("🌱 开始插入产品数据...");

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`✅ Seed 完成！成功插入 ${products.length} 条产品数据`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed 执行失败：", e);
    await prisma.$disconnect();
    process.exit(1);
  });
