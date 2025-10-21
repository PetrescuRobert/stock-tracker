'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { signInWithEmail } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SignInPage = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async ({ email, password }: SignInFormData) => {
        try {
            const response = await signInWithEmail({ email, password });
            if (response.success) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
            toast.error('Sign in failed!', {
                description:
                    error instanceof Error
                        ? error.message
                        : 'Failed to log in!',
            });
        }
    };

    return (
        <>
            <h1 className={'form-title'}>Sign In to Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-5'}>
                <InputField
                    name={'email'}
                    label={'Email'}
                    placeholder={'johndoe@gmail.com'}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: /^\S+@\S+$/i,
                    }}
                    register={register}
                />

                <InputField
                    name={'password'}
                    label={'Password'}
                    placeholder={'Enter your password'}
                    type={'password'}
                    error={errors.password}
                    validation={{
                        required: 'Password is required',
                        minLength: 8,
                    }}
                    register={register}
                />

                <Button
                    type={'submit'}
                    disabled={isSubmitting}
                    className={'yellow-btn w-full mt-5'}
                >
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <FooterLink
                    text={"Don't have an account?"}
                    linkText={'Create an account'}
                    href={'/sign-up'}
                />
            </form>
        </>
    );
};

export default SignInPage;
