import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

// ============================================
// IMAGES — path se import karo (URL nahi)
// ============================================

// Kitchen
import kitchen1 from "../img/Kitchen/ka1.jpeg";
import kitchen2 from "../img/Kitchen/ka2.jpeg";
import kitchen3 from "../img/Kitchen/ka3.jpeg";
import kitchen4 from "../img/Kitchen/ka4.jpeg";

// Bedroom
import bedroom1 from "../img/bedroom/ba1.jpeg";
import bedroom2 from "../img/bedroom/ba2.jpeg";
import bedroom3 from "../img/bedroom/ba3.jpeg";
import bedroom4 from "../img/bedroom/ba4.jpeg";

// Office
import office1 from "../img/office/oo1.jpeg";
import office2 from "../img/office/oo2.jpeg";
import office3 from "../img/office/oo3.jpeg";
import office4 from "../img/office/oo4.jpeg";

// Dinning Room
import dinning1 from "../img/dining room/da1.jpeg";
import dinning2 from "../img/dining room/da2.jpeg";


// Kids Room
import kids1 from "../img/kids room/ki1.jpeg";
import kids2 from "../img/kids room/ki2.jpeg";
import kids3 from "../img/kids room/ki3.jpeg";

// Living Room
import living1 from "../img/living room/la1.jpeg";
import living2 from "../img/living room/la2.jpeg";
import living3 from "../img/living room/la3.jpeg";
import living4 from "../img/living room/la4.jpeg";
import living5 from "../img/living room/la5.jpeg";

// Drawing Room
import drawing1 from "../img/drawing room/da1.jpeg";
import drawing2 from "../img/drawing room/da2.jpeg";
import drawing3 from "../img/drawing room/da3.jpeg";
import drawing4 from "../img/drawing room/da4.jpeg";

// Double Height Living
import doubleHeight1 from "../img/double height/dh1.jpeg";
import doubleHeight2 from "../img/double height/dh2.jpeg";

// Banquests Hall
import banquet1 from "../img/banquet hall/bn1.jpeg";
import banquet2 from "../img/banquet hall/bn2.jpeg";





const categories = [
  "All",
  "Kitchen",
  "Bedroom",
  "Office",
  "Dinning Room",
  "Kids Room",
  "Living Room",
  "Drawing Room",
  "Double Height Living",
  "Banquests Hall",
 
  
];

// Har category ke liye images yaha map ki gayi hain.
// Category name EXACT match hona chahiye upar wali list se.
const images = [
  // Kitchen
  { src: kitchen1, category: "Kitchen" },
  { src: kitchen2, category: "Kitchen" },
  { src: kitchen3, category: "Kitchen" },
  { src: kitchen4, category: "Kitchen" },

  // Bedroom
  { src: bedroom1, category: "Bedroom" },
  { src: bedroom2, category: "Bedroom" },
  { src: bedroom3, category: "Bedroom" },
  { src: bedroom4, category: "Bedroom" },

  // Office
  { src: office1, category: "Office" },
  { src: office2, category: "Office" },
  { src: office3, category: "Office" },
  { src: office4, category: "Office" },

  // Dinning Room
  { src: dinning1, category: "Dinning Room" },
  { src: dinning2, category: "Dinning Room" },
 

  // Kids Room
  { src: kids1, category: "Kids Room" },
  { src: kids2, category: "Kids Room" },
  { src: kids3, category: "Kids Room" },

  // Living Room
  { src: living1, category: "Living Room" },
  { src: living2, category: "Living Room" },
  { src: living3, category: "Living Room" },
  { src: living4, category: "Living Room" },
  { src: living5, category: "Living Room" },

  // Drawing Room
  { src: drawing1, category: "Drawing Room" },
  { src: drawing2, category: "Drawing Room" },
  { src: drawing3, category: "Drawing Room" },
  { src: drawing4, category: "Drawing Room" },

  // Double Height Living
  { src: doubleHeight1, category: "Double Height Living" },
  { src: doubleHeight2, category: "Double Height Living" },

  // Banquests Hall
  { src: banquet1, category: "Banquests Hall" },
  { src: banquet2, category: "Banquests Hall" },


 
];

const INITIAL_VISIBLE = 9;

const Interior = () => {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredImages =
    category === "All"
      ? images
      : images.filter((img) => img.category === category);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;
  const isExpanded = visibleCount > INITIAL_VISIBLE;

  const next = () => {
    setIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      {/* scrollbar-hide utility (Tailwind me by-default nahi hota) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Glow background */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* FILTER */}
        <div className="mb-16 text-center">
        

          <div className="relative">
            {/* Left/right fade to hint scrollability on mobile */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent z-10 md:hidden" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent z-10 md:hidden" />

            <div className="mt-5 flex md:flex-wrap md:justify-center gap-3 overflow-x-auto md:overflow-visible scrollbar-hide px-6 md:px-0 py-1 snap-x snap-mandatory">
              {categories.map((item, i) => {
                const isActive = category === item;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCategory(item);
                      setIndex(null); // category change pe lightbox reset
                      setVisibleCount(INITIAL_VISIBLE); // category change pe count reset
                    }}
                    className={`relative flex-shrink-0 snap-start px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300
                    ${isActive ? "text-black" : "text-gray-300 hover:text-yellow-400"}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-category-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* GALLERY GRID */}
        {filteredImages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {visibleImages.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % INITIAL_VISIBLE) * 0.04 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIndex(i)}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer group"
                >
                  <img
                    src={item.src}
                    className="w-full h-[260px] object-cover group-hover:scale-110 transition duration-700"
                    alt={item.category}
                  />
                </motion.div>
              ))}
            </div>

            {/* VIEW MORE / VIEW LESS */}
            {filteredImages.length > INITIAL_VISIBLE && (
              <div className="mt-14 flex justify-center">
                <button
                  onClick={() => {
                    if (hasMore) {
                      setVisibleCount(filteredImages.length);
                    } else {
                      setVisibleCount(INITIAL_VISIBLE);
                      document
                        .getElementById("interior-gallery-top")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="flex items-center gap-2 px-8 py-3 rounded-full border border-yellow-500/50 text-yellow-400 font-medium hover:bg-yellow-500 hover:text-black transition-colors duration-300"
                >
                  {hasMore ? "View More" : "View Less"}
                  {hasMore ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronUp size={18} />
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400">Is category me abhi koi image nahi hai.</p>
        )}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          >
            {/* CLOSE */}
            <button onClick={() => setIndex(null)} className="absolute top-8 right-8 text-white">
              <X size={32} />
            </button>

            {/* LEFT */}
            <button onClick={prev} className="absolute left-6 text-white">
              <ChevronLeft size={40} />
            </button>

            {/* IMAGE */}
            <motion.img
              key={index}
              src={filteredImages[index].src}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="max-h-[80vh] rounded-xl shadow-2xl"
              alt={filteredImages[index].category}
            />

            {/* RIGHT */}
            <button onClick={next} className="absolute right-6 text-white">
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Interior;