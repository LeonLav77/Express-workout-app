export interface User {
    id: number;
    name: string | null;  // Allow name to be null
    email: string;
    password: string;
    salt: string;
    role: number;
    loginToken: string | null;  // If loginToken can be null
}
