import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Apni images yaha import karo — jitni chahiye utni add kar lo
import n1 from "../img/Landscape/na1.jpeg";
import n2 from "../img/Landscape/na2.jpeg";
import n3 from "../img/Landscape/na3.jpeg";
import n4 from "../img/Landscape/na4.jpeg";
import n5 from "../img/Landscape/na5.jpeg";
import n6 from "../img/Landscape/na6.jpeg";
import n7 from "../img/Landscape/na7.jpeg";
import n8 from "../img/Landscape/na8.jpeg";
import n9 from "../img/Landscape/na9.jpeg";
import n10 from "../img/Landscape/na10.jpeg";
import n11 from "../img/Landscape/na11.jpeg";
import n12 from "../img/Landscape/na12.jpeg";
import n13 from "../img/Landscape/na13.jpeg";
import n14 from "../img/Landscape/na14.jpeg";
import n15 from "../img/Landscape/na15.jpeg";
import n16 from "../img/Landscape/na16.jpeg";
import n17 from "../img/Landscape/na17.jpeg";
import n18 from "../img/Landscape/na18.jpeg";
import n19 from "../img/Landscape/na19.jpeg";
import n20 from "../img/Landscape/n20.jpeg";
import n21 from "../img/Landscape/n21.jpeg";
import n22 from "../img/Landscape/n22.jpeg";
import n23 from "../img/Landscape/n23.jpeg";


const portfolioImages = [n1, n2, n3, n4, n5, n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17,n18,n19,n20,n21,n22,n23];

export default function Landscape() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isOpen = selectedIndex !== null;

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? portfolioImages.length - 1 : prev - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === portfolioImages.length - 1 ? 0 : prev + 1
    );
  }, []);

  const closeLightbox = () => setSelectedIndex(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showPrev, showNext]);

  return (
    <section className="relative py-16 sm:py-20 bg-black text-white overflow-hidden min-h-screen">

      {/* Glow Background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-500/20 blur-[100px] sm:blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-400/20 blur-[100px] sm:blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14"
        >
         
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portfolioImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500 transition cursor-pointer"
            >
              <img
                src={img}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-52 sm:h-64 object-cover group-hover:scale-110 transition duration-500"
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-yellow-500 transition z-10"
            >
              <X size={28} className="sm:hidden" />
              <X size={32} className="hidden sm:block" />
            </button>

            {/* Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white hover:text-yellow-500 transition z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-3"
            >
              <ChevronLeft size={22} className="sm:hidden" />
              <ChevronLeft size={32} className="hidden sm:block" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white hover:text-yellow-500 transition z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-3"
            >
              <ChevronRight size={22} className="sm:hidden" />
              <ChevronRight size={32} className="hidden sm:block" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                src={portfolioImages[selectedIndex]}
                alt={`Portfolio ${selectedIndex + 1}`}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[75vh] sm:max-h-[85vh] max-w-[90%] sm:max-w-[80%] rounded-xl object-contain"
              />
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-gray-300 text-xs sm:text-sm bg-white/10 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {portfolioImages.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}