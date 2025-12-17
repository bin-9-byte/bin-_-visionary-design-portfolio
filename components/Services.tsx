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
              className="text-6xl md:text-8xl font-black tracking-tighter text-white/90 drop-shadow-lg"
            >
              Capa<br/>bilities
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-200 text-lg max-w-sm border-l-2 border-sky-400/70 pl-6 drop-shadow-md"
            >
              My approach intersects strategic thinking with visual excellence, ensuring every output is not just seen, but felt.
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
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Fully transparent card with border
      className="relative rounded-2xl overflow-hidden bg-transparent border border-white/10 backdrop-blur-none"
    >
      {/* Spotlight Border Effect - tuned to match blue/orange background */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56,189,248,0.45), transparent 40%)`,
        }}
      />
      
      {/* COMPLETELY TRANSPARENT CARD INTERIOR */}
      <div className="relative h-full bg-transparent hover:bg-white/5 transition-colors duration-500 p-8 rounded-2xl overflow-hidden group">
        
        {/* Spotlight Inner Fill */}
        <div
          className="pointer-events-none absolute -inset-px transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56,189,248,0.14), transparent 45%)`,
          }}
        />

        <div className="relative flex items-center gap-6 z-10">
          <div className="p-4 rounded-xl bg-transparent border border-white/10 text-white group-hover:text-sky-300 group-hover:scale-110 transition-all duration-300 group-hover:border-sky-300/60 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            {service.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:translate-x-2 transition-transform duration-300 drop-shadow-md shadow-black">{service.title}</h3>
            <p className="text-gray-300 group-hover:text-white transition-colors text-sm leading-relaxed opacity-90 group-hover:opacity-100 drop-shadow-sm">{service.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
