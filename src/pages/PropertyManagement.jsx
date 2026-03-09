import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const SECTION_INNER = "w-full max-w-6xl mx-auto px-8";

function ScrollSection({ children, className = "", bgClass, id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [0.96, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [24, 0]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity }}
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden ${bgClass} ${className}`}
    >
      <motion.div
        style={{ scale, y }}
        className={`${SECTION_INNER} py-16 relative z-10`}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

function FadeUp({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
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
  "bg-[#051015]",
  "bg-gradient-to-b from-[#0f2a3a] to-[#051015]",
];
function getSectionBg(index) {
  return SECTION_BGS[index % SECTION_BGS.length];
}

const features = [
  "MiHub SPOG – a Single Pane Of Glass on all your key data.",
  "Digital O&Ms – all of your operations and maintenance manuals for your onsite FM team, all together, in one place. AI enabled.",
  "Data dashboards – see exactly the data you want to know, when you need to know it.",
  "AI enabled Predictive Maintenance analysis – in time, MiHub's AI will learn your building, learn its performance patterns and will predict failures before they happen.",
  "AI enabled query tool – Speak to your building and ask it what you want to know. AI enabled.",
  "BMS and EMS integration – pull key data from your BMS and EMS directly onto your MiHub data dashboard.",
  "Damp and Mould monitoring – working with ZapCarbon, get remote damp and mould monitoring on your confidential dashboard.",
  "Data room – MiHub automatically creates a constantly evolving data room for your building. Blockchain-enabled accuracy for TDD.",
];

export default function PropertyManagement() {
  return (
    <div className="w-full overflow-x-hidden text-white">
      {/* ========== HERO ========== */}
      <ScrollSection bgClass={getSectionBg(0)} id="property-hero">
        <div className="relative text-center">
          <Orb className="-top-40 -left-40" />
          <GridOverlay />
          <FadeUp>
            <h1
              className="text-5xl md:text-7xl font-extrabold tracking-tight
                bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF]
                bg-clip-text text-transparent"
            >
              MiHub Property Management
            </h1>
          </FadeUp>
          <FadeUp>
            <div className="h-[5px] w-[200px] bg-[#38BDF8] mx-auto mt-6 rounded-full" />
          </FadeUp>
          <FadeUp>
            <p className="mt-8 text-xl md:text-3xl text-white/80 leading-relaxed max-w-4xl mx-auto">
              MiHub's property management apps are award winners. Residential,
              office space, retail, data centres, infrastructures, schools, hotels —
              all benefit from MiHub.
            </p>
          </FadeUp>
        </div>
      </ScrollSection>

      {/* ========== FEATURE SECTIONS ========== */}
      {features.map((text, index) => {
        const dashIndex = text.indexOf("–");
        const title = dashIndex >= 0 ? text.slice(0, dashIndex).trim() : text;
        const description =
          dashIndex >= 0 ? text.slice(dashIndex + 1).trim() : "";

        return (
          <ScrollSection
            key={index}
            bgClass={getSectionBg(index + 1)}
            id={`feature-${index}`}
          >
            <div className="relative text-center">
              {index % 3 === 1 && (
                <Orb
                  className={
                    index % 2 === 0
                      ? "-bottom-32 right-0"
                      : "-left-40 top-1/2 -translate-y-1/2"
                  }
                />
              )}
              {index % 4 === 0 && <GridOverlay />}
              <FadeUp>
                <h2 className="text-3xl md:text-5xl font-bold text-[#38BDF8] tracking-wide mb-8">
                  {title}
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-4xl mx-auto">
                  {description}
                </p>
              </FadeUp>
            </div>
          </ScrollSection>
        );
      })}
    </div>
  );
}
