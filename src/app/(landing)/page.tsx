"use client"

import React from "react";

import HeaderSection from "@/components/landing/header-section";
import HeroSection from "@/components/landing/hero-section";
import FeaturesGridSection from "@/components/landing/features-grid-section";
import BenefitsSection from "@/components/landing/benefits-section";
import CallToActionSection from "@/components/landing/call-to-action-section";
import FooterSection from "@/components/landing/footer-section";
import Login from "../(auth)/login/page";
import GridShape from "@/components/common/GridShape";
import Link from "next/link";
import Image from "next/image";


export default function LandingPage() {
  return (
      // <div className="min-h-screen dark:bg-slate-900 bg-slate-50 text-slate-900 dark:text-white">

      //   {/* Header */}
      //   <HeaderSection/>

      //   {/* Hero Section */}
      //   <HeroSection/>


      //   {/* Features Grid */}
      //   <FeaturesGridSection/>

      //   {/* Benefits Section */}
      //   <BenefitsSection/>

      //   {/* Call to Action Section */}
      //   <CallToActionSection/>

      //   {/* Footer */}
      //   <FooterSection/>

      // </div>
      <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          <Login/>
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
              <div className="relative items-center justify-center  flex z-1">
                  {/* <!-- ===== Common Grid Shape Start ===== --> */}
                  <GridShape />
                  <div className="flex flex-col items-center max-w-xs">
                      <Link href="/" className="block mb-4">
                          <Image
                              width={231}
                              height={48}
                              src="./images/logo/auth-logo.svg"
                              alt="Logo"
                          />
                      </Link>
                      <p className="text-center text-gray-400 dark:text-white/60">
                         Erlang-Calc est une application dédiée aux professionnels des télécommunications, offrant des outils avancés pour la simulation et le calcul de trafic téléphonique.                                 </p>
                  </div>
              </div>
          </div>

      </div>
</div>
  )
}