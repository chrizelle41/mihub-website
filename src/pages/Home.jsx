import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgVideo from "../assets/bgvid.mp4";

const apiFeatures = [
  "3D Models",
  "4D Models",
  "O&Ms",
  "CAFM",
  "Training Guides",
  "SOPs",
  "Floorplans",
  "Multiple datasets",
  "IoT integration",
  "Direct access to your BMS and EMS",
  "Tenants’ specific dashboards",
];

const digitalTwin = [
  "Risks across the whole building",
  "Compliance issues",
  "Damp & Mould (Awaab’s Law)",
  "Fire risks",
  "Building Safety Act compliance",
  "Evacuation compliance (Martyn’s Law)",
  "Remediation costs",
  "Disposal costs",
];

export default function Home() {
  const videoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    const viewportHeight = window.innerHeight;
    const progress = Math.min(Math.max(scrollY / viewportHeight, 0), 1);
    video.currentTime = progress * video.duration;
  }, [scrollY, videoLoaded]);

  return (
    <div className="relative text-white">
      {/* VIDEO BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={bgVideo}
          muted
          preload="auto"
          className="w-full h-full object-cover"
          onLoadedMetadata={() => setVideoLoaded(true)}
        />
        <motion.div
          className="absolute inset-0 bg-[#0c8db6]"
          style={{ opacity: scrollY / window.innerHeight }}
        />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            MiHub – the world’s most advanced real estate AI platform
          </motion.h1>

          <motion.p
            className="max-w-3xl text-xl text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            See everything about your building. Yesterday, today, and tomorrow.
          </motion.p>
        </section>

        {/* WHY MIHUB */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center">
          <motion.h2 className="text-5xl font-bold mb-10 text-cyan-200">
            Why MiHub
          </motion.h2>

          <div className="max-w-4xl space-y-6 text-lg">
            <p>
              MiHub lets you see all you need to know about your building,
              yesterday, today and for tomorrow.
            </p>

            <p>
              It doesn’t just help you see what’s happening now, it helps you
              understand what’s about to happen next.
            </p>

            <p>
              Buildings are complex and produce a lot of data. Too often that
              data is inaccessible or overwhelming.
            </p>

            <p className="text-xl font-semibold">
              MiHub lets you cut through the noise to see and understand the
              data that you need to know.
            </p>
          </div>
        </section>

        {/* ALL DATA SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center">
          <motion.h2 className="text-5xl font-bold mb-10">
            All your building data in one place
          </motion.h2>

          <p className="max-w-3xl text-lg mb-8">
            No more jumping between tools or systems. Just one source — always
            up to date and always learning.
          </p>
        </section>

        {/* OPEN API VISUAL GRID */}
        <section className="min-h-screen bg-black flex flex-col items-center px-6 md:px-20 py-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our openAPI protocol means that we can configure MiHub to view:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {apiFeatures.map((item, i) => (
              <motion.div
                key={i}
                className="h-40 flex items-center justify-center rounded-xl p-6 bg-gradient-to-br from-gray-800/40 to-black border border-cyan-400/40 shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg font-semibold text-center">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center">
          <h2 className="text-5xl font-bold mb-10 text-cyan-200">
            Every Feature Powered by Our AI
          </h2>

          <div className="max-w-4xl space-y-6 text-lg">
            <p>MiHub is fully AI-enabled.</p>

            <p>
              Every insight, automation, and prediction comes from our own AI
              engine trained specifically on your building data.
            </p>

            <p>
              Processing millions of data points daily, MiHub ensures you get
              the very best advice and operational support.
            </p>
          </div>
        </section>

        {/* DIGITAL TWIN */}
        <section className="min-h-screen bg-black flex flex-col items-center px-6 md:px-20 py-24 text-center">
          <h2 className="text-5xl font-bold mb-12">The Digital Twin</h2>

          <p className="max-w-3xl mb-10 text-lg">
            MiHub is your starting point for creating your building’s digital
            twin.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            {digitalTwin.map((item, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-lg border border-cyan-400/40 bg-gray-900"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        {/* BUILDING MANAGERS */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 text-center">
          <h2 className="text-5xl font-bold mb-8">For Building Managers</h2>

          <p className="max-w-4xl text-lg">
            Whether managing a single building or an entire portfolio, MiHub’s
            powerful dashboards and predictive analytics change how you
            understand and operate buildings.
          </p>
        </section>

        {/* DATA ROOM */}
        <section className="min-h-screen bg-black flex flex-col items-center px-6 md:px-20 py-24 text-center">
          <h2 className="text-5xl font-bold mb-10">
            The Data Room — Live. Intelligent. Always Current.
          </h2>

          <p className="max-w-4xl text-lg mb-6">
            Every document, drawing, log, sensor reading, and report
            automatically organised, securely stored and continuously refreshed.
          </p>

          <p className="max-w-4xl text-lg">
            No manual updates. No version confusion.
          </p>
        </section>

        {/* INDUSTRY FIRST */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-5xl font-bold mb-8">
            A World of Industry Firsts
          </h2>

          <p className="max-w-3xl text-lg mb-6">
            MiHub quietly powers a series of industry-first AI capabilities.
          </p>

          <p className="max-w-3xl text-lg">
            With projects starting from £15,000, cost is no longer a barrier.
          </p>
        </section>

        {/* TESTIMONIALS */}
        <section className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-5xl font-bold mb-12">What People Are Saying</h2>

          <p className="text-gray-400">Testimonials coming soon</p>
        </section>

        {/* CTA */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-5xl font-bold mb-8">What We Can Do For You</h2>

          <p className="max-w-3xl text-lg mb-10">
            Every organisation’s needs are unique. Get in touch to find out what
            MiHub can do for you.
          </p>

          <button className="px-10 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-lg font-semibold">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
}
