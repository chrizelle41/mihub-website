import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import hubVideoFile from "../assets/hub-video.mp4"; // your video file

function HubObjects({ progress }) {
  const hubRef = useRef();
  const videoRef = useRef();

  // Create a video element
  useEffect(() => {
    const video = document.createElement("video");
    video.src = hubVideoFile;
    video.crossOrigin = "anonymous";
    video.loop = false;
    video.muted = true;
    video.playbackRate = 0;
    videoRef.current = video;
  }, []);

  // Video texture
  const videoTexture = useMemo(() => {
    if (!videoRef.current) return null;
    return new THREE.VideoTexture(videoRef.current);
  }, [videoRef.current]);

  useFrame(() => {
    if (!hubRef.current || !videoRef.current) return;

    // Hub scale with scroll
    const minScale = 0.05;
    const maxScale = 3;
    const scale = THREE.MathUtils.lerp(
      minScale,
      maxScale,
      Math.min(progress, 1),
    );
    hubRef.current.scale.set(scale, scale, scale);

    // Control video playback by scroll
    if (videoRef.current && videoRef.current.duration) {
      const frame =
        THREE.MathUtils.clamp(progress, 0, 1) * videoRef.current.duration;
      videoRef.current.currentTime = frame;
    }
  });

  return (
    <Float floatIntensity={1} rotationIntensity={0.5}>
      <mesh ref={hubRef}>
        <sphereGeometry args={[50, 64, 64]} />
        {videoTexture && <meshStandardMaterial map={videoTexture} />}
      </mesh>
    </Float>
  );
}

export default function HubScene3D({ progress }) {
  return (
    <Canvas camera={{ position: [0, 0, 600], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 400]} intensity={2} />
      <HubObjects progress={progress} />
    </Canvas>
  );
}
