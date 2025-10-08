import { betterAuth } from 'better-auth';
import { connectToDatabase } from '@/database/mongoose';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';

let authInstace: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if (authInstace) return authInstace;

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error('Database connection failed');

    authInstace = betterAuth({
        database: mongodbAdapter(db),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()],
    });

    return authInstace;
};

export const auth = await getAuth();
