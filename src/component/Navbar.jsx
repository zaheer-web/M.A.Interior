import { useState, useEffect } from "react";
import { Menu, X, Plus } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/MA_logo1.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500 border-b-2 border-yellow-500 pb-1"
      : "text-gray-300 hover:text-yellow-500 transition";

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="AARCHI Logo"
            className="h-20 w-auto invert"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 font-semibold">
          <NavLink to="/" className={navLinkClass}>
            HOME
          </NavLink>

          <NavLink to="/services" className={navLinkClass}>
            SERVICES
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            ABOUT
          </NavLink>

          <NavLink to="/gallery" className={navLinkClass}>
            GALLERY
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            CONTACT
          </NavLink>
        </ul>

        {/* Desktop WhatsApp Button */}
        <a
          href="https://wa.me/919411096122?text=Hello%2C%20I%20want%20interior%20design%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            GET STARTED
            <Plus size={18} />
          </motion.button>
        </a>

        {/* Hamburger */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.25 }}
          className="md:hidden bg-black border-t border-white/10"
        >
          <ul className="flex flex-col gap-6 p-6 font-semibold">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              HOME
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              SERVICES
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              ABOUT
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              GALLERY
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              CONTACT
            </NavLink>

            {/* Mobile WhatsApp Button */}
            <a
              href="https://wa.me/919411096122?text=Hello%2C%20I%20want%20interior%20design%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-4"
            >
              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                GET STARTED
                <Plus size={18} />
              </button>
            </a>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}