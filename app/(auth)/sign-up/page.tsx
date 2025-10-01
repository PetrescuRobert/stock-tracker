'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1 className={'form-title'}>Sign Up & Personalise</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'space-y-5'}>
                <InputField
                    name={'fullName'}
                    label={'Full Name'}
                    placeholder={'John Doe'}
                    error={errors.fullName}
                    validation={{
                        required: 'Full name is required',
                        minLength: 2,
                    }}
                    register={register}
                />

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
                    placeholder={'Enter a strong password'}
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
                    {isSubmitting
                        ? 'Creating Account'
                        : 'Start your investing journey'}
                </Button>
            </form>
        </>
    );
};
export default SignUpPage;
