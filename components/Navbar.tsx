import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Updated Nav Order: Profile is now the second item (first link)
const navLinks = [
  { name: 'Profile', href: '#profile' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isBelowHero, setIsBelowHero] = useState(false);
  const [isNavPanelOpen, setIsNavPanelOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const lastIsAtTopRef = useRef<boolean>(true);
  const lastIsBelowHeroRef = useRef<boolean>(false);
  const lastActiveSectionRef = useRef<string>('Home');

  useEffect(() => {
    let rafId: number | null = null;

    const compute = () => {
      rafId = null;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const nextIsAtTop = scrollY < 50;
      if (nextIsAtTop !== lastIsAtTopRef.current) {
        lastIsAtTopRef.current = nextIsAtTop;
        setIsAtTop(nextIsAtTop);
      }

      const nextIsBelowHero = scrollY > viewportHeight * 0.7;
      if (nextIsBelowHero !== lastIsBelowHeroRef.current) {
        lastIsBelowHeroRef.current = nextIsBelowHero;
        setIsBelowHero(nextIsBelowHero);
      }

      // "Home" label when near top (no layout reads)
      if (scrollY < viewportHeight * 0.5 && lastActiveSectionRef.current !== 'Home') {
        lastActiveSectionRef.current = 'Home';
        setActiveSection('Home');
      }
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(compute);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    compute();
    return () => {
      window.removeEventListener('scroll', onScroll as any);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Active section via IntersectionObserver (avoids getBoundingClientRect on scroll)
  useEffect(() => {
    const ids = ['profile', 'work', 'about', 'contact'];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (!best) return;

        const id = (best.target as HTMLElement).id;
        const label = id.charAt(0).toUpperCase() + id.slice(1);
        if (label !== lastActiveSectionRef.current) {
          lastActiveSectionRef.current = label;
          setActiveSection(label);
        }
      },
      {
        root: null,
        // Only consider the middle band of the viewport
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const surfaceClass = isAtTop
    ? 'bg-black/25 border-white/10'
    : 'bg-black/70 border-white/15';

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsNavPanelOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 pointer-events-none"
        initial={false}
        animate={isBelowHero && !isNavPanelOpen ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="pointer-events-auto w-[min(92vw,1120px)]">
          <div
            className={`flex items-center justify-between gap-6 rounded-full px-4 md:px-6 py-2.5 border backdrop-blur-xl transition-colors duration-300 ${surfaceClass}`}
          >
            <a href="#" className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-semibold tracking-[0.18em] uppercase text-white/80">Bin Ma</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="relative px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-white"
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="hidden md:block w-6" />
          </div>
        </div>
      </motion.nav>

      {(isBelowHero || isNavPanelOpen) && (
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.4 }}
          className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full border transition-[background-color,border-color,box-shadow] duration-200 ${
            isNavPanelOpen
              ? 'bg-black text-white border-black hover:bg-black/90 hover:shadow-[0_14px_28px_rgba(0,0,0,0.4)]'
              : 'bg-white/95 text-black border-black/10 hover:border-black/20 hover:shadow-[0_14px_28px_rgba(0,0,0,0.25)]'
          }`}
          onClick={() => setIsNavPanelOpen((open) => !open)}
          aria-label="Toggle navigation panel"
        >
          {isNavPanelOpen ? (
            <X size={16} className="text-white" />
          ) : (
            <span className="flex gap-[3px]">
              <span className="w-[2px] h-3 md:h-3.5 bg-black/90 group-hover:bg-black rounded-full transition-colors" />
              <span className="w-[2px] h-3 md:h-3.5 bg-black/90 group-hover:bg-black rounded-full transition-colors" />
            </span>
          )}
        </motion.button>
      )}

      {/* Top sheet navigation panel */}
      <AnimatePresence>
        {isNavPanelOpen && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-40 bg-white text-black shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
          >
            <div className="w-[min(96vw,1120px)] mx-auto px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="space-y-1 text-sm">
                <div className="font-semibold tracking-[0.18em] uppercase">Bin Ma</div>
                <div className="text-xs text-black/50">Digital design & creative development</div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                <div>
                  <div className="text-[11px] tracking-[0.16em] text-black/50 uppercase mb-3">Pages</div>
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={(event) => handleNavClick(event as any, link.href)}
                        className="block text-left text-sm text-black/80 hover:text-black"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] tracking-[0.16em] text-black/50 uppercase mb-3">Contact</div>
                  <div className="space-y-2 text-sm">
                    <a href="mailto:contact@nexus.design" className="block text-black/80 hover:text-black">
                      contact@nexus.design
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] tracking-[0.16em] text-black/50 uppercase mb-3">Studio</div>
                  <div className="space-y-1 text-sm text-black/70">
                    <div>Based in Tokyo</div>
                    <div>Working worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
