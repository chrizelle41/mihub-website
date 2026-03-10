import React, { useRef } from "react";
import { ScrollToTopLink } from "../components/ScrollToTopLink";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AIBrain from "../components/AIBrain";
import CircuitLines from "../components/CircuitLines";
import DataPanels from "../components/DataPanels";
import {
  Box,
  Layers,
  FileText,
  LayoutGrid,
  BookOpen,
  ClipboardList,
  Map,
  Database,
  Cpu,
  Gauge,
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Flame,
  Scale,
  Users,
  FileStack,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import ScrollBackground from "../components/ScrollBackground";
import bldgVideo from "../assets/bldg.mp4";
import dataRoomImage from "../assets/dataRoom.png";

const SECTION_INNER = "w-full max-w-6xl mx-auto px-4 sm:px-5 md:px-6";

// Content-height section with scroll-based opacity/scale (no full viewport)
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
      className={`w-full flex flex-col items-center relative py-20 md:py-28 lg:py-32 ${bgClass} ${className}`}
    >
      <motion.div style={{ scale, y }} className={`${SECTION_INNER} relative`}>
        {children}
      </motion.div>
    </motion.section>
  );
}

// Content stays visible after first time in view
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

// Decorative: soft gradient orb
function Orb({ className = "" }) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] pointer-events-none opacity-[0.12] ${className}`}
      style={{
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%",
      }}
      aria-hidden
    />
  );
}

// Decorative: grid overlay
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
      aria-hidden
    />
  );
}

// Hero: deep blue/black, countless faint stars, subtle blue-to-cyan streaks only
function HeroStarsBackground() {
  const starPositions = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < 280; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: 0.25 + Math.random() * 0.5,
        o: 0.15 + Math.random() * 0.5,
        slow: i % 3 === 0,
      });
    }
    return positions;
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep blue to black gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(15,23,42,0.5) 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 50% 100%, #050508 0%, #071318 40%, #080c12 100%)",
        }}
      />
      {/* Moving stars — two layers for parallax feel */}
      <svg
        className="absolute inset-0 w-full h-full animate-star-drift"
        style={{ willChange: "transform" }}
        aria-hidden
      >
        {starPositions
          .filter((s) => !s.slow)
          .map((s, i) => (
            <circle
              key={i}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill="white"
              opacity={s.o}
            />
          ))}
      </svg>
      <svg
        className="absolute inset-0 w-full h-full animate-star-drift-slow"
        style={{ willChange: "transform" }}
        aria-hidden
      >
        {starPositions
          .filter((s) => s.slow)
          .map((s, i) => (
            <circle
              key={i}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill="white"
              opacity={s.o}
            />
          ))}
      </svg>
      {/* Subtle blue-to-cyan light streaks only */}
      <div
        className="absolute inset-0 animate-streak-flow"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(59,130,246,0.08) 30%, transparent 60%), linear-gradient(240deg, transparent 10%, rgba(34,211,238,0.06) 40%, transparent 70%), linear-gradient(300deg, transparent 20%, rgba(56,189,248,0.07) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}

// Alternating section backgrounds: dark vs cyan-tinted for contrast
const SECTION_BGS = [
  "bg-[#071318]", // dark (Why MiHub)
  "bg-[#0c1822]", // cyan-tinted dark blue
  "bg-[#051015]", // darker
  "bg-[#0a1624]", // cyan-tinted
  "bg-[#051015]",
  "bg-[#0c1828]", // cyan-tinted
  "bg-[#051015]",
  "bg-[#0a1624]",
  "bg-[#051015]",
  "bg-[#0c1828]",
  "bg-[#051015]",
  "bg-[#0a1624]",
  "bg-[#051015]",
  "bg-[#0a1624]",
  "bg-gradient-to-b from-[#0f2a3a] to-[#051015]", // CTA: cyan gradient
];
function getSectionBg(index) {
  return SECTION_BGS[index % SECTION_BGS.length];
}

const apiFeatures = [
  { label: "3D models", icon: Box },
  { label: "4D models", icon: Layers },
  { label: "O&Ms", icon: FileText },
  { label: "CAFM", icon: LayoutGrid },
  { label: "Training Guides", icon: BookOpen },
  { label: "SOPs", icon: ClipboardList },
  { label: "Floorplans", icon: Map },
  { label: "Multiple datasets", icon: Database },
  { label: "IoT integration", icon: Cpu },
  { label: "Direct access to your BMS and EMS", icon: Gauge },
  { label: "Tenants' specific dashboards", icon: LayoutDashboard },
];

const whyImportantCards = [
  {
    title: "Risks across the whole building",
    description:
      "Identify and track risks across the entire building lifecycle in one place.",
    icon: AlertTriangle,
  },
  {
    title: "Compliance issues",
    description:
      "Stay on top of regulatory and compliance requirements with clear visibility.",
    icon: Shield,
  },
  {
    title: "Damp & Mould (Awaab's Law)",
    description:
      "Monitor conditions and meet Awaab's Law obligations with proactive insights.",
    icon: AlertTriangle,
  },
  {
    title: "Fire risks",
    description:
      "Understand and mitigate fire safety risks with integrated data and reporting.",
    icon: Flame,
  },
  {
    title: "Building Safety Act compliance",
    description:
      "Navigate Building Safety Act requirements with structured, auditable data.",
    icon: Scale,
  },
  {
    title: "Evacuation compliance (Martyn's Law)",
    description:
      "Plan and demonstrate evacuation and Martyn's Law compliance effectively.",
    icon: Users,
  },
  {
    title: "Remediation costs",
    description:
      "Model and track remediation costs with clearer forecasting and visibility.",
    icon: FileStack,
  },
  {
    title: "Disposal costs",
    description:
      "Understand end-of-life and disposal costs as part of the full picture.",
    icon: FileStack,
  },
];

const industryFirstsTimeline = [
  {
    title: "Industry-first AI for buildings",
    description:
      "MiHub introduces AI capabilities designed specifically for the built environment — turning complex operational data into clear insight, prediction, and action.",
  },
  {
    title: "Access without the traditional cost barrier",
    description:
      "With projects starting from £15,000, MiHub makes advanced digital building intelligence accessible to organisations that previously couldn't justify the cost.",
  },
  {
    title: "One platform for the entire lifecycle",
    description:
      "MiHub connects operational data, documents, models, sensors, and systems into a single intelligent platform — eliminating fragmented tools and disconnected information.",
  },
  {
    title: "More value than the sum of its parts",
    description:
      "By connecting every dataset and system together, MiHub creates insights that individual tools cannot deliver — transforming isolated information into powerful building intelligence.",
  },
];
export default function Home() {
  const nextSectionRef = useRef(null);

  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative text-white overflow-x-hidden flex flex-col items-center">
      <ScrollBackground />
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* ========== HERO: stars + subtle blue streaks, normal scroll ========== */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
          <HeroStarsBackground />
          <FadeUp className="relative z-10 text-center px-4 sm:px-5 md:px-6 max-w-6xl mx-auto">
            {/* Small pill badge — blue/cyan glow */}
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 sm:mb-8 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <span className="text-sm sm:text-base text-white/80 font-medium">
                AI-Powered Building Intelligence
              </span>
            </div>
            {/* Main headline: blue-to-cyan gradient with subtle glow */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.05]">
              <span
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent"
                style={{
                  filter:
                    "drop-shadow(0 0 24px rgba(34,211,238,0.4)) drop-shadow(0 0 48px rgba(56,189,248,0.25))",
                }}
              >
                MiHub
              </span>
            </h1>
            {/* Subheading in lighter gray */}
            <p className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 font-normal tracking-tight max-w-2xl mx-auto leading-snug">
              the world's most advanced ai platform
            </p>
            {/* Get Started — scrolls to next section */}
            <div className="mt-8 sm:mt-10">
              <motion.button
                type="button"
                onClick={scrollToNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/90 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
                Get Started
              </motion.button>
            </div>
          </FadeUp>
        </section>

        <div ref={nextSectionRef} className="w-full flex flex-col">
          {/* ========== Why MiHub ========== */}
          <ScrollSection bgClass={getSectionBg(0)}>
            <div className="relative text-center">
              <Orb className="-top-40 -left-40" />
              <GridOverlay />
              <FadeUp>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  Why{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    MiHub
                  </span>
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                  MiHub lets you see all you need to know about your building,
                  yesterday, today and for tomorrow.
                </p>
              </FadeUp>
              <FadeUp>
                <p className="mt-4 text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto">
                  It doesn't just help you see what's happening now, it helps
                  you understand what's about to happen next.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== All your building data in one place ========== */}
          <ScrollSection bgClass={getSectionBg(1)}>
            <div className="relative text-center">
              <Orb className="-bottom-32 right-0" />
              <FadeUp>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  All your building data in one place
                </h2>
              </FadeUp>
              {/* Icons with arrows between them + title + definition each */}
              <FadeUp>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 mt-16 md:mt-20">
                  <div className="flex flex-col items-center text-center max-w-xs">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-[0_0_24px_rgba(34,211,238,0.3)] mb-4">
                      <Layers size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-white mb-2">
                      Buildings are complex
                    </h4>
                    <p className="text-sm text-white/75 leading-relaxed">
                      They produce a lot of data. MiHub brings it together in
                      one place.
                    </p>
                  </div>
                  <ChevronRight
                    size={28}
                    className="text-cyan-400/70 shrink-0 hidden md:block"
                    aria-hidden
                  />
                  <div className="flex flex-col items-center text-center max-w-xs">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-[0_0_24px_rgba(34,211,238,0.3)] mb-4">
                      <Database size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-white mb-2">
                      Cut through the noise
                    </h4>
                    <p className="text-sm text-white/75 leading-relaxed">
                      All too often that data is inaccessible, or there is
                      simply so much information that it becomes overwhelming.
                    </p>
                  </div>
                  <ChevronRight
                    size={28}
                    className="text-cyan-400/70 shrink-0 hidden md:block"
                    aria-hidden
                  />
                  <div className="flex flex-col items-center text-center max-w-xs">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-[0_0_24px_rgba(34,211,238,0.3)] mb-4">
                      <LayoutGrid size={28} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-white mb-2">
                      See what you need
                    </h4>
                    <p className="text-sm text-white/75 leading-relaxed">
                      MiHub lets you cut through the noise to see and understand
                      the data that you need to know.
                    </p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== OpenAPI protocol – visual grid ========== */}
          <ScrollSection bgClass={getSectionBg(2)}>
            <div className="relative">
              <GridOverlay />
              <FadeUp>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-8">
                  Our openAPI protocol means that we can configure your MiHub to
                  view:
                </h2>
              </FadeUp>
              <FadeUp>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-12">
                  {apiFeatures.map(({ label, icon: Icon }, i) => (
                    <div
                      key={label}
                      className="flex flex-col items-center p-5 rounded-2xl border border-cyan-400/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-cyan-400/40 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-sm md:text-base font-medium text-white/90 text-center">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp>
                <p className="mt-10 text-center text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto">
                  No more jumping between tools or systems. Just one source,
                  always up to date and always learning.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== Every feature, powered by our own AI ========== */}
          <ScrollSection bgClass={getSectionBg(3)}>
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* animation - left */}
              <FadeUp className="flex-1 flex justify-center order-2 lg:order-1">
                <AIBrain />
              </FadeUp>

              {/* text - right */}
              <FadeUp className="flex-1 text-center lg:text-right order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                  Every feature, powered by our own AI
                </h2>

                <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed">
                  MiHub is fully AI-enabled. Every insight, automation, and
                  prediction comes from our own AI engine trained specifically
                  on your data.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== The Digital Twin + bldg.mp4 (plain black background) ========== */}
          <ScrollSection bgClass="bg-black">
            <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
              <FadeUp className="flex-1 min-w-0 lg:max-w-md">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  The Digital Twin
                </h2>
                <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/85 leading-relaxed">
                  MiHub gives you more than just day-to-day management. MiHub is
                  your starting point for creating your building's digital twin.
                </p>
              </FadeUp>
              <FadeUp className="flex-[1.4] w-full min-w-0 max-w-full lg:max-w-none">
                <video
                  src={bldgVideo}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== Why is this important? – list in glassmorphism containers ========== */}
          <ScrollSection bgClass={getSectionBg(5)}>
            <div className="relative w-full text-center">
              <GridOverlay />
              <FadeUp>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Why is this important?
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="text-lg md:text-xl lg:text-2xl text-white/85 max-w-4xl mx-auto mb-10">
                  It's important because in the future, your building's digital
                  twin will help you and the building's owners understand:
                </p>
              </FadeUp>
              <FadeUp>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 w-full">
                  {whyImportantCards.map(
                    ({ title, description, icon: Icon }, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-6 md:p-7 text-left hover:bg-white/[0.09] hover:border-cyan-400/20 transition-all duration-300"
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                          aria-hidden
                        >
                          <Icon size={24} strokeWidth={1.8} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white mb-2">
                          {title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </FadeUp>
              <FadeUp>
                <p className="mt-10 text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto">
                  It'll even help you at the time of transaction by being an
                  AI-powered data room.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== For Building Managers ========== */}
          <ScrollSection bgClass={getSectionBg(6)}>
            <div className="relative text-center">
              <Orb className="top-1/2 -translate-y-1/2 -right-20" />
              <FadeUp>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  For Building Managers
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/85 max-w-4xl mx-auto leading-relaxed">
                  Whether you're managing a single building or an entire
                  portfolio, MiHub's powerful dashboards and predictive
                  analytics changes how you see, manage, and understand your
                  buildings. Even simple things like security reports,
                  maintenance reports can all be collated and added into the
                  knowledge base.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== The Data Room ========== */}
          <ScrollSection bgClass="bg-black">
            <CircuitLines />
            <div className="relative text-center flex flex-col items-center gap-8">
              <Orb className="-left-40 top-0" />
              <GridOverlay />
              <FadeUp>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 text-transparent bg-clip-text">
                  The Data Room — Live. Intelligent. Always current.
                </h2>
              </FadeUp>
              <FadeUp className="w-full flex justify-center">
                <img
                  src={dataRoomImage}
                  alt="Data Room"
                  className="w-full max-w-md h-auto object-contain"
                />
              </FadeUp>
              <FadeUp>
                <p className="text-lg md:text-xl lg:text-2xl text-white/85 max-w-4xl mx-auto leading-relaxed">
                  A constantly updating data room for your building. Every
                  document, drawing, log, sensor reading, and report,
                  automatically organised, securely stored, and continuously
                  refreshed. MiHub's AI-powered data room becomes your single
                  destination for everything your building knows, learns, and
                  generates. No manual updates. No version confusion.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== A world of industry firsts (two columns + glowing line) ========== */}
          <section
            className={`w-full py-20 md:py-28 lg:py-32 ${getSectionBg(8)}`}
          >
            <div className="relative">
              <Orb className="-top-20 right-0" />
              <GridOverlay />
            </div>
            <div
              className={`${SECTION_INNER} relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-start`}
            >
              {/* Left: title (gradient on second line), intro, Contact Us */}
              <div className="flex-1 lg:max-w-md">
                <FadeUp>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    A world of{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      industry firsts
                    </span>
                  </h2>
                </FadeUp>
                <FadeUp>
                  <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed">
                    MiHub quietly powers a series of industry-first AI
                    capabilities. We don't reveal everything we do. We don't
                    like to say too much. But once you've seen MiHub in action,
                    you'll understand why.
                  </p>
                </FadeUp>
                <FadeUp>
                  <ScrollToTopLink
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 hover:border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                    Contact Us
                  </ScrollToTopLink>
                </FadeUp>
              </div>

              {/* Right: timeline with static glowing line (no dots) */}
              <div className="flex-1 w-full relative">
                <div className="relative pl-8 md:pl-10">
                  {/* Full-height glowing gradient line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_16px_rgba(34,211,238,0.5)]"
                    aria-hidden
                  />
                  {industryFirstsTimeline.map(({ title, description }, i) => (
                    <FadeUp
                      key={i}
                      className="relative flex gap-4 pb-10 last:pb-0"
                    >
                      <div className="pt-0 pl-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {title}
                        </h3>
                        <p className="mt-2 text-base md:text-lg text-white/75 leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========== CTA – What we can do for you ========== */}
          <ScrollSection bgClass={getSectionBg(14)}>
            <div className="relative text-center">
              <Orb className="-top-40 left-1/2 -translate-x-1/2" />
              <GridOverlay />
              <FadeUp>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  What we can do for you
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/85 max-w-3xl mx-auto">
                  Every organisation's needs are unique. That's why MiHub is
                  designed to adapt. But we won't list every feature here. Get
                  in touch to find out what MiHub can do for you.
                </p>
              </FadeUp>
              <FadeUp>
                <div className="mt-12">
                  <ScrollToTopLink to="/contact" className="inline-block">
                    <motion.span
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Contact Us
                      <ChevronRight size={22} />
                    </motion.span>
                  </ScrollToTopLink>
                </div>
              </FadeUp>
            </div>
          </ScrollSection>
        </div>
      </div>
    </div>
  );
}
