"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Overview() {
  const backgroundSvgPath = "/images/overViewBg.svg";
  const [activeTab, setActiveTab] = useState("anterior");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "anterior" ? "posterior" : "anterior"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  

  return (
    <section className="relative w-full py-20 text-center bg-[#0a1429] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundSvgPath}
          alt="Technical Background Pattern"
          fill
          className="object-cover opacity-20"
          quality={100}
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide mb-10">
        <span className="text-[#38bdf8]">OVERVIEW</span> OF PROJECTS
      </h2>

      {/* Toggle Buttons */}
      <div className="relative mx-auto w-[392px] h-[44px] flex rounded-md overflow-visible bg-[#10203b] justify-center">
        {/* Anterior */}
        <div className="relative w-[196px]">
          <button
            onClick={() => setActiveTab("anterior")}
            className={`w-full h-[44px] font-semibold text-sm rounded-md transition-all duration-300 flex items-center justify-center
            ${
              activeTab === "anterior"
                ? "bg-[#3AADED] text-white"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            ANTERIOR
          </button>

          <AnimatePresence mode="wait">
            {activeTab === "anterior" && (
              <motion.div
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.25 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-[35px] h-[3px] bg-[#3AADED] rounded-full"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Posterior */}
        <div className="relative w-[196px]">
          <button
            onClick={() => setActiveTab("posterior")}
            className={`w-full h-[44px] font-semibold text-sm rounded-md transition-all duration-300 flex items-center justify-center
            ${
              activeTab === "posterior"
                ? "bg-[#3AADED] text-white"
                : "bg-transparent text-gray-300 hover:text-white"
            }`}
          >
            POSTERIOR
          </button>

          <AnimatePresence mode="wait">
            {activeTab === "posterior" && (
              <motion.div
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.25 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-[35px] h-[3px] bg-[#3AADED] rounded-full"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative w-full flex justify-center items-center mt-30">
        {/* Camera */}
        <div className="relative w-[150px] h-[150px]">
          <Image
            src="/images/machineAnteriorDefault.svg"
            alt="Camera"
            fill
            className="object-contain"
          />
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-[420px] h-[120px] flex items-center justify-center"
        >
          <div className="relative w-[420px] h-[120px] flex items-center justify-center overflow-visible">
            {/* --- CENTER CORE BEAM --- */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-full h-[10px]
                  bg-gradient-to-r from-[#3AADED] via-[#9bd9ff] to-transparent 
                  opacity-90 blur-[2px] rounded-full"
            />

            {/* --- SOFT GLOW AROUND THE CORE --- */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-full h-[40px]
                  bg-gradient-to-r from-[#3AADED]/40 via-[#9bd9ff]/20 to-transparent
                  blur-[20px]"
            />

            {/* --- REPEATING DASH LINES (perspective spread) --- */}
            {/* --- ANGLED PERSPECTIVE LINES --- */}
            <div
              className="absolute left-0 top-0 w-full h-full origin-left"
              style={{
                transform: "rotate(-4deg)", // <-- angle of perspective
              }}
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 h-[1px] bg-gradient-to-r from-[#9bd9ff]/40 to-transparent"
                  style={{
                    top: `${20 + i * 10}px`, // vertical spacing
                    width: `${100 - i * 4}%`, // perspective shortening
                    opacity: 1 - i * 0.07, // fade like the reference image
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Eye */}
        <div className="relative w-[150px] h-[150px]">
          <Image
            src="/images/eyeAnteriorDefault.svg"
            alt="Eye"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
