'use server';

import { auth } from '@/lib/auth';
import { inngest } from '@/lib/inngest/client';
import { headers } from 'next/headers';

export const signUpWithEmail = async ({
    email,
    password,
    fullName,
    country,
    preferredIndustry,
    riskTolerance,
    investmentGoals,
}: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName,
            },
        });

        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    preferredIndustry,
                    riskTolerance,
                },
            });
        }

        return { success: true, data: response };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Sign up failed!' };
    }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: { email, password },
        });

        return { success: true, data: response };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Sign in failed!' };
    }
};

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Sign out failed!' };
    }
};
