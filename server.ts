import express, { Application } from 'express';
import usersRouter from './app/routes/users';
import exercisesRouter from './app/routes/exercises';
import workoutsRouter from './app/routes/workouts';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Application = express();
const PORT: number = 3000;

app.use(function(req, res, next) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,Token');
        res.setHeader('Access-Control-Max-Age', '3600');
        res.sendStatus(200);
        next();
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

// Middleware to parse JSON
app.use(express.json());

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);
app.use('/workouts', workoutsRouter);

const angularDistPath = path.join(__dirname, 'dist/angular-projekt/browser');
app.use(express.static(angularDistPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(angularDistPath, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
