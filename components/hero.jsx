"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button"

const HeroSection = () => {
  return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
            Let AI Be Your Financial Guide <br/> Say Goodbye to Overspending
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Track your expenses, plan your budget, and get personalized AI insights—all in one place.
            </p>
            <div className="flex justify-center space-x-4">
                <Link href="/dashboard">
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                </Link>
                <Link href="https://github.com/Kariuki11/my-app">
                    <Button size="lg" variant="outline" className="px-8">
                        Source Code
                    </Button>
                </Link>
            </div>
            <div className="hero-image-wrapper">
                <div>
                    <Image
                        src="/banner1.webp"
                        width={1280}
                        height={720}
                        alt="dashboard preview"
                        className="rounded-lg shadow-2xl border mx-auto"
                        priority
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection