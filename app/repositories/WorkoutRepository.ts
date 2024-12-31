
import { CompletedWorkout, PrismaClient } from '@prisma/client';
import { Workout } from '../models/Workout';

const prisma = new PrismaClient();

class WorkoutRepository {
    async getAllWorkouts(): Promise<Workout[]> {
        const workouts = await prisma.workout.findMany({
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
    
        return workouts.map(workout => ({
            id: workout.id,
            name: workout.name,
            description: workout.description,
            image: workout.image,
            exercises: workout.exercises.map(e => ({
                id: e.exercise.id,
                name: e.exercise.name,
                description: e.exercise.description,
                image: e.exercise.image,
                reps: e.reps,
                order: e.order,
            })) || null,
        })) as Workout[];
    }
    

    async createNewWorkout(
        name: string,
        description: string,
        image: string,
    ): Promise<Workout> {
        const workout = await prisma.workout.create({
            data: {
                name,
                description,
                image,
            },
        });

        return workout as Workout; 
    }

    async getWorkoutById(id: string): Promise<Workout | null> {
        const workout = await prisma.workout.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
    
        if (!workout) return null;
    
        return {
            id: workout.id,
            name: workout.name,
            description: workout.description,
            image: workout.image,
            exercises: workout.exercises.map(e => ({
                id: e.exercise.id,
                name: e.exercise.name,
                description: e.exercise.description,
                image: e.exercise.image,
                reps: e.reps,
                order: e.order,
            })) || null,
        } as Workout;
    }

    async updateWorkout(
        id: string,
        name: string,
        description: string,
        image: string,
    ): Promise<Workout | null> {
        const workout = await prisma.workout.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                description,
                image,
            },
        });

        return workout as Workout | null;
    }

    async deleteWorkout(id: string): Promise<Workout | null> {
        const workout = await prisma.workout.delete({
            where: {
                id: parseInt(id),
            },
        });

        return workout as Workout | null;
    }

    async addExerciseToWorkout(
        workoutId: string,
        exerciseId: string,
        reps: number,
        order: number,
    ): Promise<Workout | null> {
        const workout = await prisma.workout.update({
            where: {
                id: parseInt(workoutId),
            },
            data: {
                exercises: {
                    create: {
                        reps,
                        order,
                        exerciseId: parseInt(exerciseId),
                    },
                },
            },
        });

        return workout as Workout | null;
    }

    async completeWorkout(userId: number, workoutId : number, duration: number): Promise<CompletedWorkout | null> {
        const completedWorkout = await prisma.completedWorkout.create({
            data: {
                userId,
                workoutId,
                duration,
            },
        });

        return completedWorkout as CompletedWorkout | null;
    }

    async deleteAllExercisesFromWorkout(id: string): Promise<Workout | null> {
        const workout = await prisma.workout.update({
            where: {
                id: parseInt(id),
            },
            data: {
                exercises: {
                    deleteMany: {},
                },
            },
        });

        return workout as Workout | null;
    }
}

export default WorkoutRepository;
