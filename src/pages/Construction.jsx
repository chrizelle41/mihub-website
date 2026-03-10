import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// HERO VIDEO
import heroVideo from "../assets/construction-video.mp4";

// Images
import iBID from "../assets/ibid.png";
import ReportIt from "../assets/report.png";
import In1Place from "../assets/in1Place.png";
import SlimBIM from "../assets/slimbim.png";
import Placeholder from "../assets/17.png";
import Img1 from "../assets/1.png";
import Img4 from "../assets/4.png";
import Img3 from "../assets/3.png";

export default function Construction() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

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

  // ===============================
  // STORY CARDS DATA
  // ===============================
  const cards = [
    {
      img: iBID,
      title: "iBid",
      desc: "A powerful presentation tool for your bid submissions.",
    },
    {
      img: ReportIt,
      title: "Report-It",
      desc: "A quick and easy to use app for your teams to report on site health and safety issues. Available in multiple languages.",
    },
    {
      img: In1Place,
      title: "In1Place – Community Engagement",
      desc: "Make sure your site staff, key stakeholders and the local community are kept up to date with all the latest news from your Construction Site.",
    },
    {
      img: SlimBIM,
      title: "SlimBIM",
      desc: "Lightweight BIM modelling for mobile devices.",
    },
    {
      img: Img1,
      title: "Digital Twins",
      desc: "Golden Thread tracking including Blockchain. Build a digital twin of your building in simple, easy to manage steps.",
    },
    {
      img: Img4,
      title: "Digital O&Ms",
      desc: "All of your operations and maintenance manuals for your onsite FM team, all together, in one place. AI enabled.",
    },
    {
      img: Img3,
      title: "Digital Training Guides",
      desc: "Use your digital twin to deliver onsite training guides & SOPs.",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-[#05070A] via-[#0A0F18] to-[#05070A] text-white relative">
      {/* ===========================
            HERO
      ============================ */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          src={heroVideo}
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#05070A]/70 to-transparent"></div>

        {/* HERO TEXT */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl drop-shadow-[0_0_45px_rgba(56,189,248,0.6)]">
            MiHub for Construction
          </h1>

          <p className="mt-6 text-2xl md:text-3xl opacity-90 max-w-3xl">
            Win it. Build it. Deliver it.
          </p>
        </motion.div>

        {/* MUTE BUTTON */}
        <button
          onClick={() => {
            const newState = !isMuted;
            videoRef.current.muted = newState;
            setIsMuted(newState);
          }}
          className="absolute bottom-6 right-6 z-50 bg-black/60 hover:bg-black/80 p-3 rounded-full border border-white/10 backdrop-blur-md transition-all duration-200"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </section>

      {/* ===========================
            INTRO
      ============================ */}
      <section className="py-32 px-6 text-center max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF] text-transparent bg-clip-text"
        >
          MiHub powers a suite of apps developed for the trade
        </motion.h2>
      </section>

      {/* ===========================
            STORY CARDS (ALTERNATING)
      ============================ */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto space-y-40">
        {cards.map((card, index) => {
          const reversed = index % 2 !== 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row items-center gap-20 ${
                reversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2 w-full flex justify-center"
              >
                <img
                  src={card.img || Placeholder}
                  alt={card.title}
                  className="
                    w-full max-w-[720px]
                    transition-all duration-500
                    drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]
                    drop-shadow-[0_0_45px_rgba(56,189,248,0.3)]
                    hover:drop-shadow-[0_0_75px_rgba(56,189,248,0.9)]
                  "
                />
              </motion.div>

              {/* TEXT */}
              <div className="md:w-1/2 w-full space-y-6">
                <h3 className="text-4xl md:text-5xl font-bold text-[#38BDF8]">
                  {card.title}
                </h3>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
