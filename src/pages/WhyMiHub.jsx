import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Zap, Target, Layers, Handshake, ChevronRight } from "lucide-react";
import { Cpu, ShieldCheck, BrainCircuit, FileCheck } from "lucide-react";

import vv from "../assets/vv.png";
import dome from "../assets/dome.png";
import landsec from "../assets/landsec.png";
import bouygues from "../assets/bouygues.png";
import hays from "../assets/hays.png";

const SECTION_INNER = "w-full max-w-6xl mx-auto px-8";

// Content-height section with smooth scroll-based fade in/out (no full viewport)
function ScrollSection({ children, className = "", bgClass, id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 0.62, 0.8, 1],
    [0, 0.85, 1, 1, 0.85, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.97, 0.99, 1, 0.99, 0.97],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [20, 8, 0, -8, -20],
  );

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity }}
      className={`w-full flex flex-col items-center relative overflow-hidden py-20 md:py-28 lg:py-32 ${bgClass} ${className}`}
    >
      <motion.div
        style={{ scale, y }}
        className={`${SECTION_INNER} relative z-10`}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

function FadeUp({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Orb({ className = "" }) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] pointer-events-none opacity-[0.12] ${className}`}
      style={{
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
      aria-hidden
    />
  );
}

const SECTION_BGS = [
  "bg-[#071318]",
  "bg-[#0c1822]",
  "bg-[#051015]",
  "bg-[#0a1624]",
  "bg-[#051015]",
  "bg-[#0c1828]",
  "bg-[#051015]",
  "bg-[#0a1624]",
  "bg-gradient-to-b from-[#0f2a3a] to-[#051015]",
];
function getSectionBg(index) {
  return SECTION_BGS[index % SECTION_BGS.length];
}

export default function WhyMiHub() {
  return (
    <div className="w-full overflow-x-hidden text-white">
      {/* ========== HERO ========== */}
      <ScrollSection bgClass={getSectionBg(0)} id="why-hero">
        <div className="relative text-center">
          <Orb className="-top-40 -left-40" />
          <GridOverlay />
          <FadeUp>
            <h1
              className="text-5xl md:text-7xl font-extrabold tracking-tight
                bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
                bg-clip-text text-transparent"
            >
              Why MiHub?
            </h1>
          </FadeUp>
          <FadeUp>
            <div className="h-[5px] w-[200px] bg-[#38BDF8] mx-auto mt-6 rounded-full" />
          </FadeUp>
          <FadeUp>
            <p className="mt-8 text-xl md:text-3xl text-white/70 leading-relaxed max-w-4xl mx-auto">
              Discover what sets MiHub apart and why leading developers,
              operators, and global companies choose us.
            </p>
          </FadeUp>
        </div>
      </ScrollSection>

      {/* ========== WHAT MAKES MIHUB DIFFERENT (icons + arrows, like All your building data) ========== */}
      <ScrollSection bgClass={getSectionBg(1)} id="what-makes-different">
        <div className="relative text-center">
          <Orb className="-bottom-32 right-0" />
          <FadeUp>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              What Makes MiHub Different
            </h2>
          </FadeUp>
          <FadeUp>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-2 xl:gap-4 mt-16 md:mt-20 lg:flex-nowrap">
              {[
                {
                  icon: Zap,
                  title: "Cheaper, quicker, more efficient",
                  description:
                    "Real, measurable benefit—not another layer of process.",
                },
                {
                  icon: Target,
                  title: "Real measurable benefit",
                  description:
                    "Value that counts for an already taxed industry.",
                },
                {
                  icon: Layers,
                  title: "Cradle to completion",
                  description:
                    "One platform across construction and operations—you can't find it elsewhere.",
                },
                {
                  icon: Handshake,
                  title: "Partner of choice",
                  description:
                    "Complete solution with legacy suppliers; seamless adoption.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <span key={i} className="contents">
                    <div className="flex flex-col items-center text-center w-full lg:min-w-0 lg:max-w-[220px] xl:max-w-[260px]">
                      <div className="w-14 h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-[0_0_24px_rgba(34,211,238,0.3)] mb-3">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-base lg:text-sm xl:text-lg font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/75 leading-snug">
                        {item.description}
                      </p>
                    </div>
                    {i < 4 - 1 && (
                      <ChevronRight
                        size={24}
                        className="text-cyan-400/70 shrink-0 hidden lg:block self-center flex-shrink-0"
                        aria-hidden
                      />
                    )}
                  </span>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </ScrollSection>

      {/* ========== PROUD TO HAVE WORKED WITH ========== */}
      <ScrollSection bgClass={getSectionBg(2)} id="partners">
        <div className="relative">
          <GridOverlay />
          <FadeUp>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-center mb-20
                bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
                text-transparent bg-clip-text"
            >
              Proud to Have Worked With
            </h2>
          </FadeUp>
          <FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 max-w-6xl mx-auto">
              {[vv, dome, landsec, bouygues, hays].map((logo, i) => (
                <div
                  key={i}
                  className="bg-[#0C1118] w-full h-40 md:h-44 shadow-[0_0_20px_rgba(56,189,248,0.15)]
                    rounded-2xl flex items-center justify-center p-6
                    border border-white/10 hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]
                    transition-all"
                >
                  <img
                    src={logo}
                    alt="Partner Logo"
                    className="max-h-full max-w-[80%] object-contain opacity-90 hover:opacity-100 transition"
                  />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </ScrollSection>

      {/* ========== BENEFITS ========== */}
      <ScrollSection bgClass={getSectionBg(3)} id="benefits">
        <div className="relative text-center">
          <Orb className="top-1/2 -right-40 -translate-y-1/2" />
          <FadeUp>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-6
                bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
                bg-clip-text text-transparent"
            >
              What Are the Benefits?
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="text-white/60 max-w-4xl mx-auto mb-20 text-xl">
              Our platform delivers measurable value across multiple cost
              categories. Below is an example of how MiHub can significantly
              reduce expenditure.
            </p>
          </FadeUp>
          <FadeUp>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
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
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-[#0C1118] border border-white/10
                    shadow-[0_0_25px_rgba(56,189,248,0.15)] text-left"
                >
                  <h3 className="text-2xl font-semibold text-white">
                    {item.label}
                  </h3>
                  <div className="mt-6">
                    <p className="text-white/50 line-through text-lg">
                      Typical: {item.before}
                    </p>
                    <p className="text-[#38BDF8] font-bold text-2xl">
                      With MiHub: {item.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp>
            <h3 className="mt-24 text-3xl font-bold">
              Overall Saving: <span className="text-[#38BDF8]">£125,900</span>
            </h3>
          </FadeUp>
        </div>
      </ScrollSection>

      {/* ========== DIGITAL TWIN ========== */}
      <ScrollSection bgClass={getSectionBg(4)} id="digital-twin">
        <div className="relative text-center">
          <GridOverlay />
          <FadeUp>
            <h2
              className="text-4xl md:text-5xl font-extrabold pb-2 leading-tight
                bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
                bg-clip-text text-transparent"
            >
              A Valuable Asset: Your Digital Twin
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-10 text-xl md:text-2xl text-white/70 max-w-5xl mx-auto leading-relaxed">
              MiHub empowers teams across technical and non-technical
              disciplines to access BIM and asset data instantly. No more
              specialist software, no more lengthy training — everything you
              need is visual, interactive, and accessible through one
              intelligent interface.
            </p>
          </FadeUp>
          <FadeUp>
            <p className="mt-8 text-xl md:text-2xl text-white/70 max-w-5xl mx-auto leading-relaxed">
              In partnership with Dome Group, MiHub delivered a modern building
              information experience for a major hotel development — showcasing
              key services, O&M data, and MEP components in a way that is
              intuitive for operators, buyers, and stakeholders.
            </p>
          </FadeUp>
        </div>
      </ScrollSection>
      {/* ========== THE FUTURE OF MIHUB ========== */}
      <ScrollSection
        bgClass={getSectionBg(5)}
        id="future"
        className="py-32 md:py-40 lg:py-48"
      >
        <div className="relative text-center">
          <Orb className="-left-40 top-1/2 -translate-y-1/2" />

          {/* Section Title */}
          <FadeUp>
            <h2
              className="text-4xl md:text-5xl font-extrabold
          bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
          bg-clip-text text-transparent"
            >
              The Future of MiHub
            </h2>
          </FadeUp>

          {/* Horizontal Roadmap */}
          <FadeUp>
            <div className="mt-16 relative max-w-6xl mx-auto">
              {/* dashed connector line */}
              <div className="absolute top-10 left-0 right-0 h-[2px] border-t-2 border-dashed border-cyan-400/30 hidden md:block" />

              <div className="grid md:grid-cols-4 gap-10 relative">
                {[
                  {
                    icon: Cpu,
                    title: "Predictive Maintenance",
                    desc: "Detect asset issues before failures occur.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Automated Compliance",
                    desc: "Continuous validation keeps building data audit-ready.",
                  },
                  {
                    icon: BrainCircuit,
                    title: "AI Data Validation",
                    desc: "AI identifies incomplete or inconsistent building data.",
                  },
                  {
                    icon: FileCheck,
                    title: "Instant EPC Generation",
                    desc: "Generate accurate EPC ratings directly from live data.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="text-center relative flex flex-col items-center"
                    >
                      {/* icon */}
                      <div
                        className="w-16 h-16 mx-auto rounded-2xl
          bg-gradient-to-br from-cyan-400 to-blue-500
          flex items-center justify-center
          shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                      >
                        <Icon size={28} />
                      </div>

                      {/* title */}
                      <h3 className="mt-6 text-lg md:text-xl font-bold text-white">
                        {item.title}
                      </h3>

                      {/* description */}
                      <p className="text-white/70 text-sm md:text-base mt-2 max-w-[220px]">
                        {item.desc}
                      </p>

                      {/* vertical connector for mobile */}
                      {i < 3 && (
                        <div className="md:hidden w-[2px] h-16 bg-cyan-400/30 mt-6 mx-auto rounded" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </ScrollSection>
      {/* ========== IMAGINE WHAT'S POSSIBLE ========== */}
      <ScrollSection bgClass={getSectionBg(6)} id="imagine">
        <div className="relative text-center">
          <GridOverlay />
          <FadeUp>
            <h2
              className="text-4xl md:text-5xl font-extrabold pb-2 leading-tight
                bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
                bg-clip-text text-transparent"
            >
              Imagine What's Possible
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-10 text-xl md:text-2xl text-white/70 max-w-5xl mx-auto leading-relaxed">
              From personalised home configuration to AR/VR building
              walkthroughs and immersive training, MiHub unlocks digital
              experiences that extend far beyond construction — shaping the next
              generation of asset management and customer engagement.
            </p>
          </FadeUp>
        </div>
      </ScrollSection>

      {/* ========== FINAL STATEMENT ========== */}
      <ScrollSection bgClass={getSectionBg(7)} id="final">
        <div className="relative text-center">
          <Orb className="-bottom-32 left-1/2 -translate-x-1/2" />
          <FadeUp>
            <p className="text-2xl md:text-3xl text-white/90 max-w-5xl mx-auto leading-relaxed rounded-2xl border border-cyan-400/20 bg-white/[0.04] px-6 py-8 md:px-10 md:py-10 shadow-[0_0_40px_rgba(34,211,238,0.12),0_0_80px_rgba(56,189,248,0.06)]">
              All the information about a building — for developers, owners, and
              occupiers — unified in one intelligent platform.{" "}
              <span
                className="font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(34,211,238,0.5)) drop-shadow(0 0 40px rgba(56,189,248,0.25))",
                }}
              >
                MiHub.
              </span>
            </p>
          </FadeUp>
        </div>
      </ScrollSection>
    </div>
  );
}
