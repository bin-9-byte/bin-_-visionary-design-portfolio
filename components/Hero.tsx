import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 md:pt-28 pb-10">
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start md:items-start gap-6 md:gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] md:text-xs font-mono tracking-[0.25em] uppercase text-white/70"
        >
          DIGITAL DESIGN PORTFOLIO
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="leading-[0.9] select-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
        >
          <span className="block text-[13vw] md:text-[9vw] lg:text-[7.4vw] font-extrabold tracking-tighter text-[#F3F6FF]">
            DIGITAL
          </span>
          <span className="block text-[13vw] md:text-[9vw] lg:text-[7.4vw] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#F3F6FF] via-white to-[#FFE5CF]">
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
    </section>
  );
};
