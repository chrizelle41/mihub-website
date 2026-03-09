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
      className={`rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="aspect-video flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-600/20" />
        <AnimatedIcon className="relative z-10">
          <Icon size={64} className="text-cyan-400/80" strokeWidth={1.2} />
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

const SCROLL_BG_RANGE = 1.8;

export default function Home() {
  const [digitalTwinIndex, setDigitalTwinIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      setViewportHeight(window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollProgress = Math.min(
    scrollY / (viewportHeight * SCROLL_BG_RANGE),
    1,
  );
  // Core zooms 0.55→1; show Why MiHub only after zoom is well underway so zoom happens first
  const whyMihubFade =
    scrollProgress < 0.82 ? 0 : Math.min(1, (scrollProgress - 0.82) / 0.18);

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
        {/* HERO — Main tagline */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
          <GradientOrb className="-top-40 -left-40" size={500} />
          <GradientOrb
            className="-bottom-40 -right-40"
            size={450}
            delay={0.2}
          />
          <motion.h1
            className="font-story-headline font-bold mb-8 tracking-tight max-w-5xl text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            MiHub – the world's most advanced real estate AI platform
          </motion.h1>
          <motion.p
            className="max-w-2xl font-story-lead text-white/90 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            See everything about your building. Yesterday, today, and tomorrow.
          </motion.p>
        </section>

        {/* WHY MIHUB — fades in after core zoom has started */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative">
          <GradientOrb
            className="-top-20 right-0"
            size={280}
            delay={0.1}
            cyan={false}
          />
          <motion.div
            className="max-w-4xl"
            style={{ opacity: whyMihubFade }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="font-story-headline font-bold mb-8 text-white leading-tight"
              {...smoothReveal}
            >
              Why MiHub
            </motion.h2>
            <motion.p
              className="max-w-2xl font-story-body text-white/85 mb-4"
              {...smoothReveal}
            >
              MiHub lets you see all you need to know about your building,
              yesterday, today and for tomorrow.
            </motion.p>
            <motion.p
              className="max-w-2xl font-story-body text-white/85"
              {...smoothReveal}
            >
              It doesn't just help you see what's happening now, it helps you
              understand what's about to happen next.
            </motion.p>
          </motion.div>
        </AnimatedSection>

        {/* All your building data in one place */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative py-16">
          <GradientOrb className="top-1/2 -left-32" size={380} />
          <motion.h2
            className="font-story-title font-bold mb-6 text-white"
            {...smoothReveal}
          >
            All your building data in one place
          </motion.h2>
          <motion.p
            className="max-w-3xl font-story-body text-white/85 mb-4"
            {...smoothReveal}
          >
            Buildings are complex. They produce a lot of data. All too often
            that data is inaccessible, or there is simply so much information
            that it becomes overwhelming.
          </motion.p>
          <motion.p
            className="max-w-3xl font-story-body font-medium text-cyan-200 mb-10"
            {...smoothReveal}
          >
            MiHub lets you cut through the noise to see and understand the data
            that you need to know.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
            <VisualPanel icon={Building2} label="" />
            <VisualPanel icon={Database} label="" />
          </div>
        </AnimatedSection>

        {/* Open API — with visuals */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 relative bg-black/95">
          <GradientOrb
            className="-right-40 top-1/4"
            size={320}
            delay={0.15}
            cyan={false}
          />
          <motion.h2
            className="font-story-title font-bold text-center mb-8 max-w-3xl text-white"
            {...smoothReveal}
          >
            Our openAPI protocol means that we can configure your MiHub to view:
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl w-full mt-6">
            {apiFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="group flex items-center gap-5 rounded-2xl p-6 md:p-7 bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
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
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon size={28} strokeWidth={1.8} />
                    </div>
                  </AnimatedIcon>
                  <p className="font-story-body font-medium text-white/95">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <motion.p
            className="mt-12 max-w-2xl text-center font-story-body text-white/80"
            {...smoothReveal}
          >
            No more jumping between tools or systems. Just one source, always up
            to date and always learning.
          </motion.p>
        </AnimatedSection>

        {/* Every feature, powered by our own AI */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative bg-black/95">
          <GradientOrb
            className="-left-40 bottom-1/4"
            size={320}
            cyan={false}
          />
          <div className="max-w-md mx-auto mb-8">
            <VisualPanel icon={Brain} label="" className="max-w-md mx-auto" />
          </div>
          <motion.h2
            className="font-story-headline font-bold mb-8 text-white max-w-4xl"
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

        {/* The Digital Twin — black section: full viewport width, title with glow, text left, video right */}
        <AnimatedSection
          className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 relative bg-black"
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
        >
          <motion.h2
            className="font-story-title font-bold mb-6 md:mb-8 text-center w-full text-white"
            style={{
              textShadow:
                "0 0 20px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.25), 0 0 80px rgba(34,211,238,0.15)",
            }}
            {...smoothReveal}
          >
            The Digital Twin
          </motion.h2>
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <motion.div className="flex flex-col justify-center order-2 lg:order-1" {...smoothReveal}>
              <p className="font-story-body text-white/90 leading-relaxed text-lg md:text-xl max-w-xl">
                MiHub gives you more than just day-to-day management. MiHub is your
                starting point for creating your building's digital twin.
              </p>
            </motion.div>
            <motion.div
              className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-[90vh] order-1 lg:order-2 overflow-hidden bg-black"
              {...smoothReveal}
            >
              <video
                src={bldgVideo}
                className="absolute inset-0 w-full h-full object-contain"
                playsInline
                muted
                loop
                autoPlay
                aria-label="Building digital twin"
              />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Why is this important? — cyan section only */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 relative bg-gradient-to-br from-cyan-900/95 via-[#0c8db6] to-cyan-800/95">
          <motion.p
            className="text-white font-story-body font-semibold mb-10 text-center"
            {...smoothReveal}
          >
            Why is this important?
          </motion.p>
          <motion.div
            className="w-full max-w-2xl mx-auto min-h-[220px] flex flex-col items-center justify-center rounded-3xl bg-white/10 border border-white/20 p-8 md:p-12 backdrop-blur-sm"
            {...smoothReveal}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              {digitalTwinIcons[digitalTwinIndex] &&
                (() => {
                  const Icon = digitalTwinIcons[digitalTwinIndex];
                  return (
                    <AnimatedIcon>
                      <Icon
                        size={40}
                        className="text-white flex-shrink-0"
                        strokeWidth={1.5}
                      />
                    </AnimatedIcon>
                  );
                })()}
              <p className="font-story-title font-semibold text-white text-center">
                {digitalTwinItems[digitalTwinIndex]}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              {digitalTwinItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setDigitalTwinIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === digitalTwinIndex ? "bg-white w-8" : "w-2 bg-white/40 hover:bg-white/60"}`}
                  aria-label={`View item ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
          <motion.p
            className="mt-10 max-w-2xl text-center font-story-body text-white/90"
            {...smoothReveal}
          >
            It'll even help you at the time of transaction by being an
            AI-powered data room.
          </motion.p>
        </AnimatedSection>

        {/* For Building Managers */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative bg-black/95">
          <GradientOrb
            className="-left-32 bottom-1/3"
            size={280}
            cyan={false}
          />
          <motion.h2
            className="font-story-title font-bold mb-8 text-white max-w-4xl"
            {...smoothReveal}
          >
            For Building Managers
          </motion.h2>
          <motion.p
            className="max-w-2xl font-story-body text-white/85"
            {...smoothReveal}
          >
            Whether you're managing a single building or an entire portfolio,
            MiHub's powerful dashboards and predictive analytics change how you
            see, manage, and understand your buildings. Even simple things like
            security reports and maintenance reports can all be collated and
            added into the knowledge base.
          </motion.p>
        </AnimatedSection>

        {/* The Data Room */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 text-center relative bg-black/95">
          <GradientOrb
            className="-right-40 bottom-1/4"
            size={320}
            cyan={false}
          />
          <div className="max-w-md mx-auto mb-8">
            <VisualPanel
              icon={FolderOpen}
              label=""
              className="max-w-md mx-auto"
            />
          </div>
          <motion.h2
            className="font-story-title font-bold mb-8 text-white"
            {...smoothReveal}
          >
            The Data Room — Live. Intelligent. Always Current.
          </motion.h2>
          <motion.p
            className="max-w-3xl font-story-body text-white/85 mb-6"
            {...smoothReveal}
          >
            A constantly updating data room for your building. Every document,
            drawing, log, sensor reading, and report — automatically organised,
            securely stored, and continuously refreshed.
          </motion.p>
          <motion.p
            className="max-w-3xl font-story-body text-white/85 mb-6"
            {...smoothReveal}
          >
            MiHub's AI-powered data room becomes your single destination for
            everything your building knows, learns, and generates.
          </motion.p>
          <motion.p
            className="font-story-body text-cyan-200 font-medium"
            {...smoothReveal}
          >
            No manual updates. No version confusion.
          </motion.p>
        </AnimatedSection>

        {/* Industry Firsts */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center relative">
          <GradientOrb className="-left-40 top-1/4" size={350} delay={0.1} />
          <motion.h2
            className="font-story-title font-bold mb-8 text-white max-w-4xl"
            {...smoothReveal}
          >
            A World of Industry Firsts
          </motion.h2>
          <motion.div
            className="max-w-2xl space-y-4 font-story-body text-white/85"
            {...smoothReveal}
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

        {/* CTA — What We Can Do For You */}
        <AnimatedSection className="min-h-screen flex flex-col justify-center items-center px-6 text-center relative bg-black/95">
          <GradientOrb className="-left-40 top-1/2" size={400} cyan={false} />
          <GradientOrb
            className="-right-40 bottom-1/2"
            size={350}
            delay={0.15}
            cyan={false}
          />
          <motion.h2
            className="font-story-title font-bold mb-8 text-white max-w-3xl"
            {...smoothReveal}
          >
            What We Can Do For You
          </motion.h2>
          <motion.p
            className="max-w-2xl font-story-body text-white/85 mb-10"
            {...smoothReveal}
          >
            Every organisation's needs are unique. That's why MiHub is designed
            to adapt. But we won't list every feature here. Get in touch to find
            out what MiHub can do for you.
          </motion.p>
          <Link to="/contact">
            <motion.button
              className="group inline-flex items-center gap-2 px-10 py-5 font-story-body bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-full shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
              <ChevronRight
                size={22}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </motion.button>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
