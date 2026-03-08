import { motion } from "framer-motion";

export default function PropertyManagement() {
  const features = [
    "MiHub SPOG – a Single Pane Of Glass on all your key data.",
    "Digital O&Ms – all of your operations and maintenance manuals for your onsite FM team, all together, in one place. AI enabled.",
    "Data dashboards – see exactly the data you want to know, when you need to know it.",
    "AI enabled Predictive Maintenance analysis – in time, MiHub’s AI will learn your building, learn its performance patterns and will predict failures before they happen.",
    "AI enabled query tool – Speak to your building and ask it what you want to know. AI enabled.",
    "BMS and EMS integration – pull key data from your BMS and EMS directly onto your MiHub data dashboard.",
    "Damp and Mould monitoring – working with ZapCarbon, get remote damp and mould monitoring on your confidential dashboard.",
    "Data room – MiHub automatically creates a constantly evolving data room for your building. Blockchain-enabled accuracy for TDD.",
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#05070A] via-[#0A0F18] to-[#05070A] text-white pt-32 pb-40 px-6">
      {/* PAGE TITLE */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold 
            bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
            text-transparent bg-clip-text"
        >
          MiHub Property Management
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-2xl md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto"
        >
          MiHub’s property management apps are award winners. Residential,
          office space, retail, data centres, infrastructures, schools, hotels —
          all benefit from MiHub.
        </motion.p>
      </section>

      {/* STORY SCROLL SECTIONS */}
      <section className="max-w-6xl mx-auto space-y-40">
        {features.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-[#38BDF8] tracking-wide mb-6"
              >
                {text.split("–")[0].trim()}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/80 leading-relaxed"
              >
                {text.substring(text.indexOf("–") + 1).trim()}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
