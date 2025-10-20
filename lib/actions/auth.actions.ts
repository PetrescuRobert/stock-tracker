'use server';

import { auth } from '@/lib/auth';
import { inngest } from '@/lib/inngest/client';

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
