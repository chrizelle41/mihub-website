import { ScrollToTopLink } from "./ScrollToTopLink";
import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-br from-[#2385BE] to-[#4FB4DE] text-white py-16 px-6 mt-0">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ---------- LEFT: LINKS ---------- */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><ScrollToTopLink to="/terms" className="hover:underline">Terms & Conditions</ScrollToTopLink></li>
            <li><ScrollToTopLink to="/privacy" className="hover:underline">Privacy Policy</ScrollToTopLink></li>
            <li><ScrollToTopLink to="/contact" className="hover:underline">Contact</ScrollToTopLink></li>
          </ul>
        </div>

        {/* ---------- MIDDLE: ADDRESS ---------- */}
        <div>
          <h3 className="text-xl font-bold mb-4">MiHub</h3>
          <p>Seebeck House, 1 Seebeck Place</p>
          <p>Davy Avenue, Knowlhill</p>
          <p>Milton Keynes</p>
          <p>MK5 8FR</p>

          <p className="mt-4 font-semibold">info@mihub.ai</p>
        </div>

        {/* ---------- RIGHT: SOCIALS ---------- */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect</h3>

          <div className="flex items-center gap-6">

            {/* Email icon */}
            <a
              href="mailto:info@mihub.ai"
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              title="Email MiHub"
            >
              <Mail size={22} />
            </a>

            {/* LinkedIn icon */}
            <a
              href="https://www.linkedin.com/company/mihub-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all"
              title="MiHub on LinkedIn"
            >
              <Linkedin size={22} />
            </a>

          </div>
        </div>
      </div>

      {/* ---------- BOTTOM COPYRIGHT ---------- */}
      <p className="text-center text-sm mt-12 opacity-80">
        © {new Date().getFullYear()} MiHub.ai — All Rights Reserved.
      </p>
    </footer>
  );
}
