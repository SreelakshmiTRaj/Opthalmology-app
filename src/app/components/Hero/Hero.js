"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const eyePath = "/images/eyeImage.png";
  const nerves = "/images/Nurves.svg";
  const arrow = "/images/arrow.svg";
  const line = "/images/Group 23.svg";
  const sideArrow = "/images/sideArrow.svg";

  const [rotation, setRotation] = useState(0);
  const [activeLabel, setActiveLabel] = useState("CONCEPT");
  const [hoverLabel, setHoverLabel] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMedium, setIsMedium] = useState(false);

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

  const labelAngles = {
    MARKET: -90,
    CONCEPT: 0,
    DESIGN: 90,
    TRIAL: 180,
  };

  // On mobile, the active label
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

  const shortestDelta = (from, to) => {
    let diff = (to - from) % 360;
    if (diff < -180) diff += 360;
    if (diff >= 180) diff -= 360;
    return diff;
  };

  const handleClickTo = (label) => {
    const base = labelAngles[label];
    if (base === undefined) return;

    setActiveLabel(label);

    const screenAngle = isMobile ? 360 : 0;

    let desiredRotation = screenAngle - base;

    setRotation((current) => {
      const curNorm = ((current % 360) + 360) % 360;
      let desiredNorm = ((desiredRotation % 360) + 360) % 360;

      let delta = (desiredNorm - curNorm) % 360;
      if (delta < -180) delta += 360;
      if (delta >= 180) delta -= 360;

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
        <div className="relative w-[22.4rem] h-[22.9rem] flex items-center justify-center mx-auto">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            animate={{ rotate: rotation }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="relative w-[16.3rem] h-[16.25rem]">
              <Image
                src={eyePath}
                alt="Eye"
                fill
                className="object-contain pointer-events-none select-none"
              />
            </div>

            <div className="absolute top-[1.2rem] left-[1.3rem] w-[19.7rem] h-[20rem]">
              <Image
                src={nerves}
                alt="Nerves"
                fill
                className="object-contain pointer-events-none select-none"
              />
            </div>

            {["MARKET", "CONCEPT", "DESIGN", "TRIAL"].map((label) => {
              const isActive = activeLabel === label;
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

              const positionClasses = isMobile
                ? mobilePosition
                : desktopPosition;

              return (
                <motion.div
                  key={label}
                  onClick={() => handleClickTo(label)}
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

        <div
          className={`absolute ${
            isMobile
              ? "top-1/2 left-1/2 translate-x-1/2 w-10 h-10"
              : isMedium
              ? "top-[7.5rem] left- w-[6.5rem] h-[4.1rem]"
              :"top-[7.5rem] left-[26rem] w-[6.5rem] h-[4.1rem]"
          } transition-all duration-500`}
        >
          <Image
            src={arrow}
            alt="Curved arrow"
            fill
            className={`object-contain pointer-events-none select-none ${isMobile ? 'rotate-90':''}`}
          />
        </div>

        <div className="relative w-full lg:w-1/2 pt-10 lg:pl-16 flex flex-col items-center lg:items-start text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLabel}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-[431px] h-[221px] rounded-[32px]
                 bg-[linear-gradient(90deg,rgba(58,173,237,0.0)_0%,rgba(58,173,237,0.01)_100%)]
                 backdrop-blur-[5px] p-8 text-white leading-relaxed shadow-[0_4px_25px_rgba(0,0,0,0.25)]"
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
                {["MARKET", "CONCEPT", "DESIGN", "TRIAL"].map((label) => {
                  const isActive = activeLabel === label;
                  return (
                    <div
                      key={label}
                      className={`h-[9px] transition-all duration-300 rounded-[2px] ${
                        isActive
                          ? "w-[19px] bg-[#3AADED] opacity-100"
                          : "w-[9px] bg-white/35 opacity-80"
                      }`}
                    ></div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="mt-10 w-[27rem] h-[4.4rem] rounded-[24px] flex flex-col justify-center px-6">
            <h3 className="text-[1.375rem] leading-none font-bold uppercase tracking-[0.04em] text-white font-poppins">
              YOUR VISION IS OUR VISION
            </h3>

            <a
              href="#"
              className="group inline-flex items-center font-poppins font-semibold text-[1rem] leading-none text-[#3AADED] transition duration-300"
            >
              <span className="whitespace-nowrap">
                Let us guide you on your journey to FDA approval
              </span>

              <div
                className="ml-3 w-10 h-10 border border-[#3AADED] rounded-full flex items-center justify-center 
    bg-transparent transition-all duration-300 ease-in-out 
    group-hover:bg-[#3AADED] group-hover:border-[#3AADED] group-hover:scale-110 relative flex-shrink-0"
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <Image
                    src={sideArrow}
                    alt="Arrow"
                    fill
                    className="object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                  />
                </div>

                <svg
                  className="absolute w-5 h-5 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m0 0l-5-5m5 5l-5 5"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Zigzag Line */}
      <div className="absolute bottom-0 w-full z-20">
        <Image
          src={line}
          alt="Zigzag border"
          width={2000}
          height={120}
          className="w-full h-auto object-cover pointer-events-none select-none"
        />
      </div>
    </main>
  );
}
