import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';

const router: Router = Router();
const userController = new UserController();

router.get('/', (req: Request, res: Response) => {
    userController.index(req, res);
});


router.get('/completed-workouts', (req: Request, res: Response) => {
    userController.getCompletedWorkouts(req, res);
});

router.get('/token/:token', (req: Request, res: Response) => {
    userController.getUserByToken(req, res);
});

router.post('/register', (req: Request, res: Response) => {
    userController.register(req, res);
});

router.post('/login', (req: Request, res: Response) => {
    userController.login(req, res);
});

router.put('/:id', (req: Request, res: Response) => {
    userController.updateUser(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
    userController.deleteUser(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    userController.getUserById(req, res);
});



export default router;
