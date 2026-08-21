import { motion } from "framer-motion";

export default function ConsultantHero7() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">

      {/* Background glow shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
        >
          Ready to <span className="text-yellow-500">Transform</span> Your Space?
        </motion.h2>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-gray-300 mb-10 text-lg max-w-xl mx-auto"
        >
          Let our interior experts design a stunning and functional
          space tailored perfectly for your lifestyle.
        </motion.p>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919411096122"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 rounded-lg font-semibold text-black bg-yellow-500 hover:bg-yellow-400 transition duration-300 shadow-lg"
          >
            Get Free Consultation
          </motion.button>
        </a>

      </div>
    </section>
  );
}