export interface CompletedWorkout {
    id: number;
    userId: number;
    workoutId: number;
    duration: number;
    completedAt: Date;
}
