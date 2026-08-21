import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Plus
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {

  const [open, setOpen] = useState(false);

  return (
    <>

      {/* FLOATING SOCIAL BUTTON */}

      <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-3">

        {open && (
          <>
            <a
              href="https://wa.me/919411096122"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <MessageCircle size={22}/>
            </a>

            <a
              href="https://www.instagram.com/m_a_architects_n_assoc?igsh=MWgwamF1YTc3djZwcw=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <Instagram size={22}/>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100066476327162&sk=followers"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <Facebook size={22}/>
            </a>
          </>
        )}

        <button
          onClick={()=>setOpen(!open)}
          className="bg-yellow-500 text-black p-4 rounded-full shadow-xl hover:scale-110 transition"
        >
          <Plus size={22}/>
        </button>

      </div>


      {/* FOOTER */}

      <footer className="relative bg-[#0b0b0b] text-gray-400 pt-10 pb-10 overflow-hidden">

        {/* Glow Background */}
        <div className="absolute -top-24 left-0 w-96 h-96 bg-yellow-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 blur-[140px] rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">

          {/* Company Info */}

          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6 }}
          >

            <h2 className="text-2xl font-bold text-white mb-4">
              Interior <span className="text-yellow-500">Studio</span>
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              We design elegant and functional interior spaces for homes and
              businesses. Our goal is to transform ideas into timeless designs.
            </p>

            {/* Social Icons */}

            <div className="flex justify-center md:justify-start gap-4 mt-6">

              <a
                href="https://www.facebook.com/profile.php?id=100066476327162&sk=followers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
              >
                <Facebook size={18}/>
              </a>

              <a
                href="https://www.instagram.com/m_a_architects_n_assoc?igsh=MWgwamF1YTc3djZwcw=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
              >
                <Instagram size={18}/>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
              >
                <Linkedin size={18}/>
              </a>

            </div>

          </motion.div>


          {/* Quick Links */}

          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.7 }}
          >

            <h3 className="text-white font-semibold text-lg mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/" className="hover:text-yellow-500 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-yellow-500 transition">
                  About
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-yellow-500 transition">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/gallery" className="hover:text-yellow-500 transition">
                  Gallery
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-yellow-500 transition">
                  Contact
                </Link>
              </li>

            </ul>

          </motion.div>


          {/* Services */}

          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.8 }}
          >

            <h3 className="text-white font-semibold text-lg mb-6">
              Our Services
            </h3>

            <ul className="space-y-3">

              <li className="hover:text-yellow-500 transition">
                Landscape Design
              </li>

              <li className="hover:text-yellow-500 transition">
                Architecture
              </li>

              <li className="hover:text-yellow-500 transition">
                3D visualisation
              </li>

              <li className="hover:text-yellow-500 transition">
               Urbanism
              </li>

              <li className="hover:text-yellow-500 transition">
               Interior Design
              </li>

            </ul>

          </motion.div>


          {/* Contact */}

          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.9 }}
          >

            <h3 className="text-white font-semibold text-lg mb-6">
              Contact Us
            </h3>

            <div className="space-y-4">

              <a
                href="tel:+919411096122"
                className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-500 transition"
              >
                <Phone size={18}/>
                <span>+91-9411096122</span>
              </a>

              <a
  onClick={() =>
    (window.location.href =
      "mailto:mohdaslam700@gmail.com?subject=Interior%20Design%20Inquiry&body=Hello%2C%20I%20want%20to%20know%20about%20your%20interior%20design%20services.")
  }
  className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-500 transition cursor-pointer"
>
  <Mail size={18} />
  <span>mohdaslam700@gmail.com</span>
</a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=25+Avas+Vikas+Civil+Lines+Moradabad+244001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 hover:text-yellow-500 transition"
              >
                <MapPin size={18}/>
                <span>
                  25, Avas Vikas, Civil Lines, Moradabad-244001
                </span>
              </a>

            </div>

          </motion.div>

        </div>


        {/* Bottom Footer */}

        <div className="relative border-t border-white/10 mt-16 pt-6 text-center text-gray-500">

          <p>
            © {new Date().getFullYear()} Interior Studio. All Rights Reserved.
          </p>

        </div>

      </footer>

    </>
  );
}