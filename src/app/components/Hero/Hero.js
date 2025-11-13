"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import RotatingEyeCircle from "./RotatingEye";
import ContentCard from "./ContentCard";

const arrow = "/images/arrow.svg";
const line = "/images/Group 23.svg";
const mobileArrow = "/images/arrow_mobile.svg";

const labelAngles = {
  MARKET: -90,
  CONCEPT: 0,
  DESIGN: 90,
  TRIAL: 180,
};

const labels = ["CONCEPT", "MARKET", "TRIAL", "DESIGN"];

export default function Hero() {
  const [rotation, setRotation] = useState(0);
  const [activeLabel, setActiveLabel] = useState("CONCEPT");
  const [isMobile, setIsMobile] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [autoRotateIntervalId, setAutoRotateIntervalId] = useState(null);

  const calculateShortestRotationDelta = (from, to) => {
    let diff = (to - from) % 360;
    if (diff < -180) diff += 360;
    if (diff >= 180) diff -= 360;
    return diff;
  };

  const normalizeAngle = (angle) => ((angle % 360) + 360) % 360;

  const startAutoRotationLoop = () => {
    let currentIndex = labels.findIndex((l) => l === activeLabel.trim());

    if (autoRotateIntervalId) {
      clearInterval(autoRotateIntervalId);
    }

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % labels.length;
      const nextLabel = labels[currentIndex];

      const base = labelAngles[nextLabel];
      if (base === undefined) return;

      setActiveLabel(nextLabel);

      const screenAngle = isMobile ? 360 : 0;
      let desiredRotation = screenAngle - base;

      setRotation((current) => {
        const curNorm = normalizeAngle(current);
        let desiredNorm = normalizeAngle(desiredRotation);

        let delta = calculateShortestRotationDelta(curNorm, desiredNorm);

        return current + delta;
      });
    }, 5000);

    setAutoRotateIntervalId(intervalId);
  };

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsMedium(width >= 960 && width < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMobile && activeLabel === "CONCEPT") {
        setActiveLabel(" CONCEPT");
        setRotation(90);
      } else if (!isMobile && activeLabel === "DESIGN") {
        setActiveLabel("CONCEPT");
        setRotation(0);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (!autoRotateIntervalId) {
      startAutoRotationLoop();
    }

    return () => {
      if (autoRotateIntervalId) {
        clearInterval(autoRotateIntervalId);
      }
    };
  }, [isMobile, activeLabel]);

  return (
    <main className="pt-1 pb-32 relative z-10">
      <div className="max-w-[57rem] mx-auto flex flex-col items-center text-center space-y-7 mt-5">
        <h1 className="max-w-[62rem] text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-white tracking-tight">
          OPHTHALMOLOGY FOCUSED CRO{" "}
          <span className="text-sky-400">SINCE 2006</span>
        </h1>

        <p className="max-w-[50rem] text-lg leading-6 font-normal text-gray-300">
          Since its establishment in 2006, our ophthalmology-focused Clinical
          Research Organization (CRO) has specialized in delivering exceptional
          research operations and administration.
        </p>
      </div>

      <div className="relative max-w-[58.4rem] mx-auto mt-[5rem] flex flex-col lg:flex-row justify-between items-center gap-10 px-6 lg:px-0">
        <RotatingEyeCircle
          rotation={rotation}
          setRotation={setRotation}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
          isMobile={isMobile}
          labels={Object.keys(labelAngles)}
          autoRotateIntervalId={autoRotateIntervalId}
          setAutoRotateIntervalId={setAutoRotateIntervalId}
        />

        <div
          className={`absolute ${
            isMobile
              ? "top-1/2 left-55 w-10 h-10"
              : isMedium
              ? "top-[7.5rem] left- w-[6.5rem] h-[4.1rem]"
              : "top-[7.5rem] left-[26rem] w-[6.5rem] h-[4.1rem]"
          } transition-all duration-500`}
        >
          <Image
            src={isMobile ? mobileArrow : arrow}
            alt="Curved arrow"
            fill
            className='object-contain pointer-events-none select-none transition-transform duration-500'
          />
        </div>

        <ContentCard activeLabel={activeLabel} labels={labels} />
      </div>
    </main>
  );
}
