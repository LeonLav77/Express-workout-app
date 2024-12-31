import { Router, Request, Response } from 'express';
import WorkoutController from '../controllers/WorkoutController';

const router: Router = Router();
const workoutController = new WorkoutController();

router.get('/', (req: Request, res: Response) => {
    workoutController.index(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    workoutController.getWorkoutById(req, res);
});

router.post('/', (req: Request, res: Response) => {
    workoutController.createNewWorkout(req, res);
});

router.post('/:id/exercises', (req: Request, res: Response) => {
    workoutController.addExerciseToWorkout(req, res);
});

router.post('/:id/complete', (req: Request, res: Response) => {
    workoutController.completeWorkout(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
    workoutController.updateWorkout(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
    workoutController.deleteWorkout(req, res);
});

router.delete('/:id/exercises', (req: Request, res: Response) => {
    workoutController.deleteAllExercisesFromWorkout(req, res);
});


export default router;
