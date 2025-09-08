import { useEffect, useState } from 'react';

export default function SynaptikLanding() {
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
      {/* Top-right decorative SVG */}
      <img
        src="/top-right.svg"
        alt=""
        aria-hidden="true"
        className="hidden md:block pointer-events-none select-none absolute top-0 right-0 z-0 w-[85vw] max-w-[740px] h-auto"
        loading="eager"
      />
      {/* CONTENT LAYOUT */}
      <section className="relative z-10 mx-auto flex flex-1 w-full max-w-7xl flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-14 md:py-20">
        {/* TAGLINE vertically centered, aligned left */}
        <div className="flex-1 flex flex-col justify-center text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
            Memory. Ethics.<br />
            Audit. <span className="text-indigo-600">Core.</span>
          </h1>
          {/* subtle divider for structure */}
          <div className="mt-5 h-px w-48 bg-gradient-to-r from-neutral-400/40 to-transparent"></div>
          <p className="mt-5 max-w-lg text-lg text-neutral-700">
            Synaptik Core builds trust at the architectural level by weaving persistent memory,
            contract-based safeguards, and transparent auditing directly into the AI workflow.
          </p>
        </div>
        </section>

      {/* BOTTOM RIGHT TOGGLE + LINKS */}
      <section className="relative z-10 flex justify-end items-end">
              {/* Floating toggle arrow - pinned to viewport corner */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle quick links"
        className="fixed bottom-3 right-3 md:bottom-4 md:right-10 z-40 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center text-neutral-900 hover:text-neutral-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`h-10 w-10 transform transition-transform ${open ? 'rotate-180' : 'motion-safe:animate-bounce hover:animate-none'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
        {/* RIGHT BOX WITH LINKS, slides up/down and only visible if open */}
        {open && (
          <>
            {/* Mobile full-screen menu */}
            <div className="fixed inset-0 z-50 md:hidden bg-neutral-900 text-white flex flex-col" role="dialog" aria-modal="true">
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-xs uppercase tracking-widest text-neutral-400">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full bg-white/90 px-3 py-2 text-neutral-900 hover:bg-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-auto px-4 pb-8">
                <div className="space-y-4">
                  <a
                    href="https://github.com/snufkinway/synaptik-core"
                    className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-semibold text-neutral-900 hover:opacity-90"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.388 7.868 10.912.575.1.787-.25.787-.556 0-.275-.012-1.183-.012-2.15-3.212.7-3.888-1.362-3.888-1.362-.524-1.325-1.275-1.675-1.275-1.675-1.05-.712.075-.7.075-.7 1.163.088 1.775 1.2 1.775 1.2 1.038 1.775 2.713 1.263 3.375.963.1-.75.412-1.263.75-1.55-2.562-.287-5.25-1.287-5.25-5.725 0-1.263.45-2.288 1.2-3.088-.125-.288-.525-1.463.113-3.05 0 0 .987-.313 3.238 1.2a11.33 11.33 0 0 1 2.95-.4c1 0 2.012.137 2.95.4 2.25-1.513 3.237-1.2 3.237-1.2.638 1.587.238 2.762.113 3.05.75.8 1.2 1.825 1.2 3.088 0 4.45-2.688 5.425-5.263 5.712.425.363.8 1.075.8 2.175 0 1.563-.013 2.825-.013 3.212 0 .3.212.65.787.55A10.995 10.995 0 0 0 23.5 12c0-6.352-5.148-11.5-11.5-11.5Z" />
                    </svg>
                    GitHub Repo
                  </a>
                  <a
                    href="https://youtu.be/N-GHFlzwTOg?si=f5x8VLOKt1fOY6Gp"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setVideoOpen(true);
                    }}
                    className="block rounded-lg bg-indigo-500 px-5 py-3 text-base font-semibold text-white hover:bg-indigo-400"
                  >
                    🎥 Watch 3‑min Demo
                  </a>
                  <a
                    href="mailto:janayharris@synaptik-core.dev"
                    className="block rounded-lg bg-white px-5 py-3 text-base font-semibold text-neutral-900 hover:bg-neutral-100"
                  >
                    ✉️ Contact
                  </a>
                  <span className="block text-xs text-neutral-400">
                    Built with Rust + Python bindings. Hackathon submission, 2025.
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop bottom-right panel */}
            <div className="hidden md:block fixed bottom-0 right-10 z-20 border-t border-l border-r border-neutral-900 bg-neutral-900 p-6 w-[360px] h-[280px] space-y-4 overflow-auto shadow-xl">
              <a
                href="https://github.com/snufkinwa/synaptik-core"
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-900 hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.388 7.868 10.912.575.1.787-.25.787-.556 0-.275-.012-1.183-.012-2.15-3.212.7-3.888-1.362-3.888-1.362-.524-1.325-1.275-1.675-1.275-1.675-1.05-.712.075-.7.075-.7 1.163.088 1.775 1.2 1.775 1.2 1.038 1.775 2.713 1.263 3.375.963.1-.75.412-1.263.75-1.55-2.562-.287-5.25-1.287-5.25-5.725 0-1.263.45-2.288 1.2-3.088-.125-.288-.525-1.463.113-3.05 0 0 .987-.313 3.238 1.2a11.33 11.33 0 0 1 2.95-.4c1 0 2.012.137 2.95.4 2.25-1.513 3.237-1.2 3.237-1.2.638 1.587.238 2.762.113 3.05.75.8 1.2 1.825 1.2 3.088 0 4.45-2.688 5.425-5.263 5.712.425.363.8 1.075.8 2.175 0 1.563-.013 2.825-.013 3.212 0 .3.212.65.787.55A10.995 10.995 0 0 0 23.5 12c0-6.352-5.148-11.5-11.5-11.5Z" />
                </svg>
                GitHub Repo
              </a>
              <a
                href="https://youtu.be/MQWFUgrDit8"
                onClick={(e) => {
                  e.preventDefault();
                  setVideoOpen(true);
                }}
                className="block rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-400"
              >
               🎥 Watch 3‑min Demo
              </a>
              <a
                href="mailto:janayharris@synaptik-core.dev"
                className="block rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
               ✉️ Contact
              </a>
              <span className="block text-xs text-neutral-500">
                Built with Rust + Python bindings. Hackathon submission, 2025.
              </span>
            </div>
          </>
        )}
      </section>



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

      <footer className="relative z-10 mx-auto max-w-7xl px-6 pb-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Synaptik Core
      </footer>
    </main>
  );
}
