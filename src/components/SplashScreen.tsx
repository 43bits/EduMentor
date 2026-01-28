"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SplashScreen: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onFinish?.();
      },
    });

    tl.fromTo(
      ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    ).to(ref.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.5,
    });
  }, [onFinish]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background text-primary font-bold text-5xl"
    >
      EduMentor
    </div>
  );
};

export default SplashScreen;
