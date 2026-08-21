import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";


// Swap these for your own paths, e.g. "../img/Urban/n36.jpeg"
import im1 from "../img/Urban/n36.jpeg";
import im2 from "../img/3D Visualization/n34.jpeg";
import im3 from "../img/architecture/n40.jpeg";
import im4 from "../img//Landscape/na1.jpeg";

const slides = [
  { src: im1, label: "Urbanism", place: "Riverfront Quarter — Lisbon" },
  { src: im2, label: "3D Visualization", place: "Casa Lumen — Interior Study" },
  { src: im3, label: "Architecture", place: "Villa Terra — Andalusia" },
  { src: im4, label: "Landscape", place: "Mirror Gardens — Kyoto" },
];

const words = [
  "Landscape Design",
  "Architecture",
  "3D Visualization",
  "Urbanism",
  "Interior Design",
];

function useTypewriter(list) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = list[wordIndex % list.length] ?? "";
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const delay = done ? 1800 : cleared ? 200 : deleting ? 45 : 80;

    const timer = setTimeout(() => {
      if (done) return setDeleting(true);
      if (cleared) {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % list.length);
        return;
      }
      setText(
        deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, list]);

  return text;
}

const Hero = () => {
  const [index, setIndex] = useState(0);
  const isFirstRender = useRef(true);
  const typed = useTypewriter(words);

  const go = useCallback((next) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const active = slides[index] ?? slides[0];

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-neutral-950">
      {/* ================= SLIDER ================= */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
          >
            <motion.img
              src={active.src}
              alt={`${active.label} project — ${active.place}`}
              draggable="false"
              className="absolute inset-0 h-full w-full select-none object-cover object-center"
              initial={{ scale: isFirstRender.current ? 1.02 : 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>      </div>

      {/* ================= OVERLAYS ================= */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/85 via-neutral-950/50 to-neutral-950/70 md:bg-gradient-to-r md:from-neutral-950/90 md:via-neutral-950/55 md:to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_35%,rgba(0,0,0,0.75)_100%)]" />

      {/* ================= CONTENT ================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pt-24 sm:px-10 md:justify-start md:px-16 md:pt-20 lg:px-24">
  <div className="max-w-3xl text-center md:text-left">
         

          {/* HEADING */}
          <h1 className="font-serif text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-white text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="block"
            >
              Creative
            </motion.span>

            <span className="block min-h-[1.05em] italic text-amber-400">
              {typed}
              <span className="ml-1 inline-block h-[0.82em] w-[2px] animate-pulse bg-amber-400 align-[-0.05em]" />
            </span>

            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="block font-medium"
            >
              Solutions
            </motion.span>
          </h1>

          {/* PARAGRAPH */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
           className="mx-auto mt-8 max-w-xl text-base font-light leading-[1.85] tracking-wide text-neutral-300 sm:text-lg md:mx-0"
          >
            We shape architecture, interiors, landscapes and urban futures —
            pairing immersive 3D visualization with a rigorous craft for spaces
            that feel inevitable, sustainable and quietly timeless.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
           <Link
  to="/gallery"
  className="group inline-flex items-center gap-3 rounded-full bg-amber-400 px-7 py-3.5 text-xs uppercase tracking-[0.24em] text-neutral-950 transition-all duration-500 hover:bg-amber-300"
>
  View Portfolio
  <span>→</span>
</Link>
           <Link
  to="/contact"
  className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-3.5 text-xs uppercase tracking-[0.24em] text-white/80 backdrop-blur-md transition-colors duration-500 hover:border-amber-400 hover:text-amber-400"
>
  Start a Project
</Link>
          </motion.div>
        </div>
      </div>
 

      {/* ================= ARROWS ================= */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all duration-500 hover:border-amber-400 hover:bg-amber-400 hover:text-neutral-950 sm:left-5 md:left-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-5 w-5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-md transition-all duration-500 hover:border-amber-400 hover:bg-amber-400 hover:text-neutral-950 sm:right-5 md:right-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-5 w-5">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

     
       {/* ================= COUNTER ================= */}
      <div className="absolute bottom-9 right-6 z-40 hidden items-end gap-2 sm:flex md:right-10 lg:right-24">
        <span className="font-serif text-3xl leading-none text-amber-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mb-1.5 h-px w-8 bg-white/30" />
        <span className="mb-1 text-[0.65rem] tracking-[0.3em] text-white/40">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default Hero;