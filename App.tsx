import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Profile } from './components/Profile';
import { Contact } from './components/Contact';
import { ChatAssistant } from './components/ChatAssistant';
import { CustomCursor } from './components/CustomCursor';
import { FluidBackground } from './components/FluidBackground';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Advanced Scroll Logic for Curtain Reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  });

  // REVEAL LOGIC:
  // We strictly CLIP the footer from the top down.
  // 0% progress (content covering screen) -> inset(100% 0 0 0) -> Fully hidden/clipped
  // 100% progress (content scrolled away) -> inset(0% 0 0 0) -> Fully visible
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  return (
    // REMOVED overflow-x-hidden from here to fix sticky positioning in Portfolio
    <main className="relative text-white min-h-screen selection:bg-sky-400/40 selection:text-white">
      {/* Fluid Background stays fixed at z-0, visible through the transparent content sections */}
      <FluidBackground />
      <CustomCursor />
      <Navbar />

      {/* 
        CURTAIN REVEAL MECHANISM:
        1. Main Content Wrapper (z-20): 
           - Transparent to show FluidBackground.
           - mb-[100vh] creates the scroll space for the reveal.
      */}
      <div 
        ref={containerRef}
        className="relative z-20 mb-[85vh] md:mb-[80vh] lg:mb-[75vh]"
      >
        <Hero />
        
        {/* Profile / Resume Section (Moved to Page 2) */}
        <Profile />
        
        {/* Portfolio Section */}
        <Portfolio />
        
        <section id="about" className="min-h-[90vh] py-32 px-6 flex items-center justify-center relative border-y border-white/5 overflow-hidden">
          <div className="max-w-5xl text-center relative z-10">
            <p className="text-3xl md:text-6xl font-serif italic text-gray-200 leading-tight">
              "Design is not just what it looks like and feels like. Design is how it <span className="text-sky-300 not-italic font-bold font-sans tracking-tighter drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]">works</span>."
            </p>
            <div className="mt-12 flex flex-col items-center gap-4">
               <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-sky-400/70 to-transparent"></div>
               <span className="text-xs font-mono text-sky-300 tracking-widest uppercase">Philosophy</span>
            </div>
          </div>
        </section>
      </div>

      {/* 
        FIXED CONTACT SECTION (z-10):
        Revealed via clip-path. We ensure a solid background here
        so it blocks the FluidBackground when it is physically revealed.
      */}
      <motion.div 
        style={{ clipPath }}
        className="fixed bottom-0 left-0 w-full h-screen z-10 bg-black"
      >
        <div className="absolute bottom-0 left-0 w-full h-[85vh] md:h-[80vh] lg:h-[75vh] flex flex-col">
          <Contact />
        </div>
      </motion.div>

      <ChatAssistant />
    </main>
  );
};

export default App;
