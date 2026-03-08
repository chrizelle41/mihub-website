import { motion } from "framer-motion";

import vv from "../assets/vv.png";
import dome from "../assets/dome.jpg";
import landsec from "../assets/landsec.png";
import bouygues from "../assets/bouygues.png";
import hays from "../assets/hays.png";

export default function WhyMiHub() {
  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-[#05070A] via-[#0A0F18] to-[#05070A] text-white relative">
      {/* GLOBAL BACKGROUND BLOBS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#2385BE]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-[#38BDF8]/20 rounded-full blur-3xl"></div>

      {/* ====================================================== */}
      {/*                        HERO HEADER                    */}
      {/* ====================================================== */}
      <section className="relative w-full pt-[22vh] pb-[18vh] px-6 overflow-hidden">
        {/* Soft Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#1A8CFF]/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[500px] h-[500px] bg-[#38BDF8]/20 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight
              bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
              bg-clip-text text-transparent"
          >
            Why MiHub?
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "150px" }}
            transition={{ duration: 0.7 }}
            className="h-[4px] bg-[#38BDF8] mx-auto mt-4 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="mt-6 text-lg md:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto"
          >
            Discover what sets MiHub apart and why leading developers,
            operators, and global companies choose us.
          </motion.p>
        </div>
      </section>

      {/* ====================================================== */}
      {/*            WHAT MAKES MIHUB DIFFERENT                 */}
      {/* ====================================================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-14">
          {[
            "MiHub makes things cheaper, quicker and more efficient, we are focussing on bringing real, measurable benefit rather than adding yet another layer of process to an already taxed industry.",
            "MiHub has developed a unique platform that features a range of applications intertwined in to a suite of apps, that run right across the entire construction and operations phases of a building, a cradle to completion service that you can’t find anywhere else.",
            "MiHub is the partner of choice as it is the only platform where you can get a complete solution. MiHub works with legacy suppliers along the way to ensure continuity and a seamless adoption of the MiHub platform.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-4xl mx-auto"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ====================================================== */}
      {/*             PROUD TO HAVE WORKED WITH                 */}
      {/* ====================================================== */}
      <section className="py-28 px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-16
            bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
            text-transparent bg-clip-text"
        >
          Proud to Have Worked With
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {[vv, dome, landsec, bouygues, hays].map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0C1118] w-full h-32 md:h-36 shadow-[0_0_20px_rgba(56,189,248,0.15)]
                rounded-xl flex items-center justify-center p-4 
                border border-white/10 hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]
                transition-all"
            >
              <img
                src={logo}
                alt="Partner Logo"
                className="max-h-full max-w-[80%] object-contain opacity-90 hover:opacity-100 transition"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====================================================== */}
      {/*                     BENEFITS SECTION                  */}
      {/* ====================================================== */}
      <section className="py-24 px-6 relative z-10">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-12
          bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
          bg-clip-text text-transparent"
        >
          What Are the Benefits?
        </h2>

        <p className="text-center text-white/60 max-w-3xl mx-auto mb-16 text-lg">
          Our platform delivers measurable value across multiple cost
          categories. Below is an example of how MiHub can significantly reduce
          expenditure.
        </p>

        {/* BENEFIT CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { label: "CGI – Costs", before: "£3,500", after: "£2,600" },
            {
              label: "Off-plan Sales App",
              before: "£55,000",
              after: "£25,000",
            },
            {
              label: "Digital Occupier User Guide",
              before: "£65,000",
              after: "£30,000",
            },
            { label: "Community App", before: "£60,000", after: "£20,000" },
            {
              label: "Animations (35% discount)",
              before: "£22,500",
              after: "£12,000",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-[#0C1118] border border-white/10
                shadow-[0_0_25px_rgba(56,189,248,0.15)]"
            >
              <h3 className="text-xl font-semibold text-white">{item.label}</h3>

              <div className="mt-4">
                <p className="text-white/50 line-through">
                  Typical: {item.before}
                </p>
                <p className="text-[#38BDF8] font-bold text-xl">
                  With MiHub: {item.after}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold">
            Overall Saving: <span className="text-[#38BDF8]">£125,900</span>
          </h3>
        </motion.div>
      </section>

      {/* ====================================================== */}
      {/*                    DIGITAL TWIN SECTION                */}
      {/* ====================================================== */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold
              bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
              bg-clip-text text-transparent"
          >
            A Valuable Asset: Your Digital Twin
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            MiHub empowers teams across technical and non-technical disciplines
            to access BIM and asset data instantly. No more specialist software,
            no more lengthy training — everything you need is visual,
            interactive, and accessible through one intelligent interface.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            In partnership with Dome Group, MiHub delivered a modern building
            information experience for a major hotel development — showcasing
            key services, O&M data, and MEP components in a way that is
            intuitive for operators, buyers, and stakeholders.
          </motion.p>
        </div>
      </section>

      {/* ====================================================== */}
      {/*                     THE FUTURE OF MIHUB                */}
      {/* ====================================================== */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold
              bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
              bg-clip-text text-transparent"
          >
            The Future of MiHub
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            MiHub is evolving into a self-maintaining ecosystem powered by AI.
            From automated data validation to predictive maintenance and
            compliance alerts, MiHub will soon monitor building health without
            manual intervention.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            Automated EPC generation will ensure every building can access
            accurate, up-to-date ratings instantly — all generated from the
            living data inside MiHub.
          </motion.p>
        </div>
      </section>

      {/* ====================================================== */}
      {/*                   IMAGINE WHAT’S POSSIBLE               */}
      {/* ====================================================== */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold
              bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
              bg-clip-text text-transparent"
          >
            Imagine What’s Possible
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            From personalised home configuration to AR/VR building walkthroughs
            and immersive training, MiHub unlocks digital experiences that
            extend far beyond construction — shaping the next generation of
            asset management and customer engagement.
          </motion.p>
        </div>
      </section>

      {/* ====================================================== */}
      {/*                        FINAL STATEMENT                */}
      {/* ====================================================== */}
      <section className="py-24 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"
        >
          All the information about a building — for developers, owners, and
          occupiers — unified in one intelligent platform.
          <span className="font-extrabold text-[#38BDF8]"> MiHub.</span>
        </motion.p>
      </section>
    </div>
  );
}
