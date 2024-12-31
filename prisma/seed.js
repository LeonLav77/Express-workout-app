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
    { name: 'Squat', description: 'Basic squat exercise for legs.', image: 'https://images.pexels.com/photos/371049/pexels-photo-371049.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Lunge', description: 'Lunges for leg strength and balance.', image: 'https://images.pexels.com/photos/5067743/pexels-photo-5067743.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Leg Press', description: 'Leg press for lower body strength.', image: 'https://images.pexels.com/photos/28076/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Deadlift', description: 'Deadlift for hamstrings and glutes.', image: 'https://images.pexels.com/photos/5759751/pexels-photo-5759751.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Step-Up', description: 'Step-ups for legs and core.', image: 'https://images.pexels.com/photos/7869651/pexels-photo-7869651.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  const legExercises = [];
  for (const exercise of legExerciseData) {
    const createdExercise = await prisma.exercise.create({ data: exercise });
    legExercises.push(createdExercise);
  }

  const armExerciseData = [
    { name: 'Push-Up', description: 'Push-ups for upper body strength.', image: 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg?auto=compress&cs=tinysrgb&w=500&h=500' },
    { name: 'Tricep Dip', description: 'Tricep dips for arm toning.', image: 'https://images.pexels.com/photos/5496589/pexels-photo-5496589.jpeg?auto=compress&cs=tinysrgb&w=500&h=500' },
    { name: 'Pull-Up', description: 'Pull-ups for arm and back strength.', image: 'https://images.pexels.com/photos/8692269/pexels-photo-8692269.jpeg?auto=compress&cs=tinysrgb&w=500&h=500' },
    { name: 'Dumbbell Curl', description: 'Bicep curls with dumbbells.', image: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=500&h=500' },
    { name: 'Hammer Curl', description: 'Bicep hammer curls for forearms.', image: 'https://images.pexels.com/photos/4506073/pexels-photo-4506073.jpeg?auto=compress&cs=tinysrgb&w=500&h=500' },
  ];

  const armExercises = [];
  for (const exercise of armExerciseData) {
    const createdExercise = await prisma.exercise.create({ data: exercise });
    armExercises.push(createdExercise);
  }

  const coreExerciseData = [
    { name: 'Plank', description: 'Plank for core stability.', image: 'https://images.pexels.com/photos/3768901/pexels-photo-3768901.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Sit-Up', description: 'Sit-ups for abdominal strength.', image: 'https://images.pexels.com/photos/4047040/pexels-photo-4047040.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Russian Twist', description: 'Twists for oblique muscles.', image: 'https://images.pexels.com/photos/5128466/pexels-photo-5128466.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Leg Raise', description: 'Leg raises for lower abs.', image: 'https://images.pexels.com/photos/5128466/pexels-photo-5128466.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Mountain Climbers', description: 'Mountain climbers for cardio and core.', image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600' },
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
      image: 'https://images.pexels.com/photos/5038850/pexels-photo-5038850.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  });

  const armWorkout = await prisma.workout.create({
    data: {
      name: 'Arm Workout',
      description: 'A workout for arms and upper body strength.',
      image: 'https://images.pexels.com/photos/5327505/pexels-photo-5327505.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  });

  const coreWorkout = await prisma.workout.create({
    data: {
      name: 'Core Workout',
      description: 'A workout for core and abdominal strength.',
      image: 'https://images.pexels.com/photos/6739040/pexels-photo-6739040.jpeg?auto=compress&cs=tinysrgb&w=600',
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
