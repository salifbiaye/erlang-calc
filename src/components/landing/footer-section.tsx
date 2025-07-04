import {Signal} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FooterSection() {
    return (
        <footer className="border-t dark:border-slate-700/50 border-slate-200 py-12 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
                            <Signal className="h-3 w-3 text-white"/>
                        </div>
                        <span className="font-semibold dark:text-white text-slate-800">Erlang Calc</span>
                    </div>

                    <div className="flex gap-6 text-sm dark:text-slate-400 text-slate-600">
                        <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                            Tableau de Bord
                        </Link>
                        <Link href="/calculate" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                            Calculer
                        </Link>
                        <Link href="/settings" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                            Paramètres
                        </Link>
                    </div>
                </div>

                <div className="border-t dark:border-slate-700/50 border-slate-200 mt-8 pt-8 text-center">
                    <p className="dark:text-slate-500 text-slate-400 text-sm">
                        © 2025 Erlang Calc. Conçu pour les professionnels des télécoms du monde entier.
                    </p>
                </div>
            </div>
        </footer>
    )
}