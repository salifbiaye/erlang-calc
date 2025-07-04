import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight, Play} from "lucide-react";
import React from "react";

export default function HeroSection() {
    return (
        <section className="p-16 grid grid-cols-2 relative overflow-hidden ">

            <div className="text-center lg:text-left space-y-8">
                <div className="space-y-6">
                    <Badge
                        className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 inline-flex items-center gap-2 px-4 py-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        Analyse Professionnelle du Trafic Télécom
                    </Badge>

                    <h1 className="text-5xl md:text-7xl lg:text-7xl font-black mb-6 leading-none">
                  <span
                      className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-200 dark:via-white bg-clip-text text-transparent">
                    Optimisez
                  </span>
                        <br/>
                        <span
                            className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-200 dark:via-white  bg-clip-text text-transparent">
                    Votre Réseau
                  </span>
                        <br/>
                        <span
                            className="bg-primary bg-clip-text text-transparent">
                    Comme un Pro
                  </span>
                    </h1>

                    <p className="text-xl md:text-2xl  text-gray-800 dark:text-white leading-relaxed max-w-2xl ">
                        Calculs Erlang avancés, simulations interactives et outils de collaboration d&apos;équipe pour
                        les
                        professionnels des télécoms.{" "}
                        <span className="text-primary ">
                Prenez des décisions éclairées en toute confiance.
              </span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link href="/calculate">
                        <Button
                            size="lg"
                            className="bg-primary text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
                        >
                            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"/>
                            Commencer les Calculs
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
                        </Button>
                    </Link>

                </div>


            </div>
            <div
                className=" w-full bg-[url('/images/network-map.png')] rounded-lg border-4 border-white bg-cover bg-center p-30 bg-no-repeat  relative">
            </div>
        </section>
    )
}