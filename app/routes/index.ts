import { Router, Request, Response } from 'express';

const router: Router = Router();

// Home route
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Express app!');
});

export default router;
