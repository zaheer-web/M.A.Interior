import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Yaha apni image import karo (path apne folder structure ke hisab se adjust karo)
import im1 from "../img/im9.png";

const ParallaxSection = () => {
  return (

    <section
      className="relative h-[600px] flex items-center justify-center text-center text-white bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `url(${im1})`
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>

      <motion.div
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.7 }}
        className="relative z-10 max-w-2xl px-6"
      >

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Luxury Interior Design
        </h2>

        <p className="text-gray-300 mb-8">
          We design elegant interiors that combine beauty, comfort and functionality.
        </p>
        <Link to="/contact-form">

        <button className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
          Start Your Project
        </button>
        </Link>

      </motion.div>

    </section>

  );
};

export default ParallaxSection;