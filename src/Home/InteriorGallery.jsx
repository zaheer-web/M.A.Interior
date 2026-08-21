import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Keyboard,
  Zoom,
  EffectCreative,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/effect-creative";

import im1 from "../img/im1.png";
import im2 from "../img/im10.png";
import im3 from "../img/im11.png";
import im4 from "../img/im4.png";
import im5 from "../img/im5.png";
import im6 from "../img/im6.png";

const images = [im1, im2, im3, im4, im5, im6];

const InteriorGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <section className="relative overflow-hidden bg-black py-20 text-white">

        {/* ================= BACKGROUND ================= */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* GLOW */}

        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[150px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[150px]" />

        {/* BACKGROUND TEXT */}

        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none whitespace-nowrap text-[90px] font-black leading-none text-white/[0.025] sm:text-[150px] lg:text-[230px]">
          GALLERY
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

          {/* ================= HEADING ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

              Selected Projects
            </div>

            <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Interior{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              Explore a collection of thoughtfully designed interiors where
              architecture, materials and craftsmanship come together.
            </p>
          </motion.div>

          {/* =====================================================
              MASONRY GALLERY
          ===================================================== */}

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">

            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.7,
                  delay: (i % 3) * 0.1,
                }}
                className="mb-5 break-inside-avoid"
              >

                <div
                  onClick={() => setActiveIndex(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10"
                >

                  {/* IMAGE */}

                  <img
                    src={img}
                    alt={`Interior project ${i + 1}`}
                    loading="lazy"
                    className="
                      w-full
                      object-cover

                      transition-transform
                      duration-[1200ms]
                      ease-out

                      group-hover:scale-110
                    "
                  />

                  {/* DARK OVERLAY */}

                  <div
                    className="
                      absolute inset-0

                      bg-gradient-to-t
                      from-black/80
                      via-black/10
                      to-transparent

                      opacity-40

                      transition-opacity
                      duration-500

                      group-hover:opacity-100
                    "
                  />

                  {/* GOLD BORDER */}

                  <div
                    className="
                      pointer-events-none
                      absolute inset-0

                      rounded-2xl

                      border
                      border-transparent

                      transition-all
                      duration-500

                      group-hover:border-amber-400/40
                    "
                  />

                  {/* TOP NUMBER */}

                  <div
                    className="
                      absolute left-4 top-4

                      -translate-y-3
                      opacity-0

                      transition-all
                      duration-500

                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* ================= CENTER ICON ================= */}

                  <div
                    className="
                      absolute left-1/2 top-1/2

                      flex h-14 w-14
                      -translate-x-1/2
                      -translate-y-1/2

                      scale-50
                      items-center
                      justify-center

                      rounded-full

                      border border-white/20
                      bg-black/40

                      opacity-0
                      backdrop-blur-md

                      transition-all
                      duration-500

                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  >
                    <Maximize2 size={20} />
                  </div>

                  {/* ================= BOTTOM TEXT ================= */}

                  <div
                    className="
                      absolute bottom-0 left-0 right-0

                      translate-y-5

                      p-5

                      opacity-0

                      transition-all
                      duration-500

                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                  </div>

                  {/* GOLD LINE */}

                  <div
                    className="
                      absolute bottom-0 left-0

                      h-[2px]
                      w-0

                      bg-gradient-to-r
                      from-amber-300
                      to-yellow-600

                      transition-all
                      duration-700

                      group-hover:w-full
                    "
                  />

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* ==========================================================
          SWIPER FULL SCREEN LIGHTBOX
      ========================================================== */}

      <AnimatePresence>

        {activeIndex !== null && (

          <motion.div
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
              duration: 0.3,
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >

            {/* ================= CLOSE ================= */}

            <button
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery"
              className="
                absolute right-4 top-4
                z-[100]

                flex h-11 w-11
                items-center
                justify-center

                rounded-full

                border border-white/10
                bg-white/5

                text-white

                backdrop-blur-md

                transition-all
                duration-300

                hover:rotate-90
                hover:border-amber-400
                hover:bg-amber-400
                hover:text-black

                sm:right-8
                sm:top-8
              "
            >
              <X size={21} />
            </button>

            {/* ================= SWIPER ================= */}

            <Swiper
              modules={[
                Navigation,
                Pagination,
                Keyboard,
                Zoom,
                EffectCreative,
              ]}

              initialSlide={activeIndex}

              slidesPerView={1}

              navigation

              keyboard={{
                enabled: true,
              }}

              zoom={{
                maxRatio: 3,
                minRatio: 1,
              }}

              pagination={{
                clickable: true,
              }}

              effect="creative"

              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: ["-120%", 0, -500],
                  rotate: [0, 20, 0],
                },

                next: {
                  shadow: true,
                  translate: ["120%", 0, -500],
                  rotate: [0, -20, 0],
                },
              }}

              speed={850}

              className="h-full w-full"
            >

              {images.map((img, i) => (

                <SwiperSlide key={i}>

                  <div className="flex h-full w-full items-center justify-center px-5 py-20 sm:px-16">

                    {/* ZOOM REQUIRED WRAPPER */}

                    <div className="swiper-zoom-container">

                      <img
                        src={img}
                        alt={`Interior project ${i + 1}`}
                        className="
                          max-h-[78vh]
                          max-w-full

                          select-none
                          rounded-xl

                          object-contain

                          shadow-2xl
                          shadow-black
                        "
                      />

                    </div>

                    {/* ================= IMAGE NUMBER ================= */}

                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center">

                      <p className="text-[9px] uppercase tracking-[0.35em] text-amber-400">
                        Project
                      </p>

                      <p className="mt-1 text-sm text-white/70">

                        {String(i + 1).padStart(2, "0")}

                        <span className="mx-2 text-white/20">
                          /
                        </span>

                        {String(images.length).padStart(2, "0")}

                      </p>

                    </div>

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
};

export default InteriorGallery;