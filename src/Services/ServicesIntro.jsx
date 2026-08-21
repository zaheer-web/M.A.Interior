import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const points = [
  "Innovative architectural concepts tailored to each project.",
  "Modern interior design balancing aesthetics and functionality.",
  "Sustainable and site-responsive design solutions.",
  "Efficient space planning for maximum comfort and usability.",
  "High-quality execution with attention to every detail.",
  "Creative designs that elevate lifestyle and productivity."
];

const ServicesIntro = () => {
  return (
    <section className="relative py-15 bg-black text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold tracking-wide"
        >
          WHAT WE <span className="text-yellow-500">DO</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-gray-300 leading-relaxed max-w-3xl mx-auto"
        >
          At M.A. Architects & Associates, we deliver thoughtful architecture,
          innovative interiors, and visionary urban design solutions. Our
          approach blends science, creativity, and functionality to create
          spaces that inspire and elevate lifestyles.
        </motion.p>

        {/* Points Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">

          {points.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >

              <div className="bg-yellow-500 text-black p-2 rounded-full mt-1">
                <CheckCircle size={18}/>
              </div>

              <p className="text-gray-400 leading-relaxed">
                {item}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default ServicesIntro;