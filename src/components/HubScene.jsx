import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function HubScene({ unify, absorb, zoom }) {
  const PARTICLE_COUNT = 90;
  const HUB_RADIUS = 220;
  const startOffsetY = 200; // core starts below hero

  const particles = useMemo(() => {
    const arr = [];
    const rings = 3;
    const perRing = PARTICLE_COUNT / rings;

    for (let r = 1; r <= rings; r++) {
      const radius = (r / rings) * HUB_RADIUS;

      for (let i = 0; i < perRing; i++) {
        const angle = (i / perRing) * Math.PI * 2;
        const targetX = Math.cos(angle) * radius;
        const targetY = Math.sin(angle) * radius + startOffsetY;
        const startX = targetX * 3.5; // scattered far out
        const startY = targetY * 3.5;
        arr.push({
          startX,
          startY,
          targetX,
          targetY,
          scaleOffset: 0.9 + Math.random() * 0.2,
        });
      }
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* CORE */}
      <motion.div
        className="w-48 h-48 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#0c8db6] shadow-[0_0_90px_rgba(79,195,247,0.45)]"
        animate={{
          scale: 1 + zoom * 40,
          y: startOffsetY * (1 - zoom),
        }}
        transition={{ ease: "easeOut", duration: 0.35 }}
      />

      {/* FILE PARTICLES */}
      {particles.map((p, i) => {
        const x = p.startX + (p.targetX - p.startX) * unify;
        const y = p.startY + (p.targetY - p.startY) * unify;

        return (
          <motion.div
            key={i}
            animate={{
              x,
              y,
              scale: (1 - zoom) * p.scaleOffset,
              opacity: 1 - absorb,
            }}
            transition={{ ease: "easeOut", duration: 0.45 }}
            className="absolute w-10 h-12 rounded-md bg-white/10 backdrop-blur-sm border border-white/10"
          />
        );
      })}
    </div>
  );
}
