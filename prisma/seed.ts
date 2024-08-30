const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const user = await prisma.user.create({
    data: {
      name: 'Tech Support',
      firstName: 'Tech',
      lastName: 'Support',
      firstLogin: false,
      password: 'password',
      email: 'support@liftlens.app',
      emailVerified: new Date(),
    },
  });

  const chestMg = await prisma.muscleGroup.create({
    data: { name: 'Chest' },
  });

  const calvesMg = await prisma.muscleGroup.create({
    data: { name: 'Calves' },
  });

  const hamstringsMg = await prisma.muscleGroup.create({
    data: { name: 'Hamstrings' },
  });

  const quadricepsMg = await prisma.muscleGroup.create({
    data: { name: 'Quadriceps' },
  });

  const glutesMg = await prisma.muscleGroup.create({
    data: { name: 'Glutes' },
  });

  const bicepsMg = await prisma.muscleGroup.create({
    data: { name: 'Biceps' },
  });

  const tricepsMg = await prisma.muscleGroup.create({
    data: { name: 'Triceps' },
  });

  const shouldersMg = await prisma.muscleGroup.create({
    data: { name: 'Shoulders' },
  });

  const latsMg = await prisma.muscleGroup.create({
    data: { name: 'Lats' },
  });

  const coreMg = await prisma.muscleGroup.create({
    data: { name: 'Core' },
  });

  const backMg = await prisma.muscleGroup.create({
    data: { name: 'Back' },
  });

  const exercises = [
    {
      name: 'Flat Dumbbell Press',
      displayName: 'Flat DB Press',
      description:
        'The flat dumbbell press is a great exercise for building the chest muscles. It is a compound exercise that targets the chest, shoulders, and triceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: chestMg.id },
          { id: shouldersMg.id },
          { id: tricepsMg.id },
        ],
      },
    },
    {
      name: '2-Grip Lat Pull Down',
      displayName: '2-Grip Lat Pull Down',
      description:
        'The 2-grip lat pull down is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: latsMg.id },
          { id: shouldersMg.id },
          { id: bicepsMg.id },
        ],
      },
    },
    {
      name: 'Seated Dumbbell Shoulder Press',
      displayName: 'Seated DB Shoulder Press',
      description:
        'The seated dumbbell shoulder press is a great exercise for building the shoulder muscles. It is a compound exercise that targets the shoulders, triceps, and upper chest.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: chestMg.id },
          { id: shouldersMg.id },
          { id: tricepsMg.id },
        ],
      },
    },
    {
      name: 'Seated Cable Row',
      displayName: 'Seated Cable Row',
      description:
        'The seated cable row is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: latsMg.id },
          { id: shouldersMg.id },
          { id: bicepsMg.id },
        ],
      },
    },
    {
      name: 'EZ-Bar Skull Crusher',
      displayName: 'EZ-Bar Skull Crusher',
      description:
        'The ez-bar skull crusher is a great exercise for building the triceps muscles. It is an isolation exercise that targets the triceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: tricepsMg.id },
      },
    },
    {
      name: 'EZ-Bar Curl',
      displayName: 'EZ-Bar Curl',
      description:
        'The ez-bar curl is a great exercise for building the biceps muscles. It is an isolation exercise that targets the biceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: bicepsMg.id },
      },
    },
    {
      name: 'Hack Squat',
      displayName: 'Hack Squat',
      description:
        'The hack squat is a great exercise for building the leg muscles. It is a compound exercise that targets the quads, hamstrings, and glutes.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: quadricepsMg.id },
          { id: hamstringsMg.id },
          { id: glutesMg.id },
        ],
      },
    },
    {
      name: 'Seated Hamstring Curl',
      displayName: 'Seated Hamstring Curl',
      description:
        'The seated hamstring curl is a great exercise for building the hamstring muscles. It is an isolation exercise that targets the hamstrings.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: hamstringsMg.id },
      },
    },
    {
      name: 'Standing Calf Raise',
      displayName: 'Standing Calf Raise',
      description:
        'The standing calf raise is a great exercise for building the calf muscles. It is an isolation exercise that targets the calves.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: calvesMg.id },
      },
    },
    {
      name: 'Hanging Leg Raise',
      displayName: 'Hanging Leg Raise',
      description:
        'The hanging leg raise is a great exercise for building the core muscles. It is an isolation exercise that targets the lower abs.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: coreMg.id },
      },
    },
    {
      name: 'Pendlay Row',
      displayName: 'Pendlay Row',
      description:
        'The pendlay row is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: latsMg.id },
          { id: shouldersMg.id },
          { id: bicepsMg.id },
        ],
      },
    },
    {
      name: 'Machine Shoulder Press',
      displayName: 'Machine Shoulder Press',
      description:
        'The machine shoulder press is a great exercise for building the shoulder muscles. It is a compound exercise that targets the shoulders, triceps, and upper chest.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: chestMg.id },
          { id: shouldersMg.id },
          { id: tricepsMg.id },
        ],
      },
    },
    {
      name: 'Weighted Pull Up',
      displayName: 'Weighted Pull Up',
      description:
        'The weighted pull up is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: latsMg.id },
          { id: shouldersMg.id },
          { id: bicepsMg.id },
        ],
      },
    },
    {
      name: 'Cable Chest Press',
      displayName: 'Cable Chest Press',
      description:
        'The cable chest press is a great exercise for building the chest muscles. It is a compound exercise that targets the chest, shoulders, and triceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: chestMg.id },
          { id: shouldersMg.id },
          { id: tricepsMg.id },
        ],
      },
    },
    {
      name: 'Seated Cable Row',
      displayName: 'Seated Cable Row',
      description:
        'The seated cable row is a great exercise for building the back muscles. It is a compound exercise that targets the lats, shoulders, and biceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: latsMg.id },
          { id: shouldersMg.id },
          { id: bicepsMg.id },
        ],
      },
    },
    {
      name: 'Bayesian Cable Curl',
      displayName: 'Bayesian Cable Curl',
      description:
        'The bayesian cable curl is a great exercise for building the biceps muscles. It is an isolation exercise that targets the biceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: bicepsMg.id },
      },
    },
    {
      name: 'Triceps Pushdown',
      displayName: 'Triceps Pushdown',
      description:
        'The triceps pushdown is a great exercise for building the triceps muscles. It is an isolation exercise that targets the triceps.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: tricepsMg.id },
      },
    },
    {
      name: 'Dumbbell Lateral Raise',
      displayName: 'DB Lateral Raise',
      description:
        'The dumbbell lateral raise is a great exercise for building the shoulder muscles. It is an isolation exercise that targets the shoulders.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: shouldersMg.id },
      },
    },
    {
      name: 'Romanian Deadlift',
      displayName: 'Romanian Deadlift',
      description:
        'The romanian deadlift is a great exercise for building the hamstring muscles. It is a compound exercise that targets the hamstrings, glutes, and lower back.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: hamstringsMg.id },
          { id: glutesMg.id },
          { id: backMg.id },
        ],
      },
    },
    {
      name: 'Leg Press',
      displayName: 'Leg Press',
      description:
        'The leg press is a great exercise for building the leg muscles. It is a compound exercise that targets the quads, hamstrings, and glutes.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: [
          { id: quadricepsMg.id },
          { id: hamstringsMg.id },
          { id: glutesMg.id },
        ],
      },
    },
    {
      name: 'Leg Extension',
      displayName: 'Leg Extension',
      description:
        'The leg extension is a great exercise for building the quad muscles. It is an isolation exercise that targets the quads.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: quadricepsMg.id },
      },
    },
    {
      name: 'Seated Calf Raise',
      displayName: 'Seated Calf Raise',
      description:
        'The seated calf raise is a great exercise for building the calf muscles. It is an isolation exercise that targets the calves.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: calvesMg.id },
      },
    },
    {
      name: 'Cable Crunch',
      displayName: 'Cable Crunch',
      description:
        'The cable crunch is a great exercise for building the core muscles. It is an isolation exercise that targets the upper abs.',
      createdBy: user.id,
      isPublic: true,
      muscleGroups: {
        connect: { id: coreMg.id },
      },
    },
  ];

  for (const exercise of exercises) {
    const ex = await prisma.exercise.create({
      data: exercise,
    });
    console.log(`Created exercise with id: ${ex.id}`);
  }

  await prisma.workoutStatus.createMany({
    data: [
      { name: 'Scheduled' },
      { name: 'Started' },
      { name: 'Completed' },
      { name: 'Paused' },
      { name: 'Canceled' },
      { name: 'Late' },
      { name: 'Archived' },
    ],
  });

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
