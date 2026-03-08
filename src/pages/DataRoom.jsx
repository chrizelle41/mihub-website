import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function DataRoom() {
  const [search, setSearch] = useState("");

  const items = []; // No content yet

  const filteredItems = items.filter((item) => {
    return (
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.desc?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#05070A] via-[#0A0F18] to-[#05070A] pt-32 pb-24 relative overflow-hidden text-white">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#2385BE]/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3EBBFF]/20 blur-3xl rounded-full" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            text-4xl md:text-5xl font-extrabold 
            text-center mb-10
            bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
            text-transparent bg-clip-text
            drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]
          "
        >
          Data Room
        </motion.h1>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full mb-16"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

          <input
            type="text"
            placeholder="Search documents, topics or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-12 pr-4 py-3 rounded-full 
              bg-[#0C1118] text-white
              border border-white/10
              placeholder-white/40
              shadow-[0_0_20px_rgba(56,189,248,0.12)]
              focus:ring-2 ring-[#38BDF8] outline-none
            "
          />
        </motion.div>

        {/* EMPTY STATE MESSAGE */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              text-white/70 text-center
              max-w-2xl mx-auto
              leading-relaxed text-lg
            "
          >
            A constantly updating data room for your building.
            <br />
            <br />
            Every document, drawing, log, sensor reading, and report,
            automatically organised, securely stored, and continuously
            refreshed.
          </motion.div>
        )}
      </div>
    </div>
  );
}
