import {Signal} from "lucide-react";
import ThemeToggler from "@/components/theme-toggle";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";

export default function HeaderSection() {
    return (
        <header
            className="border-b dark:border-slate-700/50 border-slate-200 dark:bg-slate-800/30 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                            <Signal className="h-4 w-4 text-white"/>
                        </div>
                        <span className="text-xl font-bold dark:text-white text-slate-800">Erlang Calc</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggler/>
                        <Link href="/register">
                            <Button variant="ghost"
                                    className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-white">
                                S&apos;inscrire
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Commencer</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}