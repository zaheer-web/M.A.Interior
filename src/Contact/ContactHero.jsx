import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Local Images
import hero1 from "../img/im17.png";
import hero2 from "../img/im18.png";
import hero3 from "../img/im19.jpeg";
import hero4 from "../img/im20.jpeg";

const sliderImages = [hero1, hero2, hero3, hero4];

const ContactHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // ================= AUTO SLIDE =================
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);

      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // ================= NEXT =================
  const nextSlide = () => {
    setDirection(1);

    setCurrentIndex((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  // ================= PREVIOUS =================
  const prevSlide = () => {
    setDirection(-1);

    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  // ================= DOT CLICK =================
  const goToSlide = (index) => {
    if (index === currentIndex) return;

    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black">

      {/* ================= FULL SCREEN SLIDER ================= */}

      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >

            {/* ================= IMAGE ================= */}

            <motion.img
              src={sliderImages[currentIndex]}
              alt={`Contact ${currentIndex + 1}`}
              draggable="false"
              className="absolute inset-0 h-full w-full select-none object-cover"
              initial={{
                scale: 1.08,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                scale: {
                  duration: 5,
                  ease: "linear",
                },
              }}
            />

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= OVERLAY ================= */}

      <div
        className="
          pointer-events-none
          absolute inset-0 z-10

          bg-gradient-to-b
          from-black/80
          via-black/45
          to-black/40

          md:bg-gradient-to-r
          md:from-black/85
          md:via-black/50
          md:to-transparent
        "
      />

      {/* ================= CONTENT ================= */}

      <div
        className="
          absolute inset-0 z-20
          flex items-center justify-center

          px-6 pt-20

          sm:px-10

          md:justify-start
          md:px-24
          md:pt-0

          lg:px-32
        "
      >
        <motion.div
          key={`content-${currentIndex}`}
          initial={{
            x: -40,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className="max-w-2xl text-center text-white md:text-left"
        >

          {/* SMALL TITLE */}

          <span className="mb-3 block text-xs font-semibold uppercase tracking-[3px] text-yellow-400 md:text-sm">
            Let's Work Together
          </span>

          {/* ================= HEADING ================= */}

          <h1
            className="
              text-4xl font-extrabold leading-tight
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Get In Touch

            <span className="block text-yellow-500">
              Contact Us
            </span>
          </h1>

          {/* ================= BREADCRUMB ================= */}

          <div
            className="
              mt-6 flex
              items-center justify-center
              gap-2
              text-xs font-semibold
              tracking-[0.25em]

              sm:text-sm
              sm:tracking-[0.3em]

              md:justify-start
            "
          >
            <span className="opacity-70">
              HOME
            </span>

            <span className="text-yellow-500">
              —
            </span>

            <span>
              CONTACT
            </span>
          </div>

        </motion.div>
      </div>

      {/* ================= LEFT ARROW ================= */}

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="
          absolute left-3 top-1/2 z-40
          flex h-11 w-11
          -translate-y-1/2
          items-center justify-center

          rounded-full
          border border-white/30
          bg-black/20

          text-white
          backdrop-blur-md

          transition-all duration-300

          hover:border-yellow-500
          hover:bg-yellow-500
          hover:text-black

          sm:left-5
          sm:h-12
          sm:w-12

          md:left-8
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path
            d="M15 18l-6-6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ================= RIGHT ARROW ================= */}

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute right-3 top-1/2 z-40
          flex h-11 w-11
          -translate-y-1/2
          items-center justify-center

          rounded-full
          border border-white/30
          bg-black/20

          text-white
          backdrop-blur-md

          transition-all duration-300

          hover:border-yellow-500
          hover:bg-yellow-500
          hover:text-black

          sm:right-5
          sm:h-12
          sm:w-12

          md:right-8
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
        >
          <path
            d="M9 6l6 6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ================= DOTS ================= */}

      <div
        className="
          absolute bottom-8 left-1/2 z-40
          flex -translate-x-1/2
          items-center gap-3
        "
      >
        {sliderImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentIndex === index
                ? "w-10 bg-yellow-500"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ================= SLIDE NUMBER ================= */}

      <div
        className="
          absolute bottom-7 right-6 z-40
          hidden items-center gap-2
          text-white

          sm:flex
          md:right-10
        "
      >
        <span className="text-lg font-semibold">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>

        <span className="h-px w-8 bg-white/40" />

        <span className="text-xs text-white/50">
          {String(sliderImages.length).padStart(2, "0")}
        </span>
      </div>

    </section>
  );
};

export default ContactHero;