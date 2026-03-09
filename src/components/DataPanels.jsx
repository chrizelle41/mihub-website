import { motion } from "framer-motion";

const panels = [
  { title: "Energy Usage", value: "87%" },
  { title: "IoT Sensors", value: "1,240" },
  { title: "Maintenance Alerts", value: "4" },
  { title: "Security Events", value: "2" },
];

export default function DataPanels() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {panels.map((panel, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 backdrop-blur-md border border-cyan-400/20 rounded-xl p-4 text-center w-36"
          style={{
            top: `${20 + i * 18}%`,
            left: i % 2 === 0 ? "5%" : "80%",
          }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6 + i, repeat: Infinity }}
        >
          <p className="text-xs text-cyan-300">{panel.title}</p>
          <p className="text-lg font-bold text-white">{panel.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
