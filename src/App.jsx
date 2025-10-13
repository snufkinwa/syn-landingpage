import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Research from './Research.jsx';

function FloatingPaths({ position = 1 }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-neutral-900"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function HomePage() {
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setVideoOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [videoOpen]);

  // Lock body scroll and enable Esc to close when the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    const shouldLock = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    if (shouldLock) document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      if (shouldLock) document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <main className="relative bg-stone-50 text-neutral-900 min-h-screen flex flex-col overflow-hidden">
      {/* Animated background paths (replaces static SVG) */}
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      
      {/* CENTERED HEADER NAVIGATION - Desktop only */}
      <header className="hidden md:block relative z-20 w-full py-4">
        <nav className="flex items-center justify-center gap-6">
          <a
            href="https://synaptik-core.ai/docs"
            className="px-6 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition rounded-lg"
          >
            Docs
          </a>
          <a
            href="https://synaptik-core.ai/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition rounded-lg"
          >
            Blog
          </a>
          <Link
            to="/research"
            className="px-6 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition rounded-lg"
          >
            Research Survey
          </Link>
          <a
            href="mailto:janayharris@synaptik-core.dev"
            className="px-6 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 transition rounded-lg"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* CONTENT LAYOUT */}
      <section className="relative z-10 mx-auto flex flex-1 w-full max-w-7xl flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-2 py-14 md:py-20">
        {/* TAGLINE vertically centered, aligned left with glass background */}
        <div className="flex-1 flex flex-col justify-center">
          <div
            className="relative isolate text-left w-full max-w-3xl rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-2xl shadow-lg ring-1 ring-black/5 p-6 md:p-8 opacity-95"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
              Memory. Ethics.<br />
              Audit. <span className="text-indigo-600">Core.</span>
            </h1>
            {/* subtle divider for structure */}
            <div className="mt-5 h-px w-48 bg-gradient-to-r from-neutral-400/40 to-transparent"></div>
            <p className="mt-5 max-w-prose text-lg text-neutral-900 ">
              A cognitive runtime that makes AI verifiable: persistent memory, enforceable contracts, and transparent logs by design.
            </p>
          </div>
        </div>
        </section>

      {/* MOBILE MENU TOGGLE - Top right corner for mobile only */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="md:hidden fixed top-4 right-4 z-40 flex h-12 w-12 items-center justify-center text-neutral-900 hover:text-neutral-700 bg-white/80 backdrop-blur-sm rounded-lg"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Mobile full-screen menu */}
      {open && (
        <div 
          className="fixed inset-0 z-50 md:hidden bg-neutral-900 text-white flex flex-col" 
          role="dialog" 
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4">
            <span className="text-xs uppercase tracking-widest text-neutral-400">Menu</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              aria-label="Close menu"
              className="rounded-full bg-white/90 px-4 py-3 text-neutral-900 hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-auto px-4 pb-8">
            <div className="space-y-4">
              <a
                href="https://synaptik-core.ai/docs"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-white px-5 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                Docs
              </a>
              <a
                href="https://synaptik-core.ai/blog"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-white px-5 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                Blog
              </a>
              <Link
                to="/research"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-base font-semibold text-white hover:bg-indigo-500"
              >
                Research Survey
              </Link>
              <a
                href="mailto:janayharris@synaptik-core.dev"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-white px-5 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-100"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}



      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <button
                onClick={() => setVideoOpen(false)}
                className="rounded-full bg-white/90 px-3 py-2 text-neutral-900 ring-1 ring-white/70 hover:bg-white"
                aria-label="Close video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute left-0 top-0 h-full w-full rounded-lg z-0"
                src="https://www.youtube.com/embed/MQWFUgrDit8?autoplay=1&rel=0"
                title="Synaptik Core 3‑minute demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 mx-auto max-w-7xl px-6 pb-6 text-center text-xs text-neutral-900">
        <div className="inline-block bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          © {new Date().getFullYear()} Synaptik Core
        </div>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/research" element={<Research />} />
    </Routes>
  );
}
