"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgressBar renders a sleek, glowing gradient progress indicator
 * at the top of the viewport tracking the reader's scroll depth.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 h-[3px] w-full bg-transparent"
    >
      <div
        className="h-full bg-linear-to-r from-[#0054F9] via-[#4A8CE8] to-[#60A5FA] shadow-[0_0_10px_rgba(0,84,249,0.7)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
