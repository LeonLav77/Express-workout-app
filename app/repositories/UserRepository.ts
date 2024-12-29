
import { PrismaClient } from '@prisma/client';
import { User } from '../models/User';

const prisma = new PrismaClient();

class UserRepository {

    async getAllUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users;
    }

    async createNewUser(
        name: string,
        email: string,
        password: string,
        salt: string,
        role: number = 0,
    ): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                salt,
                role,
            },
        });

        return user as User; 
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        return user as User | null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user as User | null;
    }

    async updateUser(
        id: string,
        name: string,
        email: string,
        password: string,
        salt: string,
    ): Promise<User> {
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password,
                salt,
            },
        });

        return user as User;
    }

    async deleteUser(id: string): Promise<User> {
        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        return user as User;
    }

    async saveLoginToken(email: string, token: string): Promise<void> {
        await prisma.user.update({
            where: { email: email },
            data: {
                loginToken: token,
            },
        });
    }
}

export default UserRepository;
