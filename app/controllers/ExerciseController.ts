
import { Request, Response } from 'express';
import ExerciseRepository from '../repositories/ExerciseRepository';

class ExerciseController {
    private exerciseRepository = new ExerciseRepository();
    
    constructor() {}
    

    public async index(req: Request, res: Response): Promise<void> {
        const exercises = await this.exerciseRepository.getAllExercises();
        
        res.json(exercises);
    }

    public async getExerciseById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const exercise = await this.exerciseRepository.getExerciseById(id);
        
        res.json(exercise);
    }

    public async updateExercise(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const { name, description, image } = req.body;
        const exercise = await this.exerciseRepository.updateExercise(id, name, description, image);
        
        res.json(exercise);
    }

    public async deleteExercise(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const exercise = await this.exerciseRepository.deleteExercise(id);
        
        res.json(exercise);
    }

    public async createNewExercise(req: Request, res: Response): Promise<void> {
        const { name, description, image } = req.body;
        const exercise = await this.exerciseRepository.createNewExercise(name, description, image);
        
        res.json(exercise);
    }
}

export default ExerciseController;
