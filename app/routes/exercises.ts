import { Router, Request, Response } from 'express';
import ExerciseController from '../controllers/ExerciseController';

const router: Router = Router();
const exerciseController = new ExerciseController();

router.get('/', (req: Request, res: Response) => {
    exerciseController.index(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    exerciseController.getExerciseById(req, res);
});

router.post('/', (req: Request, res: Response) => {
    exerciseController.createNewExercise(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
    exerciseController.updateExercise(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
    exerciseController.deleteExercise(req, res);
});


export default router;
