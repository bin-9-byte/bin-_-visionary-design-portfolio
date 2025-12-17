import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 md:pt-28 pb-10">
      
      {/* HUD Element: System Online (Moved to Top Right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 right-6 md:right-16 flex flex-col items-end gap-2 z-10 hidden md:flex"
      >
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/75 uppercase">System Online</span>
        </div>
        <div className="text-[10px] font-mono text-white/30 tracking-widest">
           35.6762° N, 139.6503° E
        </div>
      </motion.div>

      {/* Decorative Left Line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "40%" }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"
      />

      {/* Main Content Area - Centered Dual-Line Title */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start md:items-start gap-6 md:gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] md:text-xs font-mono tracking-[0.35em] uppercase text-white/70"
        >
          DIGITAL DESIGN PORTFOLIO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="leading-[0.9] select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
        >
          <span className="block text-[11vw] md:text-[7vw] lg:text-[5.8vw] font-black tracking-tighter text-[#F3F6FF]">
            DIGITAL
          </span>
          <span className="block text-[11vw] md:text-[7vw] lg:text-[5.8vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#F3F6FF] via-white to-[#FFE5CF]">
            ALCHEMY
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-xl text-sm md:text-base text-white/70"
        >
          Crafting interfaces, identities, and immersive visuals that feel as fluid as the world behind them.
        </motion.p>
      </div>

      {/* Bottom Area: Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 w-full flex justify-between items-end px-2 md:px-10"
      >
        <span className="hidden md:block text-[10px] font-mono text-white/30 w-32">
          SCROLL TO EXPLORE
        </span>

        <div className="flex-1 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent"
              animate={{ scaleY: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        <span className="hidden md:block text-[10px] font-mono text-white/30 w-32 text-right">
          V 2.0.4
        </span>
      </motion.div>
    </section>
  );
};
