const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  console.log("Cleared existing data.");

  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice Johnson",
      age: 28,
      password: "Alice123!",
    },
  });
  console.log(`Seeded user: ${alice.name} (${alice.email})`);

  const count = await prisma.user.count();
  console.log(`Database seeded with ${count} user(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
