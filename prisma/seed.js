import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'leonlav77@gmail.com',
      password: 'dcd3223d34ae110efd4ee1b71065ef9b567099e22d8002eed4f8c25812c564a8',
      salt: '04f6f77cc70e66f697d1c9e36ed0b280',
      role: 1,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'User',
      email: 'leon@lloyds-digital.com',
      password: 'dcd3223d34ae110efd4ee1b71065ef9b567099e22d8002eed4f8c25812c564a8',
      salt: '04f6f77cc70e66f697d1c9e36ed0b280',
      role: 0,
    },
  });

  const legExerciseData = [
    { name: 'Squat', description: 'Basic squat exercise for legs.', image: 'squat.jpg' },
    { name: 'Lunge', description: 'Lunges for leg strength and balance.', image: 'lunge.jpg' },
    { name: 'Leg Press', description: 'Leg press for lower body strength.', image: 'leg_press.jpg' },
    { name: 'Deadlift', description: 'Deadlift for hamstrings and glutes.', image: 'deadlift.jpg' },
    { name: 'Step-Up', description: 'Step-ups for legs and core.', image: 'step_up.jpg' },
  ];

  const legExercises = [];
  for (const exercise of legExerciseData) {
    const createdExercise = await prisma.exercise.create({ data: exercise });
    legExercises.push(createdExercise);
  }

  const armExerciseData = [
    { name: 'Push-Up', description: 'Push-ups for upper body strength.', image: 'push_up.jpg' },
    { name: 'Tricep Dip', description: 'Tricep dips for arm toning.', image: 'tricep_dip.jpg' },
    { name: 'Pull-Up', description: 'Pull-ups for arm and back strength.', image: 'pull_up.jpg' },
    { name: 'Dumbbell Curl', description: 'Bicep curls with dumbbells.', image: 'dumbbell_curl.jpg' },
    { name: 'Hammer Curl', description: 'Bicep hammer curls for forearms.', image: 'hammer_curl.jpg' },
  ];

  const armExercises = [];
  for (const exercise of armExerciseData) {
    const createdExercise = await prisma.exercise.create({ data: exercise });
    armExercises.push(createdExercise);
  }

  const coreExerciseData = [
    { name: 'Plank', description: 'Plank for core stability.', image: 'plank.jpg' },
    { name: 'Sit-Up', description: 'Sit-ups for abdominal strength.', image: 'sit_up.jpg' },
    { name: 'Russian Twist', description: 'Twists for oblique muscles.', image: 'russian_twist.jpg' },
    { name: 'Leg Raise', description: 'Leg raises for lower abs.', image: 'leg_raise.jpg' },
    { name: 'Mountain Climbers', description: 'Mountain climbers for cardio and core.', image: 'mountain_climbers.jpg' },
  ];

  const coreExercises = [];
  for (const exercise of coreExerciseData) {
    const createdExercise = await prisma.exercise.create({ data: exercise });
    coreExercises.push(createdExercise);
  }

  const legWorkout = await prisma.workout.create({
    data: {
      name: 'Leg Workout',
      description: 'A workout for legs and lower body strength.',
      image: 'leg_workout.jpg',
    },
  });

  const armWorkout = await prisma.workout.create({
    data: {
      name: 'Arm Workout',
      description: 'A workout for arms and upper body strength.',
      image: 'arm_workout.jpg',
    },
  });

  const coreWorkout = await prisma.workout.create({
    data: {
      name: 'Core Workout',
      description: 'A workout for core and abdominal strength.',
      image: 'core_workout.jpg',
    },
  });

  await prisma.workoutExercise.createMany({
    data: [
      { workoutId: legWorkout.id, exerciseId: legExercises[0].id, reps: 10, order: 1 },
      { workoutId: legWorkout.id, exerciseId: legExercises[1].id, reps: 10, order: 2 },
      { workoutId: legWorkout.id, exerciseId: legExercises[2].id, reps: 10, order: 3 },
      { workoutId: legWorkout.id, exerciseId: legExercises[3].id, reps: 10, order: 4 },
      { workoutId: legWorkout.id, exerciseId: legExercises[4].id, reps: 10, order: 5 },
    ],
  });

  await prisma.workoutExercise.createMany({
    data: [
      { workoutId: armWorkout.id, exerciseId: armExercises[0].id, reps: 10, order: 1 },
      { workoutId: armWorkout.id, exerciseId: armExercises[1].id, reps: 10, order: 2 },
      { workoutId: armWorkout.id, exerciseId: armExercises[2].id, reps: 10, order: 3 },
      { workoutId: armWorkout.id, exerciseId: armExercises[3].id, reps: 10, order: 4 },
      { workoutId: armWorkout.id, exerciseId: armExercises[4].id, reps: 10, order: 5 },
    ],
  });

  await prisma.workoutExercise.createMany({
    data: [
      { workoutId: coreWorkout.id, exerciseId: coreExercises[0].id, reps: 10, order: 1 },
      { workoutId: coreWorkout.id, exerciseId: coreExercises[1].id, reps: 10, order: 2 },
      { workoutId: coreWorkout.id, exerciseId: coreExercises[2].id, reps: 10, order: 3 },
      { workoutId: coreWorkout.id, exerciseId: coreExercises[3].id, reps: 10, order: 4 },
      { workoutId: coreWorkout.id, exerciseId: coreExercises[4].id, reps: 10, order: 5 },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
