import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';

export const Contact: React.FC = () => {
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section id="contact" className="relative h-full min-h-0 bg-black px-6 md:px-10 lg:px-12 xl:px-16 pt-28 md:pt-36 pb-12 md:pb-16">
      {/* Top overlay: solid black to prevent background bleed */}
      <div className="absolute top-0 left-0 w-full h-28 md:h-32 bg-black pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-y-14 gap-x-10">
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white/90"
          >
            Let’s work together.
          </motion.h2>

          <p className="mt-5 text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
            Reach out for collaboration, product design, or creative development. I usually reply within 1–2 business days.
          </p>

          <a
            href="mailto:contact@nexus.design"
            className="group mt-8 inline-flex items-center gap-3 text-base md:text-lg font-medium tracking-tight text-white/90"
          >
            <span className="border-b border-white/10 group-hover:border-white/30 transition-colors">
              contact@nexus.design
            </span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5 group-hover:bg-white/10 group-hover:border-white/25 transition-colors">
              <ArrowRight size={16} className="text-white/80 group-hover:text-white" />
            </span>
          </a>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <div className="text-[11px] tracking-[0.16em] text-white/45 uppercase mb-4">Studio</div>
              <div className="space-y-3 text-sm text-white/75">
                <div>Based in Tokyo</div>
                <div>Working worldwide</div>
                <a href="mailto:contact@nexus.design" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  Say hello
                  <ArrowRight size={14} className="text-white/50" />
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.16em] text-white/45 uppercase mb-4">Social</div>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">X (Twitter)</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Behance</a>
              </div>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.16em] text-white/45 uppercase mb-4">Navigate</div>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Home</a>
                <a href="#work" className="block text-white/70 hover:text-white transition-colors">Work</a>
                <a href="#profile" className="block text-white/70 hover:text-white transition-colors">Team</a>
                <a href="#contact" className="block text-white/70 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.16em] text-white/45 uppercase mb-4">Legal</div>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Press & News</a>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-xs text-white/40">© NEXUS STUDIO 2024</div>
          <button
            onClick={goTop}
            className="inline-flex items-center gap-2 text-xs tracking-wide text-white/60 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
              <ArrowUp size={14} className="text-white/70" />
            </span>
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};
