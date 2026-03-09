import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, File, FileStack, FileSpreadsheet } from "lucide-react";

const SCROLL_RANGE = 1.8;

const DOCUMENT_ICONS = [FileText, File, FileStack, FileSpreadsheet];

function lerp(a, b, t) {
  const T = Math.max(0, Math.min(1, t));
  return a + (b - a) * T;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function seededRandom(seed) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function ScrollBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

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

  const scrollEnd = viewportHeight * SCROLL_RANGE;
  const progress = Math.min(scrollY / scrollEnd, 1);

  // Scattered document icons (outline) — same random positions in bottom area, then absorbed into core
  const particles = useMemo(() => {
    const count = 32;
    return Array.from({ length: count }, (_, i) => {
      const r1 = seededRandom(i * 7 + 1);
      const r2 = seededRandom(i * 11 + 2);
      const r3 = seededRandom(i * 13 + 3);
      const r4 = seededRandom(i * 17 + 4);
      return {
        id: i,
        Icon: DOCUMENT_ICONS[i % DOCUMENT_ICONS.length],
        startX: 6 + r1 * 88,
        startY: 50 + r2 * 44,
        size: 36 + Math.floor(r3 * 32),
        startRotate: (r4 - 0.5) * 24,
        delay: r2 * 0.1,
      };
    });
  }, []);

  // Core: appear ~0.15, absorb 0.2–0.55, zoom 0.55–1
  const coreVisible = progress >= 0.12;
  const coreScaleSmall = progress < 0.25
    ? lerp(0, 1, (progress - 0.12) / 0.13)
    : 1;
  const coreScaleZoom = progress < 0.55
    ? 1
    : lerp(1, 28, (progress - 0.55) / 0.45);
  const coreScale = coreScaleSmall * coreScaleZoom;

  const coreOpacity = progress < 0.55
    ? lerp(0.4, 1, (progress - 0.12) / 0.2)
    : 1;

  // Cyan overlay: ramp up as core zooms (so by end it's solid cyan)
  const cyanOverlayOpacity = lerp(0, 1, (progress - 0.5) / 0.5);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0f]">
      {/* Scattered file particles */}
      {particles.map(({ id, Icon, startX, startY, size, startRotate, delay }) => {
        const absorbStart = 0.18;
        const absorbEnd = 0.56;
        const rawT = progress < absorbStart + delay
          ? 0
          : Math.min(1, (progress - absorbStart - delay) / (absorbEnd - absorbStart - delay));
        const absorbT = easeOutCubic(rawT);
        const x = lerp(startX, 50, absorbT);
        const y = lerp(startY, 50, absorbT);
        const scale = 1 - absorbT * 0.9;
        const rotate = startRotate + absorbT * 180;
        let opacity = progress < absorbStart ? 0.92 : Math.max(0, 1 - absorbT * 1.15);
        const inCenterZone = x >= 28 && x <= 72 && y >= 32 && y <= 68;
        if (inCenterZone) opacity = 0;
        if (opacity <= 0) return null;

        return (
          <motion.div
            key={id}
            className="absolute pointer-events-none will-change-transform flex items-center justify-center"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
              opacity,
              width: size,
              height: size,
            }}
          >
            <motion.div
              className="flex items-center justify-center"
              animate={{
                y: [0, -6, 0],
                x: [0, 3, 0],
              }}
              transition={{
                duration: 2.8 + (id % 5) * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (id % 12) * 0.08,
              }}
              style={{
                color: "rgba(34, 211, 238, 0.95)",
                filter: "drop-shadow(0 0 14px rgba(34,211,238,0.6)) drop-shadow(0 0 28px rgba(34,211,238,0.35)) drop-shadow(0 2px 8px rgba(0,0,0,0.2))",
              }}
            >
              <Icon size={size} strokeWidth={1.5} className="shrink-0" />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Core — appears, then zooms to become background */}
      {coreVisible && (
        <motion.div
          className="absolute left-1/2 top-1/2 origin-center pointer-events-none will-change-transform"
          style={{
            width: 140,
            height: 140,
            marginLeft: -70,
            marginTop: -70,
            transform: `scale(${coreScale})`,
            opacity: coreOpacity,
          }}
        >
          <div
            className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-[#0c8db6] shadow-[0_0_80px_rgba(34,211,238,0.6),0_0_160px_rgba(34,211,238,0.3)]"
            style={{
              border: "2px solid rgba(34, 211, 238, 0.5)",
            }}
          />
        </motion.div>
      )}

      {/* Cyan overlay once core has expanded — ensures solid cyan background */}
      <div
        className="absolute inset-0 bg-[#0c8db6]"
        style={{ opacity: cyanOverlayOpacity, pointerEvents: "none" }}
      />
    </div>
  );
}
