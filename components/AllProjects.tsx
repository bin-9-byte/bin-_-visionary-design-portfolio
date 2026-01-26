import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { projects, type Project, type ProjectGroup } from '../data/projects';

type Filter = 'all' | ProjectGroup;
type MediumFilter = 'all' | 'image' | 'video' | 'text';

export const AllProjects: React.FC = () => {
  const filters: { key: Filter; label: string }[] = useMemo(
    () => [
      { key: 'all', label: 'ALL' },
      { key: 'spatial', label: 'SPATIAL' },
      { key: 'product', label: 'PRODUCT' },
      { key: 'identity', label: 'IDENTITY' },
    ],
    []
  );
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const mediumFilters: { key: MediumFilter; label: string }[] = useMemo(
    () => [
      { key: 'all', label: 'ALL' },
      { key: 'image', label: 'IMAGE' },
      { key: 'video', label: 'VIDEO' },
      { key: 'text', label: 'TEXT' },
    ],
    []
  );
  const [activeMedium, setActiveMedium] = useState<MediumFilter>('all');

  const getProjectMediums = (project: Project): Array<'image' | 'video' | 'text'> => {
    if (project.mediums && project.mediums.length > 0) return project.mediums;
    const mediums = new Set<'image' | 'video' | 'text'>();
    const hasVideo = project.images.some((item) => {
      const src = typeof item === 'string' ? item : item.src;
      return src.toLowerCase().endsWith('.mp4');
    });
    if (hasVideo) {
      mediums.add('video');
    }
    if (project.images.length > 0) {
      mediums.add('image');
    }
    if (project.summary || project.description) {
      mediums.add('text');
    }
    return Array.from(mediums);
  };

  const filtered = useMemo(() => {
    const groupFiltered = activeFilter === 'all' ? projects : projects.filter((p) => p.group === activeFilter);
    if (activeMedium === 'all') return groupFiltered;
    return groupFiltered.filter((p) => getProjectMediums(p).includes(activeMedium));
  }, [activeFilter, activeMedium]);

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
                  {filters.map((f) => {
                    const isActive = activeFilter === f.key;
                    return (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setActiveFilter(f.key)}
                        className={`group relative w-full text-left pl-5 text-[10px] tracking-[0.28em] uppercase transition-colors ${
                          isActive ? 'text-black' : 'text-black/45 hover:text-black/70'
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full transition-opacity ${
                            isActive ? 'opacity-100 bg-black/80' : 'opacity-0 bg-black/40 group-hover:opacity-60'
                          }`}
                        />
                        {f.label}
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-10 text-[10px] tracking-[0.28em] uppercase text-black/35">
                  Media
                </div>
                <nav className="mt-4 space-y-2">
                  {mediumFilters.map((f) => {
                    const isActive = activeMedium === f.key;
                    return (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setActiveMedium(f.key)}
                        className={`group relative w-full text-left pl-5 text-[10px] tracking-[0.28em] uppercase transition-colors ${
                          isActive ? 'text-black' : 'text-black/45 hover:text-black/70'
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full transition-opacity ${
                            isActive ? 'opacity-100 bg-black/80' : 'opacity-0 bg-black/40 group-hover:opacity-60'
                          }`}
                        />
                        {f.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Cards */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {filtered.map((p) => {
                  const summary = p.summary ?? p.description;
                  const mediums = getProjectMediums(p);
                  return (
                  <motion.a
                    key={p.id}
                    href={`#/projects/${p.id}`}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 22, mass: 0.6 }}
                    className="group block"
                  >
                    <div className="relative overflow-hidden bg-white">
                      {/* Portrait-ish image like reference */}
                      <div className="relative pt-[125%]">
                        <img
                          src={p.thumbnailUrl}
                          alt={`${p.client ?? ''} ${p.title}`.trim()}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Thin rule under image */}
                    <div className="mt-4 h-px w-full bg-black/15" />

                    <div className="mt-4">
                      <div className="text-[10px] tracking-[0.22em] uppercase text-black/45">
                        {p.group}
                      </div>
                      <div className="mt-3 text-[15px] md:text-[16px] leading-snug tracking-tight text-black uppercase">
                        {(p.client ?? p.title).toUpperCase()} <span className="text-black/40">•</span> {p.category.toUpperCase()}
                      </div>
                      <div className="mt-3 text-[12px] text-black/55 leading-relaxed">
                        {summary}
                      </div>
                      {(mediums.length > 0 || (p.tags && p.tags.length > 0)) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {mediums.map((medium) => (
                            <span
                              key={`${p.id}-${medium}`}
                              className="px-2 py-1 rounded-full border border-black/10 bg-white text-[9px] tracking-[0.18em] uppercase text-black/70"
                            >
                              {medium}
                            </span>
                          ))}
                          {(p.tags ?? []).map((tag) => (
                            <span
                              key={`${p.id}-${tag}`}
                              className="px-2 py-1 rounded-full border border-black/10 text-[9px] tracking-[0.16em] uppercase text-black/45"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.a>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
