import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';

type Category = 'All' | string;

const buildCategories = (items: Project[]): Category[] => {
  const set = new Set<string>();
  for (const p of items) set.add(p.category);
  return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
};

export const AllProjects: React.FC = () => {
  const categories = useMemo(() => buildCategories(projects), []);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="relative z-20 min-h-screen">
      {/* Top: Fluid background visible through transparent surface */}
      <header className="relative min-h-[52vh] md:min-h-[60vh] flex">
        {/* Top bar */}
        <div className="absolute top-8 left-6 md:left-10 lg:left-12 right-6 md:right-10 lg:right-12 flex items-center justify-between">
          <a
            href="#/"
            className="inline-flex items-baseline gap-3 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/70 hover:text-white transition-colors"
          >
            <span className="text-white/85">nexus</span>
            <span className="text-white/45">tokyo</span>
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/55 hover:text-white/80 transition-colors"
          >
            Menu
            <span className="inline-flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span className="w-1 h-1 rounded-full bg-white/50" />
            </span>
          </button>
        </div>

        {/* Title row */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 pt-24 md:pt-28 pb-14 md:pb-16 flex items-end">
          <div className="w-full grid grid-cols-12 gap-x-10 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-white leading-[0.92] tracking-tight"
              >
                <span className="block font-light text-[clamp(44px,7.2vw,116px)]">
                  We choose a
                </span>
                <span className="block font-light text-[clamp(44px,7.2vw,116px)]">
                  different →
                </span>
                <span className="block font-light text-[clamp(44px,7.2vw,116px)]">
                  starting point
                </span>
              </motion.h1>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:justify-self-end">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="max-w-sm text-white/65 text-[12px] md:text-sm leading-relaxed"
              >
                Every project is a chance to try something new. Look at something with a fresh perspective. Do something for the first time.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Down hint */}
        <div className="absolute bottom-10 right-6 md:right-10 lg:right-12 text-white/55">
          <ArrowDown size={18} />
        </div>
      </header>

      {/* Bottom: Light surface with nav + grid (match reference layout) */}
      <section className="relative bg-[#F7F6F2] text-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-x-10 gap-y-12">
            {/* Left nav */}
            <aside className="col-span-12 md:col-span-3 lg:col-span-2">
              <div className="md:sticky md:top-24">
                <nav className="space-y-2">
                  {categories.map((c) => {
                    const isActive = activeCategory === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setActiveCategory(c)}
                        className={`group relative w-full text-left pl-5 text-[10px] tracking-[0.28em] uppercase transition-colors ${
                          isActive ? 'text-black' : 'text-black/45 hover:text-black/70'
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full transition-opacity ${
                            isActive ? 'opacity-100 bg-black/80' : 'opacity-0 bg-black/40 group-hover:opacity-60'
                          }`}
                        />
                        {c}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Cards */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {filtered.map((p) => (
                  <motion.a
                    key={p.id}
                    href="#"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 22, mass: 0.6 }}
                    className="group block"
                  >
                    <div className="relative overflow-hidden bg-white">
                      {/* Portrait-ish image like reference */}
                      <div className="relative pt-[125%]">
                        <img
                          src={p.image}
                          alt={`${p.client} · ${p.title}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Thin rule under image */}
                    <div className="mt-4 h-px w-full bg-black/15" />

                    <div className="mt-4">
                      <div className="text-[10px] tracking-[0.22em] uppercase text-black/45">
                        {p.category}
                      </div>
                      <div className="mt-3 text-[15px] md:text-[16px] leading-snug tracking-tight text-black uppercase">
                        {p.client} <span className="text-black/40">•</span> {p.title}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
