import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/UI/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, isBanned, canResetPassword }: { status?: string, isBanned?: boolean, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username_or_email: '',
        password: '',
        isBanned: false,
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    console.log(errors)

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email or Username" />

                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={data.username_or_email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username_or_email', e.target.value)}
                    />

                    <InputError message={errors.username_or_email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                    {errors.isBanned && <InputError message={errors.isBanned} className='mt-2'/>}
                </div>

                <div className="flex justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('register')} className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Don't have an account?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
