import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section id="contact" className="relative h-full min-h-0 bg-black px-6 md:px-16 pt-28 md:pt-36 pb-12 md:pb-16">
      {/* Top overlay: solid black to prevent background bleed */}
      <div className="absolute top-0 left-0 w-full h-28 md:h-32 bg-black pointer-events-none"></div>

      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        {/* Left: headline + subcopy + email CTA */}
        <div className="col-span-12 md:col-span-7 lg:col-span-6 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10vw] md:text-[6vw] lg:text-[4.8vw] font-black leading-[0.95] tracking-tight"
          >
            WE WOULD LOVE
            <br />
            TO HEAR FROM YOU.
          </motion.h2>

          <p className="mt-6 text-sm md:text-base text-white/60 max-w-xl">
            Feel free to reach out if you want to collaborate with us, or simply have a chat.
          </p>

          <a
            href="mailto:contact@nexus.design"
            className="group mt-8 inline-flex items-center gap-3 text-xl md:text-2xl font-medium tracking-tight"
          >
            contact@nexus.design
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-sky-300 transition-colors">
              <ArrowRight size={16} className="text-white group-hover:text-sky-300" />
            </span>
          </a>

          {/* Copyright bottom-left */}
          <div className="mt-16 text-[10px] font-mono text-white/40">
            © NEXUS STUDIO 2024 · All rights reserved
          </div>
        </div>

        {/* Middle columns: address + follow + sites */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Address */}
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mb-3">OUR ADDRESS</div>
            <div className="space-y-2 text-sm text-white/80">
              <div>Unit D104</div>
              <div>116 Commercial Street</div>
              <div>London, E1 6NF</div>
              <div>United Kingdom</div>
            </div>
            <div className="mt-4 text-[10px] text-white/40 font-mono space-y-1">
              <div>VAT: 319656475</div>
              <div>Company no. 11843590</div>
              <div>Registered in England & Wales</div>
            </div>
          </div>

          {/* Follow + sites */}
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mb-3">FOLLOW US</div>
            <div className="text-sm text-white/80 flex gap-3 mb-4">
              <span>Fb</span>
              <span>Tw</span>
              <span>Ig</span>
              <span>Li</span>
            </div>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-white/80 hover:text-white transition-colors">↗ NEXUS TOKYO</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">↗ NEXUS NYC</a>
              <a href="#" className="block text-white/80 hover:text-white transition-colors">↗ POWERED BY TOKYO</a>
            </div>
          </div>
        </div>

        {/* Right column: site nav */}
        <div className="col-span-12 lg:col-span-2">
          <div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase mb-3">HOME</div>
          <div className="space-y-2 text-sm">
            <a href="#" className="block text-white/80 hover:text-white">Home</a>
            <a href="#work" className="block text-white/80 hover:text-white">Work</a>
            <a href="#services" className="block text-white/80 hover:text-white">Services</a>
            <a href="#profile" className="block text-white/80 hover:text-white">Team</a>
            <a href="#contact" className="block text-white/80 hover:text-white">Contact</a>
            <a href="#" className="block text-white/80 hover:text-white">Press & News</a>
            <a href="#" className="block text-white/80 hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Top button */}
      <button
        onClick={goTop}
        className="fixed bottom-10 right-10 z-40 text-[10px] font-mono px-4 py-2 rounded-full border border-white/20 text-white/70 hover:text-black hover:bg-white transition-colors"
        aria-label="Back to top"
      >
        TOP ↑
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};
