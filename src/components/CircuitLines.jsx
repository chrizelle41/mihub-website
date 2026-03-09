import { motion } from "framer-motion";

export default function CircuitLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 800 600"
      fill="none"
    >
      <motion.path
        d="M0 100 H300 V200 H600 V400 H800"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeDasharray="10 10"
        animate={{ strokeDashoffset: [0, -100] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      />
      <motion.path
        d="M100 500 V300 H400 V150 H700"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeDasharray="10 10"
        animate={{ strokeDashoffset: [0, -120] }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </svg>
  );
}
