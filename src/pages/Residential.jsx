import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// HERO VIDEO
import residentialVideo from "../assets/residential.mp4";

// PNG mockups
import Img1 from "../assets/7.png";
import Img3 from "../assets/2.png";
import Img2 from "../assets/apartmentfinder.png";

export default function Residential() {
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

  const cards = [
    {
      img: Img1,
      title: "SiteSeen",
      desc: "A powerful, off-plan sales app for your sales negotiators",
    },
    {
      img: Img2,
      title: "Apartment Finder",
      desc: "A feature packed, sales app to promote your development in the AppStore or on Google Play",
    },
    {
      img: Img3,
      title: "TheHomeUserGuide™",
      desc: "Everything your residents want to know in one simple app.  Help guides, notifications, owners’ manuals, certificates.  Available in multiple languages",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-[#05070A] via-[#0A0F18] to-[#05070A] text-white relative">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          src={residentialVideo}
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#05070A]/70 to-transparent"></div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
            MiHub for Residential Developments
          </h1>
          <p className="mt-6 text-2xl md:text-3xl max-w-3xl opacity-90">
            Build it. Engage it. Sell it.
          </p>
        </motion.div>

        {/* SOUND BUTTON */}
        <button
          onClick={() => {
            const newState = !isMuted;
            videoRef.current.muted = newState;
            setIsMuted(newState);
          }}
          className="absolute bottom-6 right-6 z-[50] bg-black/60 hover:bg-black/80 p-3 rounded-full backdrop-blur-md border border-white/10 transition-all duration-200"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </section>

      {/* INTRO */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#1A8CFF] via-[#38BDF8] to-[#6FD2FF] text-transparent bg-clip-text">
            A Suite of Apps Tailored for the Residential Market
          </h2>

          <p className="mt-8 text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            MiHub powers every stage of the residential journey — from
            interactive off-plan sales, to resident onboarding, to long-term
            management and community experience.
          </p>
        </motion.div>
      </section>

      {/* STORY CARDS */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto space-y-40">
        {cards.map((card, index) => {
          const reversed = index % 2 !== 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
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
                  src={card.img}
                  alt={card.title}
                  className="
                    w-full max-w-[720px]
                    transition-all duration-500
                    drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]
                    drop-shadow-[0_0_45px_rgba(56,189,248,0.3)]
                    hover:drop-shadow-[0_0_70px_rgba(56,189,248,0.85)]
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
