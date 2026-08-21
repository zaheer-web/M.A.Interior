import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Yaha apni image import karo (path apne folder structure ke hisab se adjust karo)
import im1 from "../img/architecture/n39.jpeg";

const ServiceShowcase = () => {
  return (
    <section className="relative py-15 bg-black text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center px-6">

        {/* IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-2xl shadow-2xl"
        >
          <img
            src={im1}
            alt="Architecture Design"
            className="w-full h-full object-cover hover:scale-110 transition duration-700"
          />
        </motion.div>


        {/* CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Architectural <span className="text-yellow-500">Design</span>
          </h2>

          <p className="text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
            Architecture is more than just structure — it’s an experience.
            Our designs merge functionality with timeless aesthetics,
            ensuring every project reflects both beauty and purpose.
            We craft spaces that inspire, perform efficiently and stand
            strong for generations.
          </p>
          <Link to="/gallery-grid">


          <div className="flex justify-center md:justify-start">
            <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
              View Projects
            </button>
          </div>
          </Link>

        </motion.div>

      </div>

    </section>
  );
};

export default ServiceShowcase;