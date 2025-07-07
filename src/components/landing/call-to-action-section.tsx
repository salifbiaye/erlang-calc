import {Boxes} from "@/components/ui/background-boxes";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import React from "react";
import {useIsMobile} from "@/hooks/use-mobile";

export default function CallToActionSection() {
    const isMobile = useIsMobile();

    return (
        <div
            className="h-screen gap-8 dark:bg-slate-800/20 bg-brand-950 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
            <div
                className="absolute inset-0 w-full h-full dark:bg-slate-800/20 bg-brand-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none"/>
            { !isMobile &&
                <Boxes/>
            }

            <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
                Prêt à Optimiser Votre Réseau ?
            </h1>
            <p className="text-center mt-2 text-neutral-300 relative z-20">

                Rejoignez des milliers de professionnels des télécoms qui font confiance à Erlang Calc pour leurs
                besoins
                de
                planification et d&apos;optimisation réseau.
            </p>
            <div className="flex flex-col sm:flex-row z-10 gap-4 justify-center">
                <Link href="/calculate">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                        Commencer Votre Premier Calcul
                        <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </Link>
            </div>
        </div>

    )
}