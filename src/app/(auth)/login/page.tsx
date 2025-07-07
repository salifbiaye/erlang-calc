"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import {ChevronLeftIcon, EyeClosedIcon, EyeIcon, GithubIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogin } from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/auth.schema";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const verified = searchParams.get('verified') === 'true';
    const { mutate: login, isPending, isError, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        login(data, {
            onSuccess: () => {
                router.push("/dashboard");
            },
        });
    };

    const handleSocialLogin = (provider: "google" | "github") => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL ;
        router.push(`${API_URL}/auth/${provider}`);
    };

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            {verified && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Succès ! </strong>
                    <span className="block sm:inline">Votre email a été vérifié avec succès. Vous pouvez maintenant vous connecter.</span>
                </div>
            )}

            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Connexion
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Entrez votre email et mot de passe pour vous connecter !
                        </p>
                    </div>

                    {searchParams.get("verified") === "true" && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-green-600 dark:text-green-400 text-center">
                                Email vérifié avec succès ! Vous pouvez maintenant vous connecter.
                            </p>
                        </div>
                    )}

                    {searchParams.get("reset") === "success" && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-green-600 dark:text-green-400 text-center">
                                Mot de passe réinitialisé avec succès !
                            </p>
                        </div>
                    )}

                    {searchParams.get("registered") === "true" && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-green-600 dark:text-green-400 text-center">
                                Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.
                            </p>
                        </div>
                    )}

                    <div>

                        <div className="relative py-3 sm:py-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                            </div>

                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                            <div>
                                <Label>
                                    Email <span className="text-red-500 py-2 ">*</span>{" "}
                                </Label>
                                <Input
                                    placeholder="info@gmail.com"
                                    type="email"
                                    {...register("email")}
                                    error={errors.email?.message}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label>
                                    Mot de passe <span className="text-red-500 py-2">*</span>{" "}
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Entrez votre mot de passe"
                                        {...register("password")}
                                        error={errors.password?.message}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="h-4 w-4" />
                                        ) : (
                                            <EyeClosedIcon className="h-4 w-4" />
                                        )}
                                    </span>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {isError && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <p className="text-red-600 dark:text-red-400 text-center">
                                        {error instanceof Error
                                            ? error.message
                                            : "Une erreur est survenue lors de la connexion"}
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <a target="_blank"
                                    href="https://erlang-calc.vercel.app/forgot-password"
                                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full"
                            >
                                {isPending ? "Connexion en cours..." : "Se connecter"}
                            </Button>
                        </form>

                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                Vous n&apos;avez pas de compte ?{" "}
                                <a target="_blank"
                                    href="https://erlang-calc.vercel.app/register"
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    S&apos;inscrire
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}