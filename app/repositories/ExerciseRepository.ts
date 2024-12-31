
import { PrismaClient } from '@prisma/client';
import { Exercise } from '../models/Exercise';

const prisma = new PrismaClient();

class ExerciseRepository {

    async getAllExercises(): Promise<Exercise[]> {
        const exercises = await prisma.exercise.findMany({
            include: {
                workouts: {
                    include: {
                        workout: true,
                    },
                },
            },
        });
    
        return exercises.map(exercise => ({
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            image: exercise.image,
            workouts: exercise.workouts.map(w => ({
                id: w.workout.id,
                name: w.workout.name,
                description: w.workout.description,
                image: w.workout.image,
            })), 
        })) as Exercise[];
    }

    async createNewExercise(
        name: string,
        description: string,
        image: string,
    ): Promise<Exercise> {
        const exercise = await prisma.exercise.create({
            data: {
                name,
                description,
                image,
            },
        });

        return exercise as Exercise; 
    }

    async getExerciseById(id: string): Promise<Exercise | null> {
        const exercise = await prisma.exercise.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                workouts: {
                    include: {
                        workout: true,
                    },
                },
            },
        });

        if (!exercise) {
            return null;
        }

        return {
            id: exercise.id,
            name: exercise.name,
            description: exercise.description,
            image: exercise.image,
            workouts: exercise.workouts.map(w => ({
                id: w.workout.id,
                name: w.workout.name,
                description: w.workout.description,
                image: w.workout.image,
            })), 
        } as Exercise;
    }

    async updateExercise(
        id: string,
        name: string,
        description: string,
        image: string,
    ): Promise<Exercise> {
        const exercise = await prisma.exercise.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                image,
            },
        });

        return exercise as Exercise;
    }

    async deleteExercise(id: string): Promise<Exercise> {
        const exercise = await prisma.exercise.delete({
            where: { id: parseInt(id) },
        });

        return exercise as Exercise;
    }
}

export default ExerciseRepository;
