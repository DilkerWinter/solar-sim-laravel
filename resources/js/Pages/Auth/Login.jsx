import React, { useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import EmailInput from "@/Components/Login/UI/EmailInput";
import LoginInput from "@/Components/Login/UI/PasswordInput";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (value) => {
        setData("password", value);
    };

    const handleEmailChange = (value) => {
        setData("email", value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login" />

            <GuestLayout>
                <h2 className="text-center font-bold text-2xl mb-2">
                    Entrar na sua conta
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Digite suas credenciais para acessar o sistema
                </p>

                {status && (
                    <div className="mb-4 font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <EmailInput
                            email={data.email}
                            setEmail={handleEmailChange}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <LoginInput
                            password={data.password}
                            setPassword={handlePasswordChange}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                id="remember"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-gray-600 cursor-pointer"
                            >
                                Lembrar-me
                            </label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Esqueceu sua senha?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-end">
                        <PrimaryButton
                            type="submit"
                            className="ml-4"
                            disabled={processing}
                        >
                            Entrar
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </>
    );
}
