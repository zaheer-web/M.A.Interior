import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Sofa, Box, Trees, Map } from "lucide-react";
import architecturalDesign from "../img/architecture/n44.jpeg";
import interiorDesign from "../img/Interior/ba1.jpeg";
import visualization3D from "../img/3D Visualization/n31.jpeg";
import landscapeDesign from "../img/Landscape/n23.jpeg";
import urbanPlanning from "../img/Urban/n35.jpeg";
import projectManagement from "../img/architecture/n38.jpeg";

const services = [
  {
    number: "01",
    title: "Architectural Design",
    path: "/architectural-design",
    icon: <Building2 size={28} />,
    image: architecturalDesign,
    desc: "Architecture is more than structure. We design spaces that combine functionality, creativity and modern aesthetics.",
  },
  {
    number: "02",
    title: "Interior Design",
    path: "/interior-design",
    icon: <Sofa size={28} />,
    image: interiorDesign,
    desc: "Interior design creates harmony between furniture, lighting and space to deliver comfortable living environments.",
  },
  {
    number: "03",
    title: "3D Visualization",
    path: "/3d-visualization",
    icon: <Box size={28} />,
    image: visualization3D,
    desc: "Our 3D visualization allows clients to see realistic previews of their projects before execution.",
  },
  {
    number: "04",
    title: "Landscape Design",
    path: "/landscape-design",
    icon: <Trees size={28} />,
    image: landscapeDesign,
    desc: "Landscape design enhances architecture by creating beautiful outdoor environments.",
  },
  {
    number: "05",
    title: "Urban Planning",
    path: "/urban-planning",
    icon: <Map size={28} />,
    image: urbanPlanning,
    desc: "Urban planning focuses on building sustainable cities and well designed communities.",
  },
  {
    number: "06",
    title: "Project Management",
    path: "/project-management",
    icon: <Building2 size={28} />,
    image: projectManagement,
    desc: "We manage projects from concept to completion ensuring quality and efficiency.",
  },
];

export default function OurService() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[140px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Our <span className="text-yellow-500">Services</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            We deliver innovative architectural and interior solutions
            that combine creativity, technology and functionality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link
                to={service.path}
                className="relative block rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-500 transition overflow-hidden text-center md:text-left cursor-pointer"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-500/20 to-transparent pointer-events-none"></div>

                <div className="relative z-10 p-10">
                  <span className="absolute top-1 right-6 text-6xl font-bold text-white/10 group-hover:text-yellow-500/20 transition">
                    {service.number}
                  </span>
                  <div className="mb-5 text-yellow-500 flex justify-center md:justify-start">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                    {service.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}