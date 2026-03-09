import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
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
  Building2,
  Brain,
  FolderOpen,
} from "lucide-react";
import ScrollBackground from "../components/ScrollBackground";
import bldgVideo from "../assets/bldg.mp4";
import heroVideo from "../assets/bgvid.mp4";

/* ----- Decorative & visual components ----- */
function GradientOrb({ className = "", size = 400, delay = 0, cyan = true }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className} ${cyan ? "opacity-20" : "opacity-10"}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: cyan ? 0.2 : 0.12, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className={`w-full h-full rounded-full ${cyan ? "bg-gradient-to-br from-cyan-400/40 to-blue-600/40" : "bg-gradient-to-br from-white/20 to-cyan-500/20"}`}
      />
    </motion.div>
  );
}

function AnimatedIcon({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function VisualPanel({ icon: Icon, label, className = "" }) {
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden border border-white/20 bg-white/[0.06] backdrop-blur-md shadow-[0_0_0_1px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="aspect-video flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-transparent to-blue-600/25" />
        <AnimatedIcon className="relative z-10">
          <Icon size={64} className="text-cyan-400/90 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]" strokeWidth={1.2} />
        </AnimatedIcon>
      </div>
      {label ? (
        <p className="p-4 text-center text-sm text-white/60 uppercase tracking-wider">
          {label}
        </p>
      ) : null}
    </motion.div>
  );
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

const smoothReveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px 0px -80px 0px", amount: 0.2 },
  transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
};

function AnimatedSection({ children, className = "", style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px -100px 0px",
    amount: 0.15,
  });
  return (
    <motion.section
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 56 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
}

/* Section divider with gradient line */
function SectionDivider() {
  return (
    <div className="w-full py-0 flex justify-center" aria-hidden>
      <div
        className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        style={{ boxShadow: "0 0 20px rgba(34,211,238,0.2)" }}
      />
    </div>
  );
}

export default function Home() {
  const [digitalTwinIndex, setDigitalTwinIndex] = useState(0);
  const whyMihubRef = useRef(null);
  const whyMihubInView = useInView(whyMihubRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const t = setInterval(() => {
      setDigitalTwinIndex((i) => (i + 1) % digitalTwinItems.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative text-white overflow-x-hidden">
      <ScrollBackground />

      <div className="relative z-10">
        {/* HERO — Video background + premium tech look */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
          {/* Background video — regular play, no scroll control */}
          <div className="absolute inset-0 z-0" aria-hidden>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideo}
            />
            <div className="absolute inset-0 bg-[#0c8db6]/25" />
          </div>
          {/* Tech grid overlay */}
          <div
            className="absolute inset-0 z-[1] opacity-[0.07]"
            aria-hidden
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0c8db6]/20 via-transparent to-[#0c8db6]/15" />
          <GradientOrb className="-top-40 -left-40 z-[2]" size={500} />
          <GradientOrb className="-bottom-40 -right-40 z-[2]" size={450} delay={0.2} />
          <motion.span
            className="relative z-10 text-cyan-300/90 text-sm font-medium uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            AI-Powered Real Estate Platform
          </motion.span>
          <motion.h1
            className="relative z-10 font-story-headline font-bold mb-6 tracking-tight max-w-5xl text-white drop-shadow-[0_0_40px_rgba(34,211,238,0.15)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            MiHub – the world's most advanced real estate AI platform
          </motion.h1>
          <motion.div
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          />
          <motion.p
            className="relative z-10 max-w-2xl font-story-lead text-white/90 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            See everything about your building. Yesterday, today, and tomorrow.
          </motion.p>
        </section>

        <SectionDivider />

        {/* WHY MIHUB */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative">
          <div ref={whyMihubRef} className="absolute top-1/3 left-0 w-full h-1" aria-hidden />
          <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)", backgroundSize: "64px 64px" }} aria-hidden />
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden />
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />
          <GradientOrb className="-top-20 right-0 z-[1]" size={280} delay={0.1} cyan={false} />
          <motion.span className="relative z-10 text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-4" {...smoothReveal}>Why choose us</motion.span>
          <motion.div
            className="max-w-4xl relative z-10 p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: whyMihubInView ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ boxShadow: "0 0 0 1px rgba(34,211,238,0.08), 0 0 60px rgba(0,0,0,0.2)" }}
          >
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-lg" aria-hidden />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/40 rounded-br-lg" aria-hidden />
            <motion.h2
              className="font-story-headline font-bold mb-8 text-white leading-tight"
              {...smoothReveal}
            >
              Why MiHub
            </motion.h2>
            <motion.div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full mb-8 mx-auto" {...smoothReveal} />
            <motion.p
              className="max-w-2xl font-story-body text-white/85 mb-4 mx-auto"
              {...smoothReveal}
            >
              MiHub lets you see all you need to know about your building,
              yesterday, today and for tomorrow.
            </motion.p>
            <motion.p
              className="max-w-2xl font-story-body text-white/85 mx-auto"
              {...smoothReveal}
            >
              It doesn't just help you see what's happening now, it helps you
              understand what's about to happen next.
            </motion.p>
          </motion.div>
        </AnimatedSection>

        <SectionDivider />

        {/* All your building data in one place — animated background visual */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative py-20 overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
          >
            <motion.div
              className="absolute rounded-full blur-[120px] opacity-30"
              style={{
                width: "70vmax",
                height: "70vmax",
                background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)",
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full blur-[100px] opacity-25"
              style={{
                width: "50vmax",
                height: "50vmax",
                background: "radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 65%)",
                right: "10%",
                top: "30%",
              }}
              animate={{
                x: [0, 40, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full blur-[80px] opacity-20"
              style={{
                width: "40vmax",
                height: "40vmax",
                background: "radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)",
                left: "5%",
                bottom: "20%",
              }}
              animate={{
                x: [0, -20, 0],
                y: [0, 25, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          {/* Subtle grid / data-flow lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            aria-hidden
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Moving particles */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400/35 pointer-events-none"
              aria-hidden
              style={{
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 11) % 70}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * 0.15) % 3,
              }}
            />
          ))}
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            <motion.span className="block text-center text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-6" {...smoothReveal}>One platform</motion.span>
            <motion.div
              className="relative rounded-2xl border border-white/20 bg-white/[0.05] backdrop-blur-xl px-8 md:px-12 py-10 md:py-14"
              {...smoothReveal}
              style={{
                boxShadow: "0 0 0 1px rgba(34,211,238,0.15), 0 0 80px rgba(34,211,238,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <motion.h2
                className="font-story-title font-bold mb-4"
                style={{
                  background: "linear-gradient(135deg, #fff 0%, rgba(34,211,238,0.95) 50%, #e0f7fa 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 60px rgba(34,211,238,0.2)",
                }}
                {...smoothReveal}
              >
                All your building data in one place
              </motion.h2>
              <motion.div
                className="w-48 md:w-64 h-0.5 rounded-full mx-auto mb-8 bg-gradient-to-r from-transparent via-cyan-400/90 to-transparent"
                {...smoothReveal}
                style={{ boxShadow: "0 0 24px rgba(34,211,238,0.4)" }}
              />
              <motion.p
                className="max-w-3xl mx-auto font-story-body text-white/85 mb-5 leading-relaxed"
                {...smoothReveal}
              >
                Buildings are complex. They produce a lot of data. All too often
                that data is inaccessible, or there is simply so much information
                that it becomes overwhelming.
              </motion.p>
              <motion.p
                className="max-w-3xl mx-auto font-story-body font-medium text-cyan-200/95"
                {...smoothReveal}
                style={{
                  textShadow: "0 0 30px rgba(34,211,238,0.15)",
                }}
              >
                MiHub lets you cut through the noise to see and understand the data
                that you need to know.
              </motion.p>
            </motion.div>
          </div>
        </AnimatedSection>

        <SectionDivider />

        {/* Open API — with visuals */}
        <AnimatedSection className="section-bleed-right min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 relative bg-black/95">
          <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)", backgroundSize: "56px 56px" }} aria-hidden />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" aria-hidden />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" aria-hidden />
          <GradientOrb className="-right-40 top-1/4 z-[1]" size={320} delay={0.15} cyan={false} />
          <motion.span className="relative z-10 text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-4" {...smoothReveal}>Integrations</motion.span>
          <motion.h2
            className="font-story-title font-bold text-center mb-8 max-w-3xl text-white relative z-10"
            {...smoothReveal}
          >
            Our openAPI protocol means that we can configure your MiHub to view:
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl w-full mt-6 relative z-10">
            {apiFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="group flex items-center gap-5 rounded-xl p-5 md:p-6 bg-white/[0.04] border border-white/15 hover:border-cyan-400/35 hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px", amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.04,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <AnimatedIcon className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform border border-cyan-400/20">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                  </AnimatedIcon>
                  <p className="font-story-body font-medium text-white/95 text-sm md:text-base">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <motion.p
            className="mt-12 max-w-2xl text-center font-story-body text-white/80 relative z-10"
            {...smoothReveal}
          >
            No more jumping between tools or systems. Just one source, always up
            to date and always learning.
          </motion.p>
        </AnimatedSection>

        <SectionDivider />

        {/* Every feature, powered by our own AI */}
        <AnimatedSection className="section-bleed-right min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative bg-black/95">
          <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(34,211,238,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(34,211,238,0.06) 0%, transparent 50%)" }} aria-hidden />
          <GradientOrb className="-left-40 bottom-1/4 z-[1]" size={320} cyan={false} />
          <div className="max-w-md mx-auto mb-8 relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-transparent opacity-60 blur-xl" aria-hidden />
            <VisualPanel icon={Brain} label="" className="max-w-md mx-auto relative" />
          </div>
          <motion.span className="relative z-10 text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-4 block" {...smoothReveal}>AI engine</motion.span>
          <motion.h2
            className="font-story-headline font-bold mb-8 text-white max-w-4xl relative z-10"
            {...smoothReveal}
          >
            Every feature, powered by our own AI
          </motion.h2>
          <motion.p
            className="max-w-2xl font-story-body text-white/85 mb-4"
            {...smoothReveal}
          >
            MiHub is fully AI-enabled. Every insight, automation, and prediction
            comes from our own AI engine, trained specifically on your data.
          </motion.p>
          <motion.p
            className="max-w-2xl font-story-body text-white/85"
            {...smoothReveal}
          >
            MiHub knows your building better than ever before — it's learning
            every day, processing millions of points of data, making sure you
            get the very best advice and support.
          </motion.p>
        </AnimatedSection>

        <SectionDivider />

        {/* The Digital Twin — black section: full width, title with glow, text left, video right */}
        <AnimatedSection className="section-bleed-right min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 relative bg-black w-full">
          <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)", backgroundSize: "64px 64px" }} aria-hidden />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-60" aria-hidden />
          <motion.span className="relative z-10 text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-4 text-center block" {...smoothReveal}>Digital twin</motion.span>
          <motion.h2
            className="font-story-title font-bold mb-6 md:mb-8 text-center w-full text-white relative z-10"
            style={{
              textShadow:
                "0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.25), 0 0 80px rgba(34,211,238,0.15)",
            }}
            {...smoothReveal}
          >
            The Digital Twin
          </motion.h2>
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center relative z-10">
            <motion.div className="flex flex-col justify-center order-2 lg:order-1" {...smoothReveal}>
              <div className="pl-4 border-l-2 border-cyan-400/40">
                <p className="font-story-body text-white/90 leading-relaxed text-lg md:text-xl max-w-xl">
                  MiHub gives you more than just day-to-day management. MiHub is your
                  starting point for creating your building's digital twin.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] lg:h-[420px] xl:h-[480px] order-1 lg:order-2 overflow-hidden flex-shrink-0 rounded-2xl border border-white/10 p-1"
              {...smoothReveal}
              style={{ boxShadow: "0 0 0 1px rgba(34,211,238,0.15), 0 0 60px rgba(34,211,238,0.08)" }}
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden">
              <video
                src={bldgVideo}
                className="absolute inset-0 w-full h-full object-contain"
                playsInline
                muted
                loop
                autoPlay
                aria-label="Building digital twin"
              />
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        <SectionDivider />

        {/* Why is this important? — cyan section only, larger */}
        <AnimatedSection className="section-bleed-right min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-24 md:py-32 relative bg-gradient-to-br from-cyan-900/95 via-[#0c8db6] to-cyan-800/95 w-full overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} aria-hidden />
          <motion.span className="relative z-10 text-white/90 text-xs font-medium uppercase tracking-[0.25em] mb-4" {...smoothReveal}>Compliance & risk</motion.span>
          <motion.p
            className="text-white font-story-title font-semibold mb-12 md:mb-14 text-center relative z-10"
            {...smoothReveal}
          >
            Why is this important?
          </motion.p>
          <motion.div
            className="w-full max-w-3xl mx-auto min-h-[260px] md:min-h-[300px] flex flex-col items-center justify-center rounded-3xl bg-white/10 border border-white/25 p-10 md:p-14 backdrop-blur-sm relative z-10"
            {...smoothReveal}
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.2), 0 0 80px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)" }}
          >
            <div className="flex items-center justify-center gap-5 mb-5">
              {digitalTwinIcons[digitalTwinIndex] &&
                (() => {
                  const Icon = digitalTwinIcons[digitalTwinIndex];
                  return (
                    <AnimatedIcon>
                      <Icon
                        size={48}
                        className="text-white flex-shrink-0"
                        strokeWidth={1.5}
                      />
                    </AnimatedIcon>
                  );
                })()}
              <p className="font-story-title font-semibold text-white text-center text-xl md:text-2xl">
                {digitalTwinItems[digitalTwinIndex]}
              </p>
            </div>
            <div className="flex gap-2.5 mt-5">
              {digitalTwinItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setDigitalTwinIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${i === digitalTwinIndex ? "bg-white w-10" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
                  aria-label={`View item ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
          <motion.p
            className="mt-12 md:mt-14 max-w-2xl text-center font-story-body text-white/90 text-lg md:text-xl relative z-10"
            {...smoothReveal}
          >
            It'll even help you at the time of transaction by being an
            AI-powered data room.
          </motion.p>
        </AnimatedSection>

        <SectionDivider />

        {/* For Building Managers */}
        <AnimatedSection className="section-bleed-right min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative bg-black/95">
          <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)", backgroundSize: "72px 72px" }} aria-hidden />
          <GradientOrb className="-left-32 bottom-1/3 z-[1]" size={280} cyan={false} />
          <motion.div className="relative z-10 flex items-center justify-center gap-3 mb-6" {...smoothReveal}>
            <Building2 className="text-cyan-400/80" size={28} />
            <motion.span className="text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em]">For teams</motion.span>
          </motion.div>
          <motion.h2
            className="font-story-title font-bold mb-8 text-white max-w-4xl relative z-10"
            {...smoothReveal}
          >
            For Building Managers
          </motion.h2>
          <motion.p
            className="max-w-2xl font-story-body text-white/85 relative z-10"
            {...smoothReveal}
          >
            Whether you're managing a single building or an entire portfolio,
            MiHub's powerful dashboards and predictive analytics change how you
            see, manage, and understand your buildings. Even simple things like
            security reports and maintenance reports can all be collated and
            added into the knowledge base.
          </motion.p>
        </AnimatedSection>

        <SectionDivider />

        {/* The Data Room */}
        <AnimatedSection className="section-bleed-right min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 text-center relative bg-black/95">
          <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)", backgroundSize: "48px 48px" }} aria-hidden />
          <div className="absolute top-1/4 right-8 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden title="Live" />
          <GradientOrb className="-right-40 bottom-1/4 z-[1]" size={320} cyan={false} />
          <div className="max-w-md mx-auto mb-8 relative">
            <div className="absolute -inset-3 rounded-2xl bg-cyan-500/10 blur-2xl" aria-hidden />
            <VisualPanel
              icon={FolderOpen}
              label=""
              className="max-w-md mx-auto relative"
            />
          </div>
          <motion.span className="relative z-10 text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-4 block" {...smoothReveal}>Data room</motion.span>
          <motion.h2
            className="font-story-title font-bold mb-8 text-white relative z-10"
            {...smoothReveal}
          >
            The Data Room — Live. Intelligent. Always Current.
          </motion.h2>
          <motion.p
            className="max-w-3xl font-story-body text-white/85 mb-6 relative z-10 mx-auto"
            {...smoothReveal}
          >
            A constantly updating data room for your building. Every document,
            drawing, log, sensor reading, and report — automatically organised,
            securely stored, and continuously refreshed.
          </motion.p>
          <motion.p
            className="max-w-3xl font-story-body text-white/85 mb-6 relative z-10 mx-auto"
            {...smoothReveal}
          >
            MiHub's AI-powered data room becomes your single destination for
            everything your building knows, learns, and generates.
          </motion.p>
          <motion.p
            className="font-story-body text-cyan-200 font-medium relative z-10"
            {...smoothReveal}
          >
            No manual updates. No version confusion.
          </motion.p>
        </AnimatedSection>

        <SectionDivider />

        {/* Industry Firsts */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative">
          <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)", backgroundSize: "80px 80px" }} aria-hidden />
          <GradientOrb className="-left-40 top-1/4 z-[1]" size={350} delay={0.1} />
          <motion.span className="relative z-10 text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-4" {...smoothReveal}>Industry firsts</motion.span>
          <motion.h2
            className="font-story-title font-bold mb-8 text-white max-w-4xl relative z-10"
            {...smoothReveal}
          >
            A World of Industry Firsts
          </motion.h2>
          <motion.div
            className="max-w-2xl space-y-4 font-story-body text-white/85 relative z-10 py-8 px-8 md:px-12 rounded-2xl border border-white/10 bg-white/[0.02]"
            {...smoothReveal}
            style={{ boxShadow: "0 0 0 1px rgba(34,211,238,0.06)" }}
          >
            <p>
              MiHub quietly powers a series of industry-first AI capabilities.
              We don't reveal everything we do. We don't like to say too much.
              But once you've seen MiHub in action, you'll understand why.
            </p>
            <p>
              With projects starting from £15,000, cost is no longer a barrier.
            </p>
            <p className="text-cyan-200">
              How do we do this? That's a closely guarded secret — the fruits of
              years of hard work, blood, sweat and tears and £millions in R&D.
              But we can say:{" "}
              <strong className="text-white">We are unique.</strong>
            </p>
            <p>
              We are the only platform that addresses the whole as a series of
              individual challenges, adding value at each and every step, making
              sure that in the end 1+1 = 3 and often, much, much more.
            </p>
            <p className="font-story-lead font-semibold text-white">
              MiHub – the world's most advanced real estate AI platform.
            </p>
          </motion.div>
        </AnimatedSection>

        <SectionDivider />

        {/* CTA — What We Can Do For You */}
        <AnimatedSection className="section-bleed-right min-h-screen flex flex-col justify-center items-center px-6 text-center relative bg-black/95 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(34,211,238,0.12) 0%, transparent 60%)" }} aria-hidden />
          <GradientOrb className="-left-40 top-1/2 z-[1]" size={400} cyan={false} />
          <GradientOrb className="-right-40 bottom-1/2 z-[1]" size={350} delay={0.15} cyan={false} />
          <motion.span className="relative z-10 text-cyan-300/80 text-xs font-medium uppercase tracking-[0.25em] mb-4" {...smoothReveal}>Get in touch</motion.span>
          <motion.h2
            className="font-story-title font-bold mb-8 text-white max-w-3xl relative z-10"
            {...smoothReveal}
          >
            What We Can Do For You
          </motion.h2>
          <motion.p
            className="max-w-2xl font-story-body text-white/85 mb-10 relative z-10"
            {...smoothReveal}
          >
            Every organisation's needs are unique. That's why MiHub is designed
            to adapt. But we won't list every feature here. Get in touch to find
            out what MiHub can do for you.
          </motion.p>
          <Link to="/contact" className="relative z-10">
            <motion.div
              className="inline-block p-[2px] rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.button
                className="group w-full inline-flex items-center justify-center gap-2 px-10 py-5 font-story-body bg-[#0a0a0f] hover:bg-[#0c0c12] text-white font-semibold rounded-full border border-cyan-400/20 transition-colors"
              >
                Contact Us
                <ChevronRight
                  size={22}
                  className="text-cyan-400 group-hover:translate-x-0.5 transition-transform"
                />
              </motion.button>
            </motion.div>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
