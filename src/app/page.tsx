"use client";

import { useState } from "react";
import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import SplashScreen from "@/components/SplashScreen";

const HomePage = () => {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <>
      {/* Splash Screen */}
      {!splashFinished && <SplashScreen onFinish={() => setSplashFinished(true)} />}

      {/* Main content */}
      <div
        className={`relative flex flex-col min-h-screen text-foreground overflow-hidden transition-opacity duration-500 ${
          splashFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* MATRIX GRID BACKGROUND */}
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(var(--cyber-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--cyber-grid-color)_1px,transparent_1px)] bg-[size:20px_20px]" />
           <section className="relative z-10 py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LEFT CONTENT */}
              <div className="lg:col-span-7 space-y-6 bg-background/90 p-6 rounded-lg shadow-lg">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-primary">Aptitude & Learning Diagnostic</span>
                </h2>

                <p className="text-xl text-muted-foreground md:w-2/3">
                  A short, game-based aptitude test that understands how you think,
                  where you struggle, and how you can improve — before you even start studying.
                </p>

                <ul className="space-y-3 text-lg">
                  <li>✔ Identifies learning gaps early</li>
                  <li>✔ Improves problem-solving & reasoning skills</li>
                  <li>✔ Turns education into an interactive game</li>
                  <li>✔ Helps overcome fear of subjects step-by-step</li>
                </ul>

                <p className="text-muted-foreground md:w-2/3">
                  This diagnostic helps students overcome confusion, build confidence,
                  and follow a smarter learning path instead of memorizing blindly.
                </p>

                <div className="pt-4">
                  <Button
                    size="lg"
                    asChild
                    className="bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
                  >
                    <Link href="/analyse" className="flex items-center font-mono">
                      Start Aptitude Test
                      <ArrowRightIcon className="ml-2 size-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT VISUAL */}
              <div className="lg:col-span-5 bg-background/90 p-6 rounded-lg shadow-lg">
                <div className="relative aspect-square max-w-lg mx-auto overflow-hidden rounded-lg bg-muted">
                  <img
                    src="/hero-ai3.png" // optional image
                    alt="Aptitude Test"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HERO SECTION: AI Study Plan */}
        <section className="relative z-10 py-24 flex-grow">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              {/* LEFT SIDE CONTENT */}
              <div className="lg:col-span-7 space-y-8 relative bg-background/90 p-6 rounded-lg shadow-lg">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <div>
                    <span className="text-foreground">Transform</span>
                  </div>
                  <div>
                    <span className="text-primary">Your Learning</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-foreground">With AI-Powered</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-foreground">Study Plans</span>
                    <span className="text-primary"> & Guidance</span>
                  </div>
                </h1>

                <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

                <p className="text-xl text-muted-foreground w-full md:w-2/3">
                  EduMentor creates personalized weekly study plans, identifies learning gaps,
                  and guides you to achieve your academic goals efficiently.
                </p>

                <div className="flex items-center gap-10 py-6 font-mono">
                  <div className="flex flex-col">
                    <div className="text-2xl text-primary">500+</div>
                    <div className="text-xs uppercase tracking-wider">ACTIVE STUDENTS</div>
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                  <div className="flex flex-col">
                    <div className="text-2xl text-primary">2min</div>
                    <div className="text-xs uppercase tracking-wider">PLAN CREATION</div>
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                  <div className="flex flex-col">
                    <div className="text-2xl text-primary">100%</div>
                    <div className="text-xs uppercase tracking-wider">PERSONALIZED</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    size="lg"
                    asChild
                    className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
                  >
                    <Link href={"/generate-program"} className="flex items-center font-mono">
                      Build Your Study Plan
                      <ArrowRightIcon className="ml-2 size-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT SIDE IMAGE */}
              <div className="lg:col-span-5 relative bg-background/90 p-6 rounded-lg shadow-lg">
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src="/hero-ai2.png"
                      alt="AI Learning Mentor"
                      className="w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />
                      <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
                      <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
                      <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
                      <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>

                  <TerminalOverlay />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECOND SECTION: Career Guider */}
        <section className="relative z-10 py-24 flex-grow">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              <div className="lg:col-span-7 space-y-8 relative bg-background/90 p-6 rounded-lg shadow-lg">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-primary">Career Guider</span>
                </h2>
                <p className="text-xl text-muted-foreground w-full md:w-2/3">
                  Get a complete visual flow of streams and careers based on your interests in Science,
                  Arts, or Commerce. Plan your future smartly with AI suggestions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    size="lg"
                    className="overflow-hidden bg-secondary text-primary-foreground px-8 py-6 text-lg font-medium"
                  >
                    Explore Careers
                  </Button>
                </div>
              </div>

              {/* RIGHT SIDE IMAGE */}
              <div className="lg:col-span-5 relative bg-background/90 p-6 rounded-lg shadow-lg h-80">
                <div className="relative aspect-square max-w-lg  mx-auto">
                  <div className="relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src="/careerguide.png" // replace with your career diagram
                      alt="Career Flow Diagram"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THIRD SECTION: Focus Feature */}
        <section className="relative z-10 py-24 flex-grow">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              <div className="lg:col-span-7 space-y-8 relative bg-background/90 p-6 rounded-lg shadow-lg">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-primary">Focus Mode</span>
                </h2>
                <p className="text-xl text-muted-foreground w-full md:w-2/3">
                  Enhance your learning with a tracker. Focus on selected topics, track your sessions,
                  and improve retention with insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    size="lg"
                    className="overflow-hidden bg-secondary text-primary-foreground px-8 py-6 text-lg font-medium"
                  >
                    Try Focus Mode
                  </Button>
                </div>
              </div>

              {/* RIGHT SIDE IMAGE */}
              <div className="lg:col-span-5 relative bg-background/90 p-6 rounded-lg shadow-lg">
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src="/hero-ai.png" // replace with your focus app image
                      alt="Focus "
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USER PROGRAMS */}
        <UserPrograms />
      </div>
    </>
  );
};

export default HomePage;
