import { motion } from "framer-motion";

export default function AIBrain() {
  return (
    <div className="relative w-[260px] h-[260px] flex items-center justify-center">
      {/* outer pulse rings */}
      <motion.div
        className="absolute w-full h-full rounded-full border border-cyan-400/30"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border border-cyan-300/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* brain core */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_40px_rgba(34,211,238,0.6)]"
      />

      {/* neural nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-cyan-300"
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 12}%`,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}
