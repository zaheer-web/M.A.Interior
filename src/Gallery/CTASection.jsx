import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (

    <section className="relative py-10 bg-black text-white overflow-hidden">

      {/* Glow Background */}

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto px-6 text-center"
      >

        {/* Glass Card */}

        <motion.div
          variants={item}
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-14 shadow-2xl"
        >

          {/* Heading */}

          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Love Our <span className="text-yellow-500">Work?</span>
          </motion.h2>

          {/* Text */}

          <motion.p
            variants={item}
            className="text-gray-300 text-lg max-w-xl mx-auto mb-10"
          >
            Let's design your dream space together and bring your vision
            to life with innovative architecture and interior design.
          </motion.p>

          {/* Button */}
          <Link to="/contact-form">



          <motion.button
            variants={item}
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 25px rgba(234,179,8,0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-black px-10 py-4 rounded-xl font-semibold shadow-lg hover:bg-yellow-400 transition"
          >
            Get Free Consultation
          </motion.button>
          </Link>

        </motion.div>

      </motion.div>

    </section>

  );
};

export default CTASection;