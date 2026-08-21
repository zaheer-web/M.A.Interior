import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================
// IMAGES — path se import karo (URL nahi)
// ============================================

// Landscape
import Landscape1 from "../img/Landscape/na1.jpeg";
import Landscape2 from "../img/Landscape/na2.jpeg";
import Landscape3 from "../img/Landscape/na3.jpeg";
import Landscape4 from "../img/Landscape/na4.jpeg";
import Landscape5 from "../img/Landscape/na5.jpeg";
import Landscape6 from "../img/Landscape/na6.jpeg";
import Landscape7 from "../img/Landscape/na7.jpeg";
import Landscape8 from "../img/Landscape/na8.jpeg";

// Urban
import Urban1 from "../img/Urban/n35.jpeg";
import Urban2 from "../img/Urban/n36.jpeg";
import Urban3 from "../img/Urban/n37.jpeg";







// Architecture Room
import Architecture1 from "../img/architecture/n38.jpeg";
import Architecture2 from "../img/architecture/n39.jpeg";
import Architecture3 from "../img/architecture/n40.jpeg";
import Architecture4 from "../img/architecture/n41.jpeg";
import Architecture5 from "../img/architecture/n44.jpeg";

// 3D Visualisation Room
import  Visualisation1 from "../img/3D Visualization/n24.jpeg";
import  Visualisation2 from "../img/3D Visualization/n25.jpeg";
import  Visualisation3 from "../img/3D Visualization/n31.jpeg";
import  Visualisation4 from "../img/3D Visualization/n34.jpeg";



// Interior
import Interior from "../img/Interior/ba1.jpeg";
import Interior2 from "../img/Interior/ba2.jpeg";
import Interior3 from "../img/Interior/ba3.jpeg";

const categories = [
  "All",
  "Landscape",
  "Architecture",
  "3D Visualisation",
  "Urbanism",
  "Interior",

];

// Har category ke liye images yaha map ki gayi hain.
// Category name EXACT match hona chahiye upar wali list se.
const images = [
  // Landscape
  { src: Landscape1, category: "Landscape" },
  { src: Landscape2, category: "Landscape" },
  { src: Landscape3, category: "Landscape" },
  { src: Landscape4, category: "Landscape" },
    { src: Landscape5, category: "Landscape" },
  { src: Landscape6, category: "Landscape" },
  { src: Landscape7, category: "Landscape" },
  { src: Landscape8, category: "Landscape" },

  // Urban
  { src: Urban1, category: "Urbanism" },
  { src: Urban2, category: "Urbanism" },
  { src: Urban3, category: "Urbanism" },
  

  
 


  // Architecture Room
  { src: Architecture1, category: "Architecture" },
  { src: Architecture2, category: "Architecture" },
  { src: Architecture3, category: "Architecture" },
  { src: Architecture4, category: "Architecture" },
  { src: Architecture5, category: "Architecture" },

  // 3D Visualisation Room
  { src: Visualisation1, category: "3D Visualisation" },
  { src: Visualisation2, category: "3D Visualisation" },
  { src: Visualisation3, category: "3D Visualisation" },
  { src: Visualisation4, category: "3D Visualisation" },

 

  // Interior
  { src: Interior, category: "Interior" },
  { src: Interior2, category: "Interior" },
  { src: Interior3, category: "Interior" },
];

const GallerySection = () => {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(null);

  const filteredImages =
    category === "All"
      ? images
      : images.filter((img) => img.category === category);

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
          <h4 className="text-xs tracking-[0.3em] uppercase text-yellow-500/70 mb-6">
            Browse by space
          </h4>

          <div className="relative">
            {/* Left/right fade to hint scrollability on mobile */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent z-10 md:hidden" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent z-10 md:hidden" />

            <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto md:overflow-visible scrollbar-hide px-6 md:px-0 py-1 snap-x snap-mandatory">
              {categories.map((item, i) => {
                const isActive = category === item;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setCategory(item);
                      setIndex(null); // category change pe lightbox reset
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredImages.map((item, i) => (
              <motion.div
                key={i}
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

export default GallerySection;