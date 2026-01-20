import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { ArrowUpRight, AlignLeft } from 'lucide-react';

import { projects as allProjects, type Project } from '../data/projects';

const FEATURED_PROJECT_IDS: Project['id'][] = ['p1', 'p2', 'p7', 'p3'];
const projects: Project[] = FEATURED_PROJECT_IDS.map((id) => allProjects.find((p) => p.id === id)).filter(
  (p): p is Project => Boolean(p)
);

export const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapDirection, setSnapDirection] = useState<'up' | 'down' | null>(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { mass: 0.2, stiffness: 240, damping: 20 });
  const cursorYSpring = useSpring(cursorY, { mass: 0.2, stiffness: 240, damping: 20 });

  // 1. Setup Scroll Track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Physics-based Smoothing
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.15,
    stiffness: 120,
    damping: 18,
    restDelta: 0.0001
  });

  // 3. Map scroll to index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const length = projects.length;
    const segment = 1 / length;
    const index = Math.floor(latest / segment);
    const clampedIndex = Math.min(Math.max(index, 0), length - 1);
    
    if (clampedIndex !== activeIndex) {
      setSnapDirection(clampedIndex > activeIndex ? 'down' : 'up');
      setActiveIndex(clampedIndex);
    }
  });

  // 清理方向状态的短暂效果
  useEffect(() => {
    if (!snapDirection) return;
    const t = window.setTimeout(() => setSnapDirection(null), 220);
    return () => window.clearTimeout(t);
  }, [snapDirection]);

  // Segment-based parallax to keep image aligned with the frame
  const segment = 1 / projects.length;
  const segStart = activeIndex * segment;
  const segEnd = (activeIndex + 1) * segment;
  const imageParallaxY = useTransform(smoothProgress, [segStart, segEnd], [-18, 18], { clamp: true });

  const currentProject = projects[activeIndex];
  const codeLabel = `PRJ_${currentProject.id.toUpperCase()}`;
  const displayIndex = (activeIndex + 1).toString().padStart(2, '0');

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative z-30"
      style={{ height: `${projects.length * 100}vh` }}
    >
      
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        
        {/* Background Grid - Static */}
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none"></div>

        {/* Top/Bottom Fade removed for seamless background */}

        {/* MAIN CONTENT GRID */}
        <div className="w-full h-full max-w-[1920px] mx-auto grid grid-cols-12 relative z-10">
          
          {/* ================= COL 1: NAVIGATION RAIL (Minimal) ================= */}
          <div className="hidden xl:flex col-span-1 border-r border-white/5 flex-col items-center py-12 relative">
             <div className="flex-1 flex flex-col justify-center gap-2">
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                            if (containerRef.current) {
                               const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
                               const targetY = containerRef.current.offsetTop + (totalHeight * (idx / (projects.length - 1)));
                           setSnapDirection(idx > activeIndex ? 'down' : 'up');
                           setActiveIndex(idx);
                               window.scrollTo({ top: targetY, behavior: 'smooth' });
                            }
                         }}
                        className="relative group w-12 h-12 flex items-center justify-center"
                      >
                    {/* Active State Indicator */}
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-full transition-all duration-500 bg-sky-300 ${idx === activeIndex ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}></div>
                    
                    {/* Number */}
                    <span className={`font-mono text-xs transition-all duration-500 ${idx === activeIndex ? 'text-white font-bold scale-125' : 'text-white/20 group-hover:text-white/50'}`}>
                      0{idx + 1}
                    </span>
                  </button>
                ))}
             </div>

          </div>


          {/* ================= COL 2-6: TYPOGRAPHY & INFO (The "Magazine" Look) ================= */}
          <div className="col-span-12 lg:col-span-5 px-8 md:px-16 lg:px-20 xl:px-24 flex flex-col justify-center h-full relative z-20">
             
             {/* Floating Header */}
             <div className="absolute top-12 left-8 md:left-16 lg:left-20 xl:left-24 flex items-center gap-3 opacity-60">
                <AlignLeft size={14} className="text-white/60" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/70">Selected Works 2023—24</span>
             </div>

             <div className="relative">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -30 }}
                   transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                   className="flex flex-col"
                 >
                    {/* 1. Meta Tag */}
                    <div className="flex items-center gap-4 mb-6">
                       <span className="px-2 py-0.5 border border-white/15 bg-white/5 text-white/80 text-[10px] tracking-[0.16em] uppercase rounded-sm">
                          {codeLabel}
                       </span>
                       <span className="h-[1px] w-12 bg-white/10"></span>
                       <span className="text-white/60 text-xs tracking-[0.14em] uppercase">{currentProject.category}</span>
                    </div>
                    
                    {/* 2. Massive Title */}
                    <motion.h2 
                      className="text-6xl md:text-7xl xl:text-8xl font-extrabold text-white leading-[0.9] tracking-[-0.04em] mb-8 max-w-[18ch]"
                      animate={{ y: [0, -1, 0] }}
                      transition={{ duration: 0.28 }}
                    >
                      {currentProject.title}
                      <span className="text-white/70">.</span>
                    </motion.h2>

                    {/* 3. The "Spec Sheet" Layout */}
                    <div className="border-t border-white/10 pt-6 mt-4 max-w-[54ch]">
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase tracking-[0.16em] mb-2">Client</p>
                             <p className="text-lg text-white font-medium">{currentProject.client ?? '—'}</p>
                          </div>
                          <div>
                             <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2 font-mono">Role</p>
                             <p className="text-lg text-white font-medium">{currentProject.role ?? '—'}</p>
                          </div>
                          <div className="col-span-2 mt-4">
                             <p className="text-[10px] text-gray-500 uppercase tracking-[0.16em] mb-2">Brief</p>
                             <p className="text-white/55 leading-relaxed text-base md:text-lg">
                                {currentProject.description}
                             </p>
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <motion.button 
                        className="inline-flex items-center gap-3 group border border-white/15 px-6 py-3 rounded-full cursor-none backdrop-blur-sm bg-white/0 hover:bg-white/5 transition-colors"
                        whileHover={{ x: 6 }}
                      >
                         <ArrowUpRight size={18} className="text-white/70 group-hover:text-white transition-colors" />
                         <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
                            View Case Study
                         </span>
                      </motion.button>
                    </div>

                 </motion.div>
               </AnimatePresence>
             </div>
          </div>


        {/* ================= COL 7-12: IMAGE (Editorial Frame) ================= */}
          <div className="col-span-12 lg:col-span-6 h-[40vh] md:h-[44vh] lg:h-full relative overflow-hidden">

            {/* Editorial frame layout: centered image + caption */}
            <div className="absolute inset-0 flex items-center justify-center px-6 md:px-10 lg:px-12 xl:px-16">
              <div className="w-full max-w-[720px] xl:max-w-[820px]">
                {/* Frame */}
                <div className="relative w-full overflow-hidden border border-white/5 rounded-2xl bg-black/30 backdrop-blur-[6px]">
                  <div className="relative w-full pt-[70%]">
                    <div className="absolute inset-0">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, scale: 0.99, filter: 'blur(4px)' }}
                          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                          className="relative w-full h-full"
                        >
                          <div
                            className="w-full h-full relative group"
                            onMouseEnter={() => {
                              setIsImageHovered(true);
                              if (typeof window !== 'undefined') {
                                window.dispatchEvent(new CustomEvent('portfolio-image-hover', { detail: { hovered: true } }));
                              }
                            }}
                            onMouseLeave={() => {
                              setIsImageHovered(false);
                              if (typeof window !== 'undefined') {
                                window.dispatchEvent(new CustomEvent('portfolio-image-hover', { detail: { hovered: false } }));
                              }
                            }}
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              cursorX.set(e.clientX - rect.left);
                              cursorY.set(e.clientY - rect.top);
                            }}
                          >
                            <motion.img
                              src={currentProject.thumbnailUrl}
                              alt={currentProject.title}
                              className="absolute inset-0 w-full h-full object-cover opacity-80 will-change-transform"
                              // Increase scale to avoid revealing the frame background when parallax shifts.
                              style={{ y: imageParallaxY, scale: 1.1, transformOrigin: '50% 50%' }}
                            />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay"></div>
                            {snapDirection && (
                              <div className="absolute inset-0 pointer-events-none z-30">
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.12 }}
                                  transition={{ duration: 0.18 }}
                                  className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5"
                                />
                              </div>
                            )}

                            <div className="pointer-events-none absolute inset-0 z-20">
                              <motion.div
                                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-[10px] tracking-[0.18em] uppercase leading-none text-center"
                                animate={
                                  isImageHovered
                                    ? { width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.92)', color: '#000000', opacity: 1 }
                                    : { width: 32, height: 32, backgroundColor: 'rgba(15,23,42,0.35)', color: 'rgba(255,255,255,0.7)', opacity: 0 }
                                }
                                transition={{ type: 'spring', stiffness: 230, damping: 24, mass: 0.45 }}
                                style={{ left: cursorXSpring, top: cursorYSpring }}
                              >
                                <span className="block w-full text-center leading-none">view project</span>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-5 flex items-baseline justify-between gap-6 text-[10px] md:text-[11px] tracking-[0.16em] text-white/55">
                  <div className="uppercase">
                    <span className="text-white/70">{currentProject.client ?? currentProject.title}</span>
                    <span className="text-white/35"> · </span>
                    <span className="text-white/45">{currentProject.category}</span>
                  </div>
                  <div className="uppercase text-white/35">{displayIndex} / {projects.length.toString().padStart(2, '0')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Global Progress Bar removed for seamless background */}

        <a
          href="#/projects"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 cursor-none group border border-white/15 px-6 py-3 rounded-full backdrop-blur-sm bg-black/40 hover:bg-white/10 transition-colors text-[11px] font-mono tracking-[0.2em] uppercase text-white/70 hover:text-white z-40"
        >
          <span>Discover all project</span>
          <ArrowUpRight size={16} className="text-white/70 group-hover:text-white transition-colors" />
        </a>

        {/* Mobile Page Indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden z-40">
            {projects.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-sky-300 w-8' : 'bg-white/20 w-2'}`}
                />
            ))}
        </div>

      </div>
    </section>
  );
};
