export interface User {
    id: number;
    name: string | null;
    email: string;
    password: string;
    salt: string;
    role: number;
    loginToken: string | null;
}
