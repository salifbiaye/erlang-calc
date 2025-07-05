"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import {ChevronLeftIcon, EyeClosedIcon, EyeIcon, Github, GithubIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRegister } from "@/services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/auth.schema";
import type { RegisterInput } from "@/schemas/auth.schema";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();
    const { mutate: register, isPending, isError, error } = useRegister();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterInput) => {
        register(
            {
                email: data.email,
                password: data.password,
                name: `${data.firstName} ${data.lastName}`.trim(),
            },
            {
                onSuccess: () => {
                    router.push("/login?registered=true");
                },
            }
        );
    };

    const handleSocialLogin = (provider: "google" | "github") => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL ;
        router.push(`${API_URL}/auth/${provider}`);
    };

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
            <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeftIcon />
                    Retour à l&apos;accueil
                </Link>
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Inscription
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Entrez votre email et mot de passe pour vous inscrire !
                        </p>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                            <Button
                                onClick={() => handleSocialLogin("google")}
                                className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                                        fill="#EB4335"
                                    />
                                </svg>
                                S&apos;inscrire avec Google
                            </Button>
                            <Button
                                onClick={() => handleSocialLogin("github")}
                                className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
                            >
                               <GithubIcon/>
                                S&apos;inscrire avec Github
                            </Button>
                        </div>
                        <div className="relative py-3 sm:py-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                                    Ou
                                </span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    {/* <!-- Prénom --> */}
                                    <div className="sm:col-span-1">
                                        <Label>
                                            Prénom<span className="text-error-500">*</span>
                                        </Label>
                                        <Input
                                            {...registerField("firstName")}
                                            placeholder="Entrez votre prénom"
                                            error={errors.firstName?.message}
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    {/* <!-- Nom --> */}
                                    <div className="sm:col-span-1">
                                        <Label>
                                            Nom<span className="text-error-500">*</span>
                                        </Label>
                                        <Input
                                            {...registerField("lastName")}
                                            placeholder="Entrez votre nom"
                                            error={errors.lastName?.message}
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* <!-- Email --> */}
                                <div>
                                    <Label>
                                        Email<span className="text-error-500">*</span>
                                    </Label>
                                    <Input
                                        {...registerField("email")}
                                        type="email"
                                        placeholder="Entrez votre email"
                                        error={errors.email?.message}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                                {/* <!-- Mot de passe --> */}
                                <div>
                                    <Label>
                                        Mot de passe<span className="text-error-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            {...registerField("password")}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Entrez votre mot de passe"
                                            error={errors.password?.message}
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon />
                                            ) : (
                                                <EyeClosedIcon />
                                            )}
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                                    )}
                                </div>

                                {isError && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <p className="text-red-600 dark:text-red-400 text-center">
                                            {error instanceof Error
                                                ? error.message
                                                : "Une erreur est survenue lors de l'inscription"}
                                        </p>
                                    </div>
                                )}

                                {/* <!-- Bouton --> */}
                                <div>
                                    <Button
                                        type="submit"
                                        variant={"default"}
                                        disabled={isPending}
                                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs"
                                    >
                                        {isPending ? "Inscription en cours..." : "S'inscrire"}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                Vous avez déjà un compte ?{" "}
                                <Link
                                    href="/login"
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                >
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}