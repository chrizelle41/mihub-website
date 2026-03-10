import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Wrench,
  MessageCircle,
  Cpu,
  Droplets,
  FolderLock,
} from "lucide-react";

const features = [
  {
    title: "MiHub SPOG",
    description:
      "a Single Pane Of Glass on all your key data.",
    icon: LayoutDashboard,
  },
  {
    title: "Digital O&Ms",
    description:
      "all of your operations and maintenance manuals for your onsite FM team, all together, in one place. AI enabled.",
    icon: BookOpen,
  },
  {
    title: "Data dashboards",
    description:
      "see exactly the data you want to know, when you need to know it.",
    icon: BarChart3,
  },
  {
    title: "AI enabled Predictive Maintenance analysis",
    description:
      "in time, MiHub's AI will learn your building, learn its performance patterns and will predict failures before they happen.",
    icon: Wrench,
  },
  {
    title: "AI enabled query tool",
    description:
      "Speak to your building and ask it what you want to know. AI enabled.",
    icon: MessageCircle,
  },
  {
    title: "BMS and EMS integration",
    description:
      "pull key data from your BMS and EMS directly onto your MiHub data dashboard.",
    icon: Cpu,
  },
  {
    title: "Damp and Mould monitoring",
    description:
      "working with ZapCarbon, get remote damp and mould monitoring on your confidential dashboard.",
    icon: Droplets,
  },
  {
    title: "Data room",
    description:
      "MiHub automatically creates a constantly evolving data room for your building. Blockchain-enabled accuracy for TDD.",
    icon: FolderLock,
  },
];

export default function PropertyManagement() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#05070A] via-[#0A0F18] to-[#05070A] text-white pt-32 md:pt-36 pb-20 px-4 sm:px-5 md:px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#2385BE]/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3EBBFF]/15 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* PAGE TITLE */}
        <section className="text-center mb-14 pt-2">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent pb-2 leading-tight"
            style={{
              filter: "drop-shadow(0 0 20px rgba(34,211,238,0.5)) drop-shadow(0 0 40px rgba(56,189,248,0.3))",
            }}
          >
            MiHub Property Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto"
          >
            MiHub's property management apps are award winners. Residential,
            office space, retail, data centres, infrastructures, schools, hotels —
            all benefit from MiHub.
          </motion.p>
        </section>

        {/* FEATURE CARDS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full">
          {features.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#38BDF8]/40 transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/15 flex items-center justify-center text-[#38BDF8] mb-4">
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-[#38BDF8] tracking-wide mb-2">
                {title}
              </h2>
              <p className="text-white/75 leading-relaxed text-sm flex-1">
                {description}
              </p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
