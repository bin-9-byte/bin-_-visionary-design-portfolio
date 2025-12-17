import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon, ArrowRight } from 'lucide-react';

// Updated Nav Order: Profile is now the second item (first link)
const navLinks = [
  { name: 'Profile', href: '#profile' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const lastIsAtTopRef = useRef<boolean>(true);
  const lastIsCompactRef = useRef<boolean>(false);
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

      const nextIsCompact = scrollY > viewportHeight * 0.8;
      if (nextIsCompact !== lastIsCompactRef.current) {
        lastIsCompactRef.current = nextIsCompact;
        setIsCompact(nextIsCompact);
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

  // Logic: Show full menu if NOT compact OR if Hovered
  const showFullMenu = !isCompact || isHovered;

  const surfaceClass = isAtTop
    ? 'bg-transparent border border-transparent shadow-none'
    : 'bg-black/70 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center items-start pt-6 pointer-events-none">
        {/*
          Root fix for the "instant jank": keep BOTH states mounted.
          We only crossfade/translate via CSS (no mount/unmount, no layout animation).
        */}
        <div
          className="pointer-events-auto relative w-[min(90vw,1280px)] h-14"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Expanded */}
          <div
            className={`absolute inset-0 rounded-3xl px-6 md:px-8 py-3 overflow-hidden transition-[opacity,transform,background-color,border-color] duration-150 ease-out will-change-transform transform-gpu ${surfaceClass} ${
              showFullMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between gap-8 h-10">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 group shrink-0">
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                  <Hexagon className="w-8 h-8 text-white fill-white/10 group-hover:stroke-sky-300 transition-colors" />
                </motion.div>
                <span className="font-mono font-bold text-xl tracking-tighter whitespace-nowrap mix-blend-difference">
                  NEXUS
                </span>
              </a>

              {/* Links */}
              <div className="hidden md:flex items-center gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative px-5 py-2 text-sm font-bold tracking-wide text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5 uppercase"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* CTA + mobile toggle */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  className={`hidden md:flex items-center gap-2 px-6 py-2 font-bold rounded-full text-sm whitespace-nowrap overflow-hidden transition-colors ${
                    isAtTop ? 'bg-white/10 border border-white/20 text-white' : 'bg-white text-black'
                  } hover:bg-orange-400 hover:text-black hover:border-orange-300`}
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={14} />
                </button>

                <button className="md:hidden text-white p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Compact */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] rounded-full px-5 py-2 overflow-hidden bg-black/80 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-150 ease-out will-change-transform transform-gpu ${
              showFullMenu ? 'opacity-0 -translate-y-[calc(50%+8px)] pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="flex items-center justify-between gap-3 h-10">
              <Hexagon className="w-5 h-5 text-white fill-white/10" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse"></span>
                <span className="text-sm font-mono tracking-widest uppercase text-white whitespace-nowrap truncate">
                  {activeSection}
                </span>
              </div>
              <span className="w-5" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-bold tracking-tight hover:text-sky-300 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
