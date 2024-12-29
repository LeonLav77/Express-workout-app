import express, { Application } from 'express';
import indexRouter from './app/routes/index';
import usersRouter from './app/routes/users';

const app: Application = express();
const PORT: number = 3000;

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
