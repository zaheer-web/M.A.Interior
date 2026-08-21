import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

import img1 from "../img/im27.jpeg";

function AboutPage() {
  return (
    <section className="relative py-28 bg-black text-white overflow-hidden">

      {/* Background Number */}
      <h1 className="absolute text-[220px] md:text-[320px] font-extrabold text-white/[0.03] top-10 left-10 select-none">
        01
      </h1>

      {/* Accent Line */}
      <div className="absolute left-0 top-0 h-full w-[4px] bg-yellow-500"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="overflow-hidden rounded-xl shadow-2xl">

            <img
              src={img1}
              alt="Architecture Design"
              className="w-[420px] md:w-[500px] h-[520px] object-cover hover:scale-110 transition duration-700"
            />

          </div>
        </motion.div>


        {/* CONTENT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >

          {/* Small Label */}
          <p className="text-yellow-500 uppercase tracking-[5px] text-sm mb-6">
            Our Story
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Designing Spaces <br /> That Inspire Living
          </h2>

          {/* Tagline */}
          <p className="mt-6 text-xl font-semibold text-yellow-500">
            Innovative architecture driven by creativity, functionality, and timeless design.
          </p>

          {/* Paragraph 1 */}
          <p className="mt-8 text-gray-300 leading-relaxed text-lg max-w-xl mx-auto lg:mx-0">
            M.A. Architects & Associates is a leading architectural and design 
            studio based in Moradabad with over 10 years of professional 
            experience in delivering innovative and functional design solutions. 
            Our services include architecture, master planning, urban design, 
            landscape planning, and interior design, offering clients a complete 
            range of services from concept development to project execution.
          </p>

          {/* Paragraph 2 */}
          <p className="mt-5 text-gray-300 leading-relaxed text-lg max-w-xl mx-auto lg:mx-0">
            At M.A. Architects & Associates, we believe that architecture is not 
            just about constructing buildings — it is about creating meaningful 
            spaces that enhance the way people live, work, and interact. Our 
            approach blends modern aesthetics with practical functionality while 
            maintaining close collaboration with clients and consultants to 
            ensure every project reflects quality, innovation, and long-term value.
          </p>


          {/* Bottom Info */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-10 mt-12">

            {/* Experience */}
            <div>
              <h3 className="text-5xl font-bold text-yellow-500">
                10+
              </h3>

              <p className="text-gray-400">
                Years Experience
              </p>
            </div>


            {/* Hotline */}
            <div className="flex items-center gap-4">

              <div className="bg-yellow-500 p-4 text-black rounded-full">
                <Phone size={20} />
              </div>

              <div className="text-left">
                <p className="font-semibold text-lg">
                  Hotline 24/7
                </p>

                <p className="text-gray-400">
                  +91-9411096122
                </p>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default AboutPage;