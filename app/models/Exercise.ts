import { Workout } from './Workout';

export interface Exercise {
    id: number;
    name: string;
    description: string;
    image: string;
    workouts: Workout[] | null; 
    reps : number | null;
    order : number | null;   
}
