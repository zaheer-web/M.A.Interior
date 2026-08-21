import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Trophy, Award, Medal, Star } from "lucide-react";

import "swiper/css";

const awards = [
  {
    number: "01",
    icon: <Trophy size={36} />,
    title: "Best Architectural Design",
    year: "2023",
    desc: "Recognized for outstanding architectural innovation and design excellence.",
  },
  {
    number: "02",
    icon: <Award size={36} />,
    title: "Interior Excellence Award",
    year: "2022",
    desc: "Awarded for exceptional interior design and space planning.",
  },
  {
    number: "03",
    icon: <Medal size={36} />,
    title: "Urban Design Recognition",
    year: "2021",
    desc: "Honored for contribution to sustainable urban development.",
  },
  {
    number: "04",
    icon: <Star size={36} />,
    title: "Client Choice Award",
    year: "2024",
    desc: "Recognized for delivering exceptional client satisfaction.",
  },
  {
    number: "05",
    icon: <Trophy size={36} />,
    title: "Innovation in Architecture",
    year: "2020",
    desc: "Awarded for creative and futuristic architectural concepts.",
  },
];

function Awards() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">

      {/* Glow Background */}

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >

          <h2 className="text-4xl md:text-5xl font-extrabold">
            Awards <span className="text-yellow-500">& Recognition</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Celebrating excellence in architecture, design innovation,
            and client satisfaction.
          </p>

        </motion.div>

        {/* Slider */}

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          autoplay={{ delay: 2500 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >

          {awards.map((award, index) => (

            <SwiperSlide key={index} className="pt-6">

              <motion.div
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3 }}
                className="group relative p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-500 transition overflow-hidden"
              >

                {/* Hover Glow */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-500/20 to-transparent"></div>

                <div className="relative z-10 text-center">

                  {/* Large Number */}

                 <span className="absolute top-1 right-2 text-6xl font-bold text-white/10 group-hover:text-yellow-500/20 transition pointer-events-none">
  {award.number}
</span>

                  {/* Icon */}

                  <div className="flex justify-center text-yellow-500 mb-6">
                    {award.icon}
                  </div>

                  {/* Title */}

                  <h3 className="text-xl font-semibold mb-1">
                    {award.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {award.year}
                  </p>

                  {/* Description */}

                  <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                    {award.desc}
                  </p>

                </div>

              </motion.div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
}

export default Awards;