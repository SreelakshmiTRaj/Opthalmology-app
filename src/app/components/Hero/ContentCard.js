"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const sideArrow = "/images/sideArrow.svg";

export default function ContentCard({ activeLabel, labels }) {
  const content = {
    MARKET: (
      <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
        The market for clinical monitoring devices, including OCT technology, is
        experiencing rapid growth driven by the escalating demand for early
        disease detection and personalized healthcare solutions.
      </p>
    ),
    CONCEPT: (
      <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
        Our research is vital for tackling the increasing global burden of eye
        diseases, particularly as vision impairment and blindness become more
        prevalent in aging populations.
      </p>
    ),
    DESIGN: (
      <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
        Developing clinical monitoring systems utilizing OCT devices, with a
        focus on enhancing image resolution, improving ease of use, and
        integrating advanced data analytics.
      </p>
    ),
    TRIAL: (
      <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
        Clinical trials leveraging OCT technology are crucial for assessing the
        safety and efficacy of new treatments, offering real-time imaging data to
        monitor patient responses and outcomes.
      </p>
    ),
  };

  const currentContent = content[activeLabel.trim()] || null;

  return (
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
          {currentContent}

          <div className="flex items-center space-x-1.5 mt-6 justify-start">
            {labels.map((label) => {
              const isActive = activeLabel.trim() === label;
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
  );
}