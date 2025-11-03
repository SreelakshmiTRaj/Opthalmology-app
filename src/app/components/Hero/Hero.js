"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const eyePath = "/images/eyeImage.png";
  const nerves = "/images/Nurves.svg";
  const arrow = "/images/arrow.png";
  const line = "/images/Group 23.svg";

  const [rotation, setRotation] = useState(0);
  const [activeLabel, setActiveLabel] = useState("CONCEPT");
  const [hoverLabel, setHoverLabel] = useState(null);

  const labelAngles = {
    MARKET: -90,
    CONCEPT: 0,
    DESIGN: 90,
    TRIAL: 180,
  };

  const shortestDelta = (from, to) => {
    let diff = (to - from) % 360;
    if (diff < -180) diff += 360;
    if (diff >= 180) diff -= 360;
    return diff;
  };

  const handleClickTo = (label) => {
    const angle = labelAngles[label];
    if (angle === undefined) return;

    setActiveLabel(label);
    setRotation((current) => {
      const curNorm = ((current % 360) + 360) % 360;
      const delta = shortestDelta(curNorm, -angle);
      return current + delta;
    });
  };

  const norm = (angle) => ((angle % 360) + 360) % 360;

  const isVerticalSlot = (angle) => {
    const a = norm(angle);
    const tol = 45;
    return a <= tol || a >= 360 - tol || Math.abs(a - 180) <= tol;
  };

  const getLabelDisplayRotation = (label) => {
    const base = labelAngles[label];
    if (base === undefined) return 0;

    const absAngle = norm(base + rotation);
    const vertical = isVerticalSlot(absAngle);
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

  return (
    <main className="pt-1 pb-32 relative z-10">
      {/* HERO TEXT */}
      <div className="container mx-auto px-6 sm:px-8 pt-1 sm:pt-10 pb-16 sm:pb-20 text-center">
        <h2 className="text-1xl sm:text-[10px] md:text-[30px] lg:text-[40px] font-extrabold mb-4 leading-snug sm:leading-tight text-white">
          OPHTHALMOLOGY FOCUSED CRO{" "}
          <span className="text-[#4DB1FF]">SINCE 2006</span>
        </h2>

        <p className="max-w-3xl md:max-w-4xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose px-2 sm:px-0">
          Since its establishment in 2006, our ophthalmology-focused Clinical
          Research Organization (CRO) has specialized in delivering exceptional
          research operations and administration.
        </p>
      </div>

      {/* HERO GRAPHICS */}
      <div className="flex flex-col lg:flex-row justify-center items-center mt-0 gap-16 ml-15">
        {/* Eye & Labels */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            animate={{ rotate: rotation }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image src={eyePath} alt="Eye" fill className="object-contain scale-80" />
            <Image src={nerves} alt="nerves" fill className="absolute" />

            {["MARKET", "CONCEPT", "DESIGN", "TRIAL"].map((label) => {
              const isActive = activeLabel === label;
              const isHovering = hoverLabel === label;

              return (
                <motion.div
                  key={label}
                  onClick={() => handleClickTo(label)}
                  onHoverStart={() => setHoverLabel(label)}
                  onHoverEnd={() => setHoverLabel(null)}
                  animate={{ rotate: getLabelDisplayRotation(label) }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={`group absolute text-xs sm:text-sm font-semibold cursor-pointer rounded-md px-5 py-2
                    ${
                      label === "MARKET"
                        ? "top-[-25px] left-1/2 -translate-x-1/2"
                        : label === "CONCEPT"
                        ? "right-[-50px] top-1/2 -translate-y-1/2"
                        : label === "DESIGN"
                        ? "bottom-[-25px] left-1/2 -translate-x-1/2"
                        : "left-[-50px] top-1/2 -translate-y-1/2"
                    }
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

        {/* Text Box + CTA */}
        <div className="relative w-full lg:w-1/2 pt-10 lg:pl-16 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Image
            src={arrow}
            alt="Curved arrow"
            width={160}
            height={160}
            className="absolute left-[-35px] top-1/4 w-30"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeLabel}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-gradient-to-r from-[#071631] to-[#13325F] p-7 sm:p-8 rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.25)] max-w-md text-white leading-relaxed backdrop-blur-[1px] ml-6"
            >
              {activeLabel === "MARKET" && (
                <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
                  The market for clinical monitoring devices, including OCT
                  technology, is experiencing rapid growth driven by the
                  escalating demand for early disease detection and personalized
                  healthcare solutions.
                </p>
              )}
              {activeLabel === "CONCEPT" && (
                <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
                  Our research is vital for tackling the increasing global
                  burden of eye diseases, particularly as vision impairment and
                  blindness become more prevalent in aging populations.
                </p>
              )}
              {activeLabel === "DESIGN" && (
                <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
                  Developing clinical monitoring systems utilizing OCT devices,
                  with a focus on enhancing image resolution, improving ease of
                  use, and integrating advanced data analytics.
                </p>
              )}
              {activeLabel === "TRIAL" && (
                <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
                  Clinical trials leveraging OCT technology are crucial for
                  assessing the safety and efficacy of new treatments, offering
                  real-time imaging data to monitor patient responses and
                  outcomes.
                </p>
              )}

              <div className="flex items-center space-x-1.5 mt-6 justify-start">
                {["MARKET", "CONCEPT", "DESIGN", "TRIAL"].map((label) => (
                  <div
                    key={label}
                    className={`w-3 h-3 rounded-[2px] ${
                      activeLabel === label ? "bg-[#3CA8FF]" : "bg-white/35"
                    }`}
                  ></div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="mt-15 lg:mt-16 flex flex-col items-start text-left w-fit mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider">
              YOUR VISION IS OUR VISION
            </h3>
            <a
              href="#"
              className="group flex items-center mt-3 text-sky-400 font-semibold transition duration-300"
            >
              Let us guide you on your journey to FDA approval
              <div
                className="w-8 h-8 ml-3 border border-accent-blue rounded-full flex items-center justify-center 
                  bg-transparent transition-all duration-300 ease-in-out 
                  group-hover:bg-accent-blue group-hover:border-accent-blue group-hover:scale-110"
              >
                <svg
                  className="w-4 h-4 text-accent-blue transition-all duration-300 ease-in-out group-hover:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>

                <svg
                  className="hidden w-4 h-4 text-white transition-all duration-300 ease-in-out group-hover:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m0 0l-5-5m5 5l-5 5" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Zigzag Line */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <Image
          src={line}
          alt="Zigzag border"
          width={1920}
          height={120}
          className="w-full h-auto object-cover pointer-events-none select-none"
        />
      </div>
    </main>
  );
}
