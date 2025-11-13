"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const eyePath = "/images/eyeImage.png";
const nerves = "/images/Nurves.svg";

const labelAngles = {
  MARKET: -90,
  CONCEPT: 0,
  DESIGN: 90,
  TRIAL: 180,
};

const calculateShortestRotationDelta = (from, to) => {
  let diff = (to - from) % 360;
  if (diff < -180) diff += 360;
  if (diff >= 180) diff -= 360;
  return diff;
};

const normalizeAngle = (angle) => ((angle % 360) + 360) % 360;

const isLabelInVerticalSlot = (angle) => {
  const a = normalizeAngle(angle);
  const tol = 45;
  return a <= tol || a >= 360 - tol || Math.abs(a - 180) <= tol;
};

export default function RotatingEye({
  rotation,
  setRotation,
  activeLabel,
  setActiveLabel,
  isMobile,
  labels,
  autoRotateIntervalId, 
  setAutoRotateIntervalId, 
}) {
  const [hoverLabel, setHoverLabel] = useState(null);

  const getLabelDisplayRotation = (label) => {
    const base = labelAngles[label];
    if (base === undefined) return 0;

    const absAngle = normalizeAngle(base + rotation);
    const vertical = isLabelInVerticalSlot(absAngle);
    let slotRotation = 0;

    if (vertical) {
      slotRotation = -90;
    } else {
      if (absAngle >= 315 || absAngle <= 45) {
        slotRotation = 180;
      } else {
        slotRotation = 0;
      }
    }

    return -rotation + slotRotation;
  };

  const handleLabelClick = (label) => {
    if (autoRotateIntervalId) {
      clearInterval(autoRotateIntervalId);
      setAutoRotateIntervalId(null);
    }

    const base = labelAngles[label];
    if (base === undefined) return;

    setActiveLabel(label);

    const screenAngle = isMobile ? 360 : 0;
    let desiredRotation = screenAngle - base;

    setRotation((current) => {
      const curNorm = ((current % 360) + 360) % 360;
      let desiredNorm = ((desiredRotation % 360) + 360) % 360;

      let delta = calculateShortestRotationDelta(curNorm, desiredNorm);

      return current + delta;
    });
  };

  return (
    <div className="relative w-[22.4rem] h-[22.9rem] flex items-center justify-center mx-auto">
      <div className="relative w-[16.3rem] h-[16.25rem] z-10">
        <Image
          src={eyePath}
          alt="Eye"
          fill
          className="object-contain pointer-events-none select-none"
        />
      </div>

      <motion.div
        className="absolute w-full h-full flex items-center justify-center z-20"
        animate={{ rotate: rotation }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="absolute top-[1.2rem] left-[1.3rem] w-[19.7rem] h-[20rem]">
          <Image
            src={nerves}
            alt="Nerves"
            fill
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {labels.map((label) => {
          const isActive = activeLabel.trim() === label;
          const isHovering = hoverLabel === label;

          // Desktop positions
          const desktopPosition =
            label === "MARKET"
              ? "top-[0.04rem] left-1/2 -translate-x-1/2"
              : label === "CONCEPT"
              ? "right-[-2.2rem] top-45 -translate-y-1/2"
              : label === "DESIGN"
              ? "bottom-[0.2rem] left-1/2 -translate-x-1/2"
              : "left-[-2.1rem] top-45 -translate-y-1/2";

          // Mobile/medium positions
          const mobilePosition =
            label === "CONCEPT"
              ? "bottom-0 left-1/2 -translate-x-1/2 rotate-90"
              : label === "TRIAL"
              ? "top-0 left-1/2 -translate-x-1/2 rotate-90"
              : label === "DESIGN"
              ? "-left-8 top-1/2 -translate-y-1/2 rotate-90"
              : "-right-8 top-1/2 -translate-y-1/2 rotate-90";

          const positionClasses = isMobile ? mobilePosition : desktopPosition;

          return (
            <motion.div
              key={label}
              onClick={() => handleLabelClick(label)}
              onHoverStart={() => setHoverLabel(label)}
              onHoverEnd={() => setHoverLabel(null)}
              animate={{ rotate: getLabelDisplayRotation(label) }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`group absolute ${positionClasses}
        text-xs sm:text-sm font-semibold cursor-pointer rounded-[4px]
        w-[6.1rem] h-[2.625rem] flex items-center justify-center
        px-[2.125rem] py-[1rem]
        ${isActive ? "bg-white text-black" : "bg-[#0B2A4A] text-white"}
      `}
            >
              {label}

              {isActive && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`absolute left-1/2 -translate-x-1/2 h-[3px] w-[28px] bg-white rounded-sm
            ${label === "CONCEPT" ? "bottom-[-6px]" : "bottom-[-10px]"}`}
                />
              )}

              <AnimatePresence>
                {!isActive && isHovering && (
                  <motion.div
                    key={`${label}-hover`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`absolute left-1/2 -translate-x-1/2 h-[3px] w-[28px] bg-white/70 rounded-sm
              ${label === "CONCEPT" ? "bottom-[-6px]" : "bottom-[-10px]"}`}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}