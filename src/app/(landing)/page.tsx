"use client"

import React from "react";

import HeaderSection from "@/components/landing/header-section";
import HeroSection from "@/components/landing/hero-section";
import FeaturesGridSection from "@/components/landing/features-grid-section";
import BenefitsSection from "@/components/landing/benefits-section";
import CallToActionSection from "@/components/landing/call-to-action-section";
import FooterSection from "@/components/landing/footer-section";



export default function LandingPage() {
  return (
      <div className="min-h-screen dark:bg-slate-900 bg-slate-50 text-slate-900 dark:text-white">

        {/* Header */}
        <HeaderSection/>

        {/* Hero Section */}
        <HeroSection/>


        {/* Features Grid */}
        <FeaturesGridSection/>

        {/* Benefits Section */}
        <BenefitsSection/>

        {/* Call to Action Section */}
        <CallToActionSection/>

        {/* Footer */}
        <FooterSection/>

      </div>
  )
}