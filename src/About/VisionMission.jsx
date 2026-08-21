import React from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

const data = [
  {
    number: "01",
    title: "Our Vision",
    icon: <Eye size={28} />,
    desc: "Our vision is to create innovative and sustainable architectural spaces that combine modern aesthetics with functionality. We aim to design environments that inspire people and create a strong connection between architecture and everyday life."
  },
  {
    number: "02",
    title: "Our Mission",
    icon: <Target size={28} />,
    desc: "Our mission is to deliver high-quality architectural solutions through creativity, collaboration, and attention to detail. We work closely with our clients to transform their vision into functional, beautiful, and cost-effective spaces."
  }
];

export default function VisionMission() {
  return (

    <section className="relative py-15 bg-black text-white overflow-hidden">

      {/* Glow Background */}

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >

          <h2 className="text-4xl md:text-5xl font-extrabold">
            Our <span className="text-yellow-500">Vision & Mission</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            We believe architecture should create meaningful spaces that inspire
            people and improve everyday life.
          </p>

        </motion.div>


        {/* Grid */}

        <div className="grid md:grid-cols-2 gap-8">

          {data.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-500 transition overflow-hidden"
            >

              {/* Hover Glow */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-500/20 to-transparent"></div>

              <div className="relative z-10">

                {/* Number */}

                <span className="absolute top-6 right-6 text-6xl font-bold text-white/10 group-hover:text-yellow-500/20 transition">
                  {item.number}
                </span>

                {/* Icon */}

                <div className="mb-5 text-yellow-500">
                  {item.icon}
                </div>

                {/* Title */}

                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );
}