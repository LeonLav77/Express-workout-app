import { Exercise } from './Exercise';

export interface Workout {
    id: number;
    name: string;
    description: string;
    image: string | null;
    exercises : Exercise[] | null;
}
