import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false); // MOBILE DROPDOWN
  const [hoverSolutions, setHoverSolutions] = useState(false); // DESKTOP DROPDOWN

  const solutionLinks = [
    { name: "Construction", path: "/construction" },
    { name: "Residential", path: "/residential" },
    { name: "Property Management", path: "/property-management" },
  ];

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Why MiHub", path: "/why-mihub" },
    { name: "Data Room", path: "/dataroom" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full min-w-[320px] z-[200] transition-all ${
          scrolled
            ? "bg-[#0C1118]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
            : "bg-[#0C1118]/60 backdrop-blur-xl border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img src={logo} alt="MiHub Logo" className="h-10 w-auto" />
            <span
              className="font-extrabold text-2xl tracking-wide 
              bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
              bg-clip-text text-transparent group-hover:opacity-80 transition"
            >
              MiHub
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden min-[1047px]:flex items-center gap-10">
            {/* MAIN LINKS */}
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={`font-medium text-base transition-all ${
                      isActive
                        ? "text-[#38BDF8]"
                        : "text-white/70 group-hover:text-[#38BDF8]"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* ACTIVE UNDERLINE */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-[3px] 
                        bg-[#38BDF8] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                    />
                  )}
                </li>
              );
            })}

            {/* SOLUTIONS DROPDOWN */}
            <li
              className="relative group"
              onMouseEnter={() => setHoverSolutions(true)}
              onMouseLeave={() => setHoverSolutions(false)}
            >
              <button className="flex items-center gap-1 font-medium text-base text-white/80 hover:text-[#38BDF8] transition">
                Solutions
                <ChevronDown size={16} className="mt-px" />
              </button>

              <AnimatePresence>
                {hoverSolutions && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-8 left-0 bg-[#0C1118] border border-white/10 
                    shadow-lg rounded-lg w-56 py-3 z-[999] backdrop-blur-xl"
                  >
                    {solutionLinks.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="block px-4 py-2 text-white/80 hover:text-[#38BDF8] 
                          hover:bg-white/5 transition rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* CONTACT BUTTON */}
            <li>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
                    text-white px-6 py-2.5 rounded-full font-semibold 
                    shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                  Contact Us
                </motion.button>
              </Link>
            </li>
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            className="min-[1047px]:hidden text-white"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[199]"
              onClick={() => setMenuOpen(false)}
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-64 h-full 
                bg-[#0C1118] p-6 border-l border-white/10 
                shadow-[0_0_30px_rgba(56,189,248,0.2)] z-[200] flex flex-col"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setMenuOpen(false)}>
                  <X size={28} className="text-white" />
                </button>
              </div>

              <ul className="flex flex-col gap-6">
                {/* HOME / WHY MIHUB / DATA ROOM */}
                {mainLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-lg ${
                        location.pathname === link.path
                          ? "text-[#38BDF8]"
                          : "text-white/80 hover:text-[#38BDF8]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* MOBILE SOLUTIONS ACCORDION */}
                <li>
                  <button
                    onClick={() => setSolutionsOpen((p) => !p)}
                    className="flex items-center justify-between w-full text-lg text-white/80 hover:text-[#38BDF8]"
                  >
                    Solutions
                    <ChevronDown
                      className={`transition-transform ${
                        solutionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {solutionsOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 mt-2 flex flex-col gap-3"
                      >
                        {solutionLinks.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className="text-white/70 hover:text-[#38BDF8]"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                {/* CONTACT */}
                <li>
                  <Link
                    to="/contact"
                    className="text-lg text-white/80 hover:text-[#38BDF8]"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
