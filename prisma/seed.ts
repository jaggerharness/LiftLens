const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();

  const muscleGroups = [
    { name: 'Chest' },
    { name: 'Back' },
    { name: 'Legs' },
    { name: 'Arms' },
    { name: 'Shoulders' },
    { name: 'Core' },
  ];

  const exercises = [
    {
      name: 'Flat Dumbbell Press',
      displayName: 'Flat DB Press',
      description:
        'The flat dumbbell press is a great exercise for building the chest muscles. It is a compound exercise that targets the chest, shoulders, and triceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: '2-Grip Lat Pull Down',
      displayName: '2-Grip Lat PD',
      description:
        'The 2-grip lat pull down is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Seated Dumbbell Shoulder Press',
      displayName: 'Seated DB Shoulder Press',
      description:
        'The seated dumbbell shoulder press is a great exercise for building the shoulder muscles. It is a compound exercise that targets the shoulders, triceps, and upper chest.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Seated Cable Row',
      displayName: 'Seated Cable Row',
      description:
        'The seated cable row is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'EZ-Bar Skull Crusher',
      displayName: 'EZ-Bar Skull Crusher',
      description:
        'The ez-bar skull crusher is a great exercise for building the triceps muscles. It is an isolation exercise that targets the triceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'EZ-Bar Curl',
      displayName: 'EZ-Bar Curl',
      description:
        'The ez-bar curl is a great exercise for building the biceps muscles. It is an isolation exercise that targets the biceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Hack Squat',
      displayName: 'Hack Squat',
      description:
        'The hack squat is a great exercise for building the leg muscles. It is a compound exercise that targets the quads, hamstrings, and glutes.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Seated Hamstring Curl',
      displayName: 'Seated Hamstring Curl',
      description:
        'The seated hamstring curl is a great exercise for building the hamstring muscles. It is an isolation exercise that targets the hamstrings.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Standing Calf Raise',
      displayName: 'Standing Calf Raise',
      description:
        'The standing calf raise is a great exercise for building the calf muscles. It is an isolation exercise that targets the calves.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Hanging Leg Raise',
      displayName: 'Hanging Leg Raise',
      description:
        'The hanging leg raise is a great exercise for building the core muscles. It is an isolation exercise that targets the lower abs.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Pendlay Row',
      displayName: 'Pendlay row',
      description:
        'The pendlay row is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Machine Shoulder Press',
      displayName: 'Machine Shoulder Press',
      description:
        'The machine shoulder press is a great exercise for building the shoulder muscles. It is a compound exercise that targets the shoulders, triceps, and upper chest.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Weighted Pull Up',
      displayName: 'Weighted Pull Up',
      description:
        'The weighted pull up is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Cable Chest Press',
      displayName: 'Cable Chest Press',
      description:
        'The cable chest press is a great exercise for building the chest muscles. It is a compound exercise that targets the chest, shoulders, and triceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Seated Cable Row',
      displayName: 'Seated Cable Row',
      description:
        'The seated cable row is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Bayesian Cable Curl',
      displayName: 'Bayesian Cable Curl',
      description:
        'The bayesian cable curl is a great exercise for building the biceps muscles. It is an isolation exercise that targets the biceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Triceps Pushdown',
      displayName: 'Triceps Pushdown',
      description:
        'The triceps pushdown is a great exercise for building the triceps muscles. It is an isolation exercise that targets the triceps.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Dumbbell Lateral Raise',
      displayName: 'DB Lateral Raise',
      description:
        'The dumbbell lateral raise is a great exercise for building the shoulder muscles. It is an isolation exercise that targets the shoulders.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Romanian Deadlift',
      displayName: 'Romanian Deadlift',
      description:
        'The romanian deadlift is a great exercise for building the hamstring muscles. It is a compound exercise that targets the hamstrings, glutes, and lower back.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Leg Press',
      displayName: 'Leg Press',
      description:
        'The leg press is a great exercise for building the leg muscles. It is a compound exercise that targets the quads, hamstrings, and glutes.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Leg Extension',
      displayName: 'Leg Extension',
      description:
        'The leg extension is a great exercise for building the quad muscles. It is an isolation exercise that targets the quads.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Seated Calf Raise',
      displayName: 'Seated Calf Raise',
      description:
        'The seated calf raise is a great exercise for building the calf muscles. It is an isolation exercise that targets the calves.',
      createdBy: user.id,
      isPublic: true,
    },
    {
      name: 'Cable Crunch',
      displayName: 'Cable Crunch',
      description:
        'The cable crunch is a great exercise for building the core muscles. It is an isolation exercise that targets the upper abs.',
      createdBy: user.id,
      isPublic: true,
    },
  ];

  console.log(`Start seeding ...`);
  for (const muscleGroup of muscleGroups) {
    const mg = await prisma.muscleGroup.create({
      data: muscleGroup,
    });
    console.log(`Created muscle group with id: ${mg.id}`);
  }

  for (const exercise of exercises) {
    const ex = await prisma.exercise.create({
      data: exercise,
    });
    console.log(`Created muscle group with id: ${ex.id}`);
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
