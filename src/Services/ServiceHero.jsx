import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// Local Images
import hero1 from "../img/im7.png";
import hero2 from "../img/Landscape/na11.jpeg";
import hero3 from "../img/3D Visualization/n25.jpeg";
import hero4 from "../img/im8.png";

const sliderImages = [hero1, hero2, hero3, hero4];

const ServiceHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirstRender = useRef(true);

  // ================= AUTO SLIDE =================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // ================= NEXT =================
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  // ================= PREVIOUS =================
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  // ================= DOT CLICK =================
  const goToSlide = (index) => {
    if (index === currentIndex) return;
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

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >

            {/* ================= IMAGE ================= */}

            <motion.img
              src={sliderImages[currentIndex]}
              alt={`Service ${currentIndex + 1}`}
              draggable="false"
              className="absolute inset-0 h-full w-full select-none object-cover object-center"

              initial={{
                scale: isFirstRender.current ? 1 : 1.05,
              }}

              animate={{
                scale: 1,
              }}

              transition={{
                duration: 5,
                ease: "linear",
              }}
            />

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= DARK OVERLAY ================= */}

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

      {/* ================= HERO CONTENT ================= */}

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

          {/* ================= HEADING ================= */}

          <h1
            className="
              text-4xl font-extrabold leading-tight
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Our{" "}

            <span className="inline-block text-yellow-500">
              <Typewriter
                words={[
                  "Architecture",
                  "Interior Design",
                  "Space Planning",
                  "Urban Design",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>

            <br />

            Services
          </h1>

          {/* ================= PARAGRAPH ================= */}

          <p
            className="
              mx-auto mt-6
              max-w-lg
              text-base leading-relaxed
              text-gray-300

              sm:text-lg
              md:mx-0
            "
          >
            We offer innovative architectural and interior design solutions
            that blend creativity, functionality and modern aesthetics to
            transform spaces into extraordinary experiences.
          </p>

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

      {/* ================= SLIDER DOTS ================= */}

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

export default ServiceHero;