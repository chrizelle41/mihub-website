import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import heroVideo from "../assets/bgvid.mp4";

const SECTION_INNER = "w-full max-w-5xl mx-auto px-6";

// Full-viewport section with scroll-based opacity/scale
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
      className={`min-h-screen w-full flex flex-col items-center justify-center relative ${bgClass} ${className}`}
    >
      <motion.div
        style={{ scale, y }}
        className={`${SECTION_INNER} py-12 relative`}
      >
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

const digitalTwinItems = [
  "Risks across the whole building",
  "Compliance issues",
  "Damp & Mould (Awaab's Law)",
  "Fire risks",
  "Building Safety Act compliance",
  "Evacuation compliance (Martyn's Law)",
  "Remediation costs",
  "Disposal costs",
];

const digitalTwinIcons = [
  AlertTriangle,
  Shield,
  AlertTriangle,
  Flame,
  Scale,
  Users,
  FileStack,
  FileStack,
];

export default function Home() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const nextSectionRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [digitalTwinIndex, setDigitalTwinIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Video plays when user scrolls; pause/reset when back at top
  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const y = window.scrollY;
      if (y > 10 && !hasPlayed) {
        videoRef.current.play();
        setHasPlayed(true);
      }
      if (y <= 10 && hasPlayed) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setHasPlayed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasPlayed]);

  // When video ends, smooth scroll to next section
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => {
      nextSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, []);

  // Rotating "Why is this important?" items
  useEffect(() => {
    const t = setInterval(
      () => setDigitalTwinIndex((i) => (i + 1) % digitalTwinItems.length),
      3200,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative text-white overflow-x-hidden flex flex-col items-center">
      <ScrollBackground />
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* ========== HERO: scroll-controlled video, auto-advance when done ========== */}
        <section
          ref={heroRef}
          className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden bg-black pt-[20vh] sm:pt-[24vh]"
        >
          <video
            ref={videoRef}
            src={heroVideo}
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-[#0c8db6]/20" />
          <motion.div
            style={{ opacity: heroTextOpacity }}
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_40px_rgba(34,211,238,0.2)]">
              MiHub – the world's most advanced real estate AI platform
            </h1>
          </motion.div>
        </section>

        <div ref={nextSectionRef} className="w-full flex flex-col">
          {/* ========== WHY MIHUB ========== */}
          <ScrollSection bgClass={getSectionBg(0)}>
            <div className="relative text-center">
              <Orb className="-top-40 -left-40" />
              <GridOverlay />
              <FadeUp>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 text-transparent bg-clip-text">
                  Why MiHub
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-3xl md:text-4xl lg:text-5xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                  MiHub lets you see all you need to know about your building,
                  yesterday, today and for tomorrow.
                </p>
              </FadeUp>
              <FadeUp>
                <p className="mt-6 text-2xl md:text-3xl lg:text-4xl text-white/80 max-w-3xl mx-auto">
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
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  All your building data in one place
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 max-w-4xl mx-auto leading-relaxed">
                  Buildings are complex. They produce a lot of data. All too
                  often that data is inaccessible, or there is simply so much
                  information that it becomes overwhelming. MiHub lets you cut
                  through the noise to see and understand the data that you need
                  to know.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== OpenAPI protocol – visual grid ========== */}
          <ScrollSection bgClass={getSectionBg(2)}>
            <div className="relative">
              <GridOverlay />
              <FadeUp>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8">
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
                      <span className="text-lg md:text-xl font-medium text-white/90 text-center">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp>
                <p className="mt-12 text-center text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto">
                  No more jumping between tools or systems. Just one source,
                  always up to date and always learning.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== Every feature, powered by our own AI ========== */}
          <ScrollSection bgClass={getSectionBg(3)}>
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* text */}
              <FadeUp className="flex-1 text-center lg:text-left">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                  Every feature, powered by our own AI
                </h2>

                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 leading-relaxed">
                  MiHub is fully AI-enabled. Every insight, automation, and
                  prediction comes from our own AI engine trained specifically
                  on your data.
                </p>
              </FadeUp>

              {/* glowing brain */}
              <FadeUp className="flex-1 flex justify-center">
                <AIBrain />
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== The Digital Twin + bldg.mp4 (plain black background) ========== */}
          <ScrollSection bgClass="bg-black">
            <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">
              <FadeUp className="flex-1 min-w-0 lg:max-w-md">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  The Digital Twin
                </h2>
                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 leading-relaxed">
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
                  className="w-full min-h-[60vh] h-auto object-contain"
                />
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== Why is this important? – rotating visual ========== */}
          <ScrollSection bgClass={getSectionBg(5)}>
            <div className="relative text-center">
              <GridOverlay />
              <FadeUp>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                  Why is this important?
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="text-2xl md:text-3xl lg:text-4xl text-white/85 max-w-4xl mx-auto mb-12">
                  It's important because in the future, your building's digital
                  twin will help you and the building's owners understand:
                </p>
              </FadeUp>
              <FadeUp>
                <div className="inline-flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border border-cyan-400/20 bg-white/[0.03] w-full max-w-2xl h-[200px]">
                  <div className="flex items-center justify-center gap-4 text-cyan-400 text-center">
                    {React.createElement(digitalTwinIcons[digitalTwinIndex], {
                      size: 36,
                    })}
                    <span className="text-3xl md:text-4xl font-semibold text-white">
                      {digitalTwinItems[digitalTwinIndex]}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {digitalTwinItems.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${i === digitalTwinIndex ? "bg-cyan-400" : "bg-white/30"}`}
                      />
                    ))}
                  </div>
                </div>
              </FadeUp>
              <FadeUp>
                <p className="mt-12 text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto">
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
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  For Building Managers
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 max-w-4xl mx-auto leading-relaxed">
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
          <ScrollSection bgClass={getSectionBg(7)}>
            <CircuitLines />
            <div className="relative text-center">
              <Orb className="-left-40 top-0" />
              <GridOverlay />
              <FadeUp>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 text-transparent bg-clip-text">
                  The Data Room — Live. Intelligent. Always current.
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 max-w-4xl mx-auto leading-relaxed">
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

          {/* ========== A world of industry firsts ========== */}
          <ScrollSection bgClass={getSectionBg(8)}>
            <div className="relative text-center">
              <FadeUp>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  A world of industry firsts
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 max-w-4xl mx-auto leading-relaxed">
                  MiHub quietly powers a series of industry-first AI
                  capabilities. We don't reveal everything we do. We don't like
                  to say too much. But once you've seen MiHub in action, you'll
                  understand why.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== £15,000 – cost no barrier ========== */}
          <ScrollSection bgClass={getSectionBg(9)}>
            <div className="relative text-center">
              <Orb className="-top-20 right-0" />
              <FadeUp>
                <span className="text-2xl md:text-3xl lg:text-4xl text-white/80">
                  With projects starting from{" "}
                </span>
                <span className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 text-transparent bg-clip-text">
                  £15,000
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl text-white/80">
                  , cost is no longer a barrier.
                </span>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto">
                  How do we do this? That's a closely guarded secret, the fruits
                  of years of hard-work, blood, sweat and tears and £millions in
                  R&D.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== We are unique – 1+1=3 ========== */}
          <ScrollSection bgClass={getSectionBg(10)}>
            <div className="relative text-center">
              <GridOverlay />
              <FadeUp>
                <p className="text-2xl md:text-3xl lg:text-4xl text-white/90">
                  But we can say:{" "}
                  <strong className="text-cyan-400">"We are unique."</strong>
                </p>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 max-w-4xl mx-auto leading-relaxed">
                  We are the only platform that addresses the whole as a series
                  of individual challenges, adding value at each and every step
                  making sure that in the end{" "}
                  <span className="inline-block font-bold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-transparent bg-clip-text">
                    1+1 = 3
                  </span>{" "}
                  and often, much, much more.
                </p>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== Genius solution – tagline ========== */}
          <ScrollSection bgClass={getSectionBg(11)}>
            <div className="relative text-center">
              <Orb className="bottom-0 left-0" />
              <FadeUp>
                <p className="text-3xl md:text-4xl lg:text-5xl text-white/85 max-w-3xl mx-auto mb-10">
                  It's a genius solution and hence why we say:
                </p>
              </FadeUp>
              <FadeUp>
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-white to-cyan-400 text-transparent bg-clip-text">
                  MiHub – the world's most advanced real estate AI platform.
                </h2>
              </FadeUp>
            </div>
          </ScrollSection>

          {/* ========== CTA – What we can do for you ========== */}
          <ScrollSection bgClass={getSectionBg(14)}>
            <div className="relative text-center">
              <Orb className="-top-40 left-1/2 -translate-x-1/2" />
              <GridOverlay />
              <FadeUp>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  What we can do for you
                </h2>
              </FadeUp>
              <FadeUp>
                <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white/85 max-w-3xl mx-auto">
                  Every organisation's needs are unique. That's why MiHub is
                  designed to adapt. But we won't list every feature here. Get
                  in touch to find out what MiHub can do for you.
                </p>
              </FadeUp>
              <FadeUp>
                <div className="mt-12">
                  <Link to="/contact" className="inline-block">
                    <motion.span
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Contact Us
                      <ChevronRight size={22} />
                    </motion.span>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </ScrollSection>
        </div>
      </div>
    </div>
  );
}
