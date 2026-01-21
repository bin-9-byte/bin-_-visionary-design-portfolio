import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { projects, type Project, type ImageItem } from '../data/projects';

type Section = { id: string; label: string };

const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'gallery', label: 'Gallery' },
];

const normalizeImage = (item: string | ImageItem): ImageItem =>
  typeof item === 'string' ? { src: item } : item;

const isVideo = (src: string) => src.toLowerCase().endsWith('.mp4');

type ProjectDetailPageProps = {
  projectId: string;
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId }) => {
  const project = useMemo(() => projects.find((item) => item.id === projectId), [projectId]);

  if (!project) {
    return (
      <div className="relative z-20 min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/55 mb-4">Project</div>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">未找到项目</h1>
          <p className="mt-4 text-white/60 text-sm md:text-base">
            请从项目列表中重新选择。
          </p>
          <a
            href="#/projects"
            className="mt-8 inline-flex items-center gap-2 border border-white/15 px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white hover:border-white/30 transition-colors"
          >
            <ArrowLeft size={16} />
            返回项目列表
          </a>
        </div>
      </div>
    );
  }

  const galleryItems = project.images.map(normalizeImage);

  return (
    <div className="relative z-20 min-h-screen">
      <header className="relative min-h-[46vh] md:min-h-[54vh] flex">
        <div className="absolute top-8 left-6 md:left-10 lg:left-12 right-6 md:right-10 lg:right-12 flex items-center justify-between">
          <a
            href="#/projects"
            className="inline-flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="text-white/85">all projects</span>
          </a>
          <div className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/45">
            {project.group}
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 pt-24 md:pt-28 pb-14 md:pb-16 flex items-end">
          <div className="w-full grid grid-cols-12 gap-x-10 gap-y-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-white leading-[0.92] tracking-tight"
              >
                <span className="block font-light text-[clamp(44px,6.8vw,110px)]">
                  {project.title}
                </span>
              </motion.h1>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:justify-self-end">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="max-w-sm text-white/65 text-[12px] md:text-sm leading-relaxed space-y-4"
              >
                <div className="text-[10px] tracking-[0.28em] uppercase text-white/45">
                  {project.category}
                </div>
                <div>{project.description}</div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-6 md:right-10 lg:right-12 text-white/55">
          <ArrowDown size={18} />
        </div>
      </header>

      <section className="relative bg-[#F7F6F2] text-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-x-10 gap-y-12">
            <aside className="col-span-12 md:col-span-3 lg:col-span-2">
              <div className="md:sticky md:top-24">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group relative w-full text-left pl-5 text-[10px] tracking-[0.28em] uppercase text-black/45 hover:text-black/80 transition-colors block"
                    >
                      <span className="absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full bg-black/40 group-hover:opacity-70 opacity-40" />
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-20">
              <section id="overview" className="scroll-mt-24">
                <div className="relative overflow-hidden bg-white">
                  <div className="relative pt-[56.25%]">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div>
                    <div className="text-[10px] tracking-[0.28em] uppercase text-black/45">
                      Overview
                    </div>
                    <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-black">
                      {project.title}
                    </h2>
                  </div>
                  <div className="text-black/65 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </div>
                </div>
              </section>

              <section id="details" className="scroll-mt-24">
                <div className="text-[10px] tracking-[0.28em] uppercase text-black/45">
                  Details
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="border-t border-black/10 pt-4">
                    <div className="text-[10px] tracking-[0.24em] uppercase text-black/45">Client</div>
                    <div className="mt-3 text-base md:text-lg tracking-tight">{project.client ?? '—'}</div>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="text-[10px] tracking-[0.24em] uppercase text-black/45">Role</div>
                    <div className="mt-3 text-base md:text-lg tracking-tight">{project.role ?? '—'}</div>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="text-[10px] tracking-[0.24em] uppercase text-black/45">Year</div>
                    <div className="mt-3 text-base md:text-lg tracking-tight">{project.year}</div>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="text-[10px] tracking-[0.24em] uppercase text-black/45">Category</div>
                    <div className="mt-3 text-base md:text-lg tracking-tight">{project.category}</div>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="text-[10px] tracking-[0.24em] uppercase text-black/45">Group</div>
                    <div className="mt-3 text-base md:text-lg tracking-tight">{project.group}</div>
                  </div>
                </div>
              </section>

              <section id="gallery" className="scroll-mt-24">
                <div className="text-[10px] tracking-[0.28em] uppercase text-black/45">
                  Gallery
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {galleryItems.map((item, index) => {
                    const label = item.name ?? `${project.title} ${index + 1}`;
                    if (isVideo(item.src)) {
                      return (
                        <div key={`${item.src}-${index}`} className="bg-white">
                          <div className="relative w-full pt-[62%]">
                            <video
                              className="absolute inset-0 w-full h-full object-cover"
                              controls
                              poster={item.poster}
                            >
                              <source src={item.src} />
                            </video>
                          </div>
                          <div className="px-4 py-3 text-[11px] tracking-[0.16em] uppercase text-black/50">
                            {label}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={`${item.src}-${index}`} className="bg-white">
                        <div className="relative w-full pt-[62%]">
                          <img
                            src={item.src}
                            alt={label}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="px-4 py-3 text-[11px] tracking-[0.16em] uppercase text-black/50">
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
