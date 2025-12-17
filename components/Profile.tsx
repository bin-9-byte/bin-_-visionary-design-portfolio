import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Download, ArrowUpRight, Plus, Layers, Hash, Circle } from 'lucide-react';

const experiences = [
  {
    id: "LOG_01",
    role: "Senior Product Designer",
    company: "GLOBAL TECH INC.",
    period: "2022 — PRESENT",
    description: "Architecting the design system 'Atlas' used by 500+ engineers. Spearheaded the UI overhaul for the flagship AI analytics platform.",
    tags: ["Design Systems", "React", "Strategy"]
  },
  {
    id: "LOG_02",
    role: "Lead UI Engineer",
    company: "FUTURE LABS",
    period: "2019 — 2022",
    description: "Hybrid role bridging design and dev. Created award-winning WebGL storytelling experiences for major automotive brands.",
    tags: ["WebGL", "GLSL", "Creative Dev"]
  },
  {
    id: "LOG_03",
    role: "Visual Developer",
    company: "STUDIO NEON",
    period: "2017 — 2019",
    description: "Executed high-fidelity motion prototypes and interactive installations for fashion week runways globally.",
    tags: ["Motion", "Three.js", "Prototyping"]
  }
];

const techStack = [
  "React / Next.js", "TypeScript", "Tailwind CSS", 
  "WebGL / Three.js", "Figma Expert", "Node.js", 
  "Python", "AI Prompting", "Blender"
];

export const Profile: React.FC = () => {
  return (
    <section id="profile" className="relative py-24 xl:py-32 px-6 md:px-12 w-full">
      
      {/* HUD Frame - Top/Bottom Lines */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-white/10 hidden md:block">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20"></div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        {/* 1. HEADER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 mb-20 lg:mb-32">
          
          {/* Identity Block */}
          <div className="lg:col-span-8 relative">
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="flex items-center gap-3 mb-6 font-mono text-xs tracking-[0.2em] text-emerald-300"
             >
                <div className="w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div>
                SYSTEM ONLINE
             </motion.div>

             <h2 className="text-[13vw] lg:text-[11vw] font-black leading-[0.8] tracking-tighter text-white select-none">
                <div className="relative inline-block">
                  <motion.span 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="block drop-shadow-2xl relative z-10"
                  >
                    MA
                  </motion.span>
                  {/* Decorative number behind/next to it */}
                  <span className="absolute -top-4 -right-12 text-sm font-mono text-gray-500 tracking-widest opacity-50 hidden md:block">
                    [ID:8821]
                  </span>
                </div>
                <motion.span 
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-transparent stroke-text opacity-70"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}
                >
                  BIN
                </motion.span>
             </h2>
          </div>

          {/* Intro Block - Aligned Bottom Right of Header */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-4">
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="border-t border-white/20 pt-6"
             >
                <h3 className="text-2xl font-light text-white leading-tight mb-6">
                  <span className="text-emerald-300 font-bold">Digital Alchemist</span> merging technical precision with aesthetic rebellion.
                </h3>
                
                <div className="flex flex-col gap-2 font-mono text-xs text-gray-400 tracking-wider">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>ROLE</span>
                    <span className="text-white">FULL STACK CREATIVE</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>BASE</span>
                    <span className="text-white">TOKYO, JP</span>
                  </div>
                  <div className="pt-4">
                    <button className="flex items-center gap-2 text-white hover:text-sky-300 transition-colors group">
                      <Download size={14} />
                      <span className="border-b border-transparent group-hover:border-sky-300 transition-all">DOWNLOAD PROFILE_DAT</span>
                    </button>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* 2. DATA GRID (Experience & Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-24 gap-y-16 items-start">
           
           {/* LEFT: Experience (Timeline Cards) */}
           <div className="lg:col-span-7 relative">
              
              {/* Timeline Line (Circuit Trace) */}
              <div className="absolute left-[-1px] top-12 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block"></div>

              <div className="flex items-center gap-2 mb-12 text-white/40">
                 <Terminal size={14} />
                 <span className="font-mono text-xs tracking-widest uppercase">Execution Logs</span>
                 <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.15 }}
                    className="group relative pl-0 md:pl-8"
                  >
                    {/* Timeline Node Connector */}
                    <div className="absolute left-[-5px] top-8 w-[9px] h-[9px] bg-[#020408] border border-white/30 rotate-45 hidden md:block group-hover:border-emerald-300 group-hover:bg-emerald-300/15 transition-colors duration-500 z-10"></div>
                    <div className="absolute left-0 top-9 w-8 h-[1px] bg-white/10 hidden md:block group-hover:bg-emerald-300/70 transition-colors duration-500"></div>

                    {/* 1. Card Container (Outer) */}
                    {/* Fixed: Removed h-full from inner and outer to let content dictate height. Reduced padding. */}
                    <div className="relative p-[1px] rounded-sm bg-gradient-to-b from-white/10 via-white/5 to-transparent group-hover:from-emerald-300/30 group-hover:via-emerald-300/10 group-hover:to-transparent transition-all duration-500">
                       
                       {/* 2. Card Content (Inner) */}
                       <div className="relative bg-[#08080a] p-6 rounded-sm border-t border-white/5 overflow-hidden">
                          
                          {/* 3. Decorative: Scanning Grid Background (Reveals on Hover) */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-300/6 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                          {/* 4. Decorative: Corner Brackets */}
                          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-emerald-300/60 transition-colors duration-300"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-emerald-300/60 transition-colors duration-300"></div>


                          {/* CONTENT: Header */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
                             <div className="flex items-center gap-4">
                                {/* ID Badge */}
                                <div className="font-mono text-[9px] text-emerald-300 border border-emerald-300/40 px-2 py-1 bg-emerald-300/5 rounded">
                                   {exp.id}
                                </div>
                                <h4 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors duration-300 tracking-tight">
                                   {exp.company}
                                </h4>
                             </div>
                             
                             {/* Period Badge */}
                             <div className="self-start md:self-auto px-3 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-gray-400 whitespace-nowrap">
                                {exp.period}
                             </div>
                          </div>

                          {/* CONTENT: Role & Desc */}
                          <div className="relative z-10">
                                <h5 className="text-lg text-sky-300 font-mono mb-3 flex items-center gap-2">
                                   <div className="w-1 h-1 bg-sky-300 rounded-full"></div>
                                   {exp.role}
                                </h5>
                                
                                <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-200 transition-colors max-w-2xl">
                                   {exp.description}
                                </p>

                                {/* Tags as 'System Status' */}
                                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/5">
                                   {exp.tags.map((tag, t) => (
                                     <div key={t} className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase group-hover:text-sky-300/80 transition-colors border border-transparent group-hover:border-sky-300/30 px-2 py-1 rounded">
                                        <Circle size={6} className="fill-current"/>
                                        {tag}
                                     </div>
                                   ))}
                                </div>
                          </div>

                          {/* 5. Decorative: Bottom Progress Bar (Animated on Hover) */}
                          <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-neon-green via-neon-cyan to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>

           {/* RIGHT: Tech Stack (Grid Matrix) */}
           <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                 <div className="flex items-center gap-2 mb-12 text-white/40">
                    <Cpu size={14} />
                    <span className="font-mono text-xs tracking-widest uppercase">System Modules</span>
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                 </div>

                 {/* Matrix Grid */}
                 <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                    {techStack.map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                        className="bg-[#08080a]/90 backdrop-blur-sm p-4 relative group overflow-hidden flex flex-col justify-between min-h-[100px]"
                      >
                         <div className="flex justify-between items-start">
                           <span className="text-[9px] font-mono text-gray-600 group-hover:text-emerald-300 transition-colors">0{i+1}</span>
                           <Plus size={8} className="text-gray-700 group-hover:text-white transition-colors" />
                         </div>
                         <div className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors font-bold z-10 relative mt-4">
                           {tech}
                         </div>
                         
                         {/* Hover Effect: Corner accent */}
                         <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-transparent group-hover:border-sky-300 transition-all duration-300"></div>
                         
                         {/* Hover Effect: Background pulse */}
                         <div className="absolute inset-0 bg-sky-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    ))}
                 </div>

                 {/* R&D Block */}
                 <div className="mt-12 p-1 border border-dashed border-white/20">
                    <div className="bg-white/5 p-6 backdrop-blur-md">
                       <div className="flex items-center gap-2 mb-3 text-neon-purple">
                          <Layers size={16} />
                          <span className="text-xs font-mono font-bold">ACTIVE RESEARCH</span>
                       </div>
                       <div className="text-lg font-bold text-white mb-2">WebGPU & AI Agents</div>
                       <p className="text-xs text-gray-400 leading-relaxed font-mono">
                          {">"} Exploring neural interface patterns<br/>
                          {">"} Optimizing render pipelines
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
