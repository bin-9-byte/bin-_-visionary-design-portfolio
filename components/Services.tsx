import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Layers, Globe } from 'lucide-react';

const services = [
  {
    title: "Art Direction",
    desc: "Defining visual languages that speak louder than words.",
    icon: <Layers size={32} />
  },
  {
    title: "Interface Design",
    desc: "Pixel-perfect UI constructed for usability and delight.",
    icon: <Monitor size={32} />
  },
  {
    title: "Creative Development",
    desc: "Bringing designs to life with WebGL and React.",
    icon: <Cpu size={32} />
  },
  {
    title: "Brand Identity",
    desc: "Crafting logos and systems that stand the test of time.",
    icon: <Globe size={32} />
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      {/* Removed Noise Overlay entirely to allow FluidBackground to show */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8 sticky top-32 self-start">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-7xl font-extrabold tracking-tighter text-white/90 drop-shadow-lg"
            >
              Capabilities
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-lg max-w-sm border-l-2 border-sky-400/70 pl-6 drop-shadow-md"
            >
              I design clear, calm interfaces that feel intuitive from the first glance.
            </motion.div>
          </div>

          <div className="grid gap-6">
            {services.map((service, idx) => (
              <SpotlightCard key={idx} index={idx} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SpotlightCard: React.FC<{ index: number; service: any }> = ({ index, service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5/5 backdrop-blur-sm group"
    >
      <div className="relative h-full p-8 rounded-2xl overflow-hidden bg-black/40 group-hover:bg-black/55 transition-colors duration-300">
        <div className="relative flex items-center gap-6 z-10">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-sky-300 group-hover:border-sky-300/50 transition-colors duration-300">
            {service.icon}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-sky-300 transition-colors duration-300">{service.title}</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors text-sm leading-relaxed opacity-90 group-hover:opacity-100">{service.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
