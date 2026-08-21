import { motion } from "framer-motion";


const steps = [
  {
    title: "Consultation",
    desc: "We understand your space, requirements, and design preferences.",
  },
  {
    title: "Design Planning",
    desc: "Our team creates a personalized layout and concept design.",
  },
  {
    title: "3D Visualization",
    desc: "We show you realistic 3D previews before execution.",
  },
  {
    title: "Execution",
    desc: "Our experts bring the design to life with quality materials.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export default function ProcessHero6() {
  return (
    <section className="py-10 bg-gradient-to-b from-black via-gray-900 to-black text-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Our <span className="text-yellow-500">Design Process</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            From concept to completion, we follow a structured process
            to deliver stunning interior designs.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ y: -12, scale: 1.03 }}
              className="relative p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl group overflow-hidden text-center md:text-left"
            >

              {/* Glow Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Step number */}
              <div className="text-6xl font-extrabold text-white/10 mb-6">
                0{index + 1}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mx-auto md:mx-0">
                {step.desc}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-500 group-hover:w-full transition-all duration-500"></div>

            </motion.div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}