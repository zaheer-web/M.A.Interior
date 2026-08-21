import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "S.B. Overseas",
    role: "Client",
    text: "Working with the architectural team was an excellent experience. Their designs perfectly balanced creativity and functionality.",
  },
  {
    name: "Dr. S.T. Hasan",
    role: "Member of Parliament",
    text: "The team delivered exceptional architectural design and professionalism. Highly recommended for innovative spaces.",
  },
  {
    name: "Fair Deal Overseas",
    role: "Client",
    text: "A highly professional team that understands client needs and delivers impressive design solutions.",
  },
  {
    name: "JACO Exports",
    role: "Client",
    text: "Outstanding architectural vision and attention to detail. We were extremely satisfied with the final outcome.",
  },
  {
    name: "MESCO International School",
    role: "Educational Institution",
    text: "Their planning and design approach helped create a modern and functional educational environment.",
  },
];

export default function OurClient() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-extrabold mb-10">
          Our <span className="text-yellow-500">Clients</span>
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500 }}
          pagination={{ el: ".custom-pagination", clickable: true }}
          loop
          centeredSlides
          spaceBetween={20}
          className="py-20 overflow-visible"
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >

          {testimonials.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center py-10"
            >
              {({ isActive }) => (
                <div
                  className={`w-[90%] sm:w-[320px] mx-auto flex flex-col justify-between items-center text-center p-10 rounded-2xl transition-all duration-500 backdrop-blur-md border border-white/10
                  
                  ${
                    isActive
                      ? "scale-105 bg-white/10 shadow-2xl border-yellow-500"
                      : "scale-95 bg-white/5 shadow-lg"
                  }`}
                >
                  <Quote className="text-yellow-500 mb-1" size={36} />

                  <p className="text-gray-300 italic text-sm leading-relaxed">
                    {item.text}
                  </p>

                  <div className="flex gap-1 text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>

                  <div className="w-14 h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center text-lg font-bold mt-6">
                    {item.name.charAt(0)}
                  </div>

                  <h4 className="mt-3 font-semibold text-white">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-400">
                    {item.role}
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}

        </Swiper>

        <div className="custom-pagination mt-2"></div>

      </div>
    </section>
  );
}