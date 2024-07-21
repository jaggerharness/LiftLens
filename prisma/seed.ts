const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const muscleGroups = [
    { name: 'Chest' },
    { name: 'Back' },
    { name: 'Legs' },
    { name: 'Arms' },
    { name: 'Shoulders' },
    { name: 'Core' },
  ];

  console.log(`Start seeding ...`);
  for (const muscleGroup of muscleGroups) {
    const mg = await prisma.muscleGroup.create({
      data: muscleGroup,
    });
    console.log(`Created muscle group with id: ${mg.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
