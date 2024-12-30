
import { Request, Response } from 'express';
import WorkoutRepository from '../repositories/WorkoutRepository';

class WorkoutController {
    private workoutRepository = new WorkoutRepository();
    
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

}

export default WorkoutController;
