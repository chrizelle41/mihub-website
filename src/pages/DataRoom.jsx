import { ScrollToTopLink } from "../components/ScrollToTopLink";
import { motion } from "framer-motion";

export default function DataRoom() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#05070A] via-[#0A0F18] to-[#05070A] pt-32 pb-24 relative overflow-hidden text-white flex flex-col items-center justify-center">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#2385BE]/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3EBBFF]/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            text-4xl md:text-5xl font-extrabold mb-16
            bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
            text-transparent bg-clip-text
            drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]
          "
        >
          Data Room
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white/95 mb-8"
        >
          Coming soon…
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12"
        >
          Enquire for more information.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <ScrollToTopLink
            to="/contact"
            className="inline-block px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#1A8CFF] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#6FD2FF] transition-all shadow-[0_0_25px_rgba(56,189,248,0.25)]"
          >
            Get in touch
          </ScrollToTopLink>
        </motion.div>
      </div>
    </div>
  );
}
