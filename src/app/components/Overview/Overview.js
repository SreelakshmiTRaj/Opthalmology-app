"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Overview() {
    const backgroundSvgPath = "/images/overViewBg.svg";
  const [activeTab, setActiveTab] = useState("anterior");

  // Auto toggle every 3 seconds
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
          className="object-cover **opacity-20**" 
          quality={100}
        />
        {/* <div className="absolute inset-0 bg-[#0a1429]/30 z-10"></div> */}
      </div>
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide mb-10">
        <span className="text-[#38bdf8]">OVERVIEW</span> OF PROJECTS
      </h2>

      {/* Toggle Buttons */}
      <div className="relative mx-auto w-[392px] h-[44px] flex rounded-md overflow-visible bg-[#10203b] justify-center">
        {/* Anterior Button */}
        <div className="relative w-[196px]">
          <button
            onClick={() => setActiveTab("anterior")}
            className={`w-full h-[44px] font-semibold text-sm sm:text-base rounded-md transition-all duration-300 flex items-center justify-center
              ${
                activeTab === "anterior"
                  ? "bg-[#3AADED] text-white"
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
          >
            {/* 👇 Hide text when posterior is active */}
            {activeTab === "posterior" ? "" : "ANTERIOR"}
          </button>

          {/* Blue Underline for Anterior */}
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

        {/* Posterior Button */}
        <div className="relative w-[196px]">
          <button
            onClick={() => setActiveTab("posterior")}
            className={`w-full h-[44px] font-semibold text-sm sm:text-base rounded-md transition-all duration-300 flex items-center justify-center
              ${
                activeTab === "posterior"
                  ? "bg-[#3AADED] text-white"
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
          >
            POSTERIOR
          </button>

          {/* Blue Underline for Posterior */}
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
    </section>
  );
}
