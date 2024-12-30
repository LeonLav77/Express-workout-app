
import { Request, Response } from 'express';
import WorkoutRepository from '../repositories/WorkoutRepository';
import UserRepository from '../repositories/UserRepository';
import { CompletedWorkout } from '../models/CompletedWorkout';

class WorkoutController {
    private workoutRepository = new WorkoutRepository();
    private UserRepository = new UserRepository();

    constructor() {}
    

    public async index(req: Request, res: Response): Promise<void> {
        const exercises = await this.workoutRepository.getAllWorkouts();
        
        res.json(exercises);
    }

    public async getWorkoutById(req: Request, res: Response): Promise<void> {
        const workout = await this.workoutRepository.getWorkoutById(req.params.id);
        
        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        
        res.json(workout);
    }

    public async createNewWorkout(req: Request, res: Response): Promise<void> {
        const { name, description, image } = req.body;
        
        const workout = await this.workoutRepository.createNewWorkout(name, description, image);
        
        res.json(workout);
    }

    public async updateWorkout(req: Request, res: Response): Promise<void> {
        const { name, description, image } = req.body;
        const workout = await this.workoutRepository.updateWorkout(req.params.id, name, description, image);
        
        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        
        res.json(workout);
    }

    public async deleteWorkout(req: Request, res: Response): Promise<void> {
        const workout = await this.workoutRepository.deleteWorkout(req.params.id);
        
        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        
        res.json(workout);
    }

    public async addExerciseToWorkout(req: Request, res: Response): Promise<void> {
        const { exerciseId, reps, order } = req.body;
        const workout = await this.workoutRepository.addExerciseToWorkout(req.params.id, exerciseId, reps, order);
        
        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        
        res.json(workout);
    }

    public async completeWorkout(req: Request, res: Response): Promise<void> {
        const token = req.headers.token as string;

        if (!token) {
            res.status(400).json({ message: 'Token is required' });
            return;
        }

        const user = await this.UserRepository.getUserByToken(token);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const workout = await this.workoutRepository.getWorkoutById(req.params.id);

        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }

        const { duration } = req.body;

        const completedWorkout = await this.workoutRepository.completeWorkout(user.id, workout.id, duration);

        res.json(completedWorkout);
    }

}

export default WorkoutController;
