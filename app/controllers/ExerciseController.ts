
import { Request, Response } from 'express';
import ExerciseRepository from '../repositories/ExerciseRepository';
import UnsplashApiHandler from '../services/UnsplashApiHandler';

class ExerciseController {
    private exerciseRepository = new ExerciseRepository();
    private unsplashApiHandler = new UnsplashApiHandler();
    
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
        const { name, image, description } = req.body;
        let imageUrl;

        if(image === undefined || image === '' || image === null) {
            imageUrl = await this.unsplashApiHandler.fetchPhoto(name);
        }else{
            imageUrl = image;
        }

        const exercise = await this.exerciseRepository.createNewExercise(name, description, imageUrl);
            
        res.json(exercise);
    }
}

export default ExerciseController;
