"use client";
import Navbar from "../Navbar/Navbar";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const colors = {
  primaryDark: "#0b1626",
  secondaryDark: "#1e2d40",
  primaryBlue: "#38bdf8",
  accentBlue: "#167ee6",
  whiteButtonBg: "#ffffff",
};

export default function Header() {
  const headerNavItems = [
    "Home",
    "Services",
    "Eye is the Window",
    "For Sites",
    "Company",
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bgImagePath = "/images/bgImage.svg";
  const eyePath = "/images/eyeImage.png";
  const nerves = "/images/Nurves.svg";
  const arrow = "/images/arrow.png";
  const bodyGraphicPath = "/images/Body.svg";

  const bodyLabelClasses = `absolute z-20 text-xs font-medium py-1 px-3 rounded-full text-white whitespace-nowrap cursor-pointer`;

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
    <section className="relative w-full min-h-screen bg-primary-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImagePath}
          alt="background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-primary-dark opacity-80 z-10"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-6 relative z-20">
          <div className="flex items-center h-[82px] w-auto relative">
            <div
              className="rounded-full bg-white w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] absolute left-0 top-1/2 transform -translate-y-1/2"
              role="img"
              aria-label="Logo Icon"
            ></div>

            <div className="ml-[65px] sm:ml-[85px] flex flex-col justify-center h-full">
              <div className="text-white text-lg sm:text-2xl md:text-[30px] font-extrabold leading-none">
                LOGO
              </div>
              <div className="text-gray-400 mt-2 sm:mt-4 text-xs sm:text-sm font-semibold leading-none">
                LOGO SUBTITLE
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <nav className="bg-slate-700/70 h-10 flex space-x-1 text-sm font-semibold rounded-lg px-4 py-3">
              {headerNavItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`px-3 md:px-4 transition-colors duration-200 ${
                    item === "Home"
                      ? "text-sky-400"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 rounded-lg transition duration-150 text-xs sm:text-sm whitespace-nowrap">
              Become an Investigator
            </button>

            <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-3 rounded-lg transition duration-150 text-xs sm:text-sm whitespace-nowrap border border-white">
              Become Study Participant
            </button>

            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-transparent border border-white/10 rounded-full cursor-pointer hover:bg-white/10">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-slate-800/90 text-white flex flex-col items-center py-4 space-y-3 lg:hidden rounded-b-lg shadow-md backdrop-blur">
              {headerNavItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm ${
                    item === "Home"
                      ? "text-sky-400"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}

              <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm">
                Become an Investigator
              </button>

              <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-150 text-sm border border-white">
                Become Study Participant
              </button>
            </div>
          )}
        </header>

        <main className="pt-1 pb-32">
          <div className="relative z-10 container mx-auto px-6 sm:px-8 pt-1 sm:pt-10 pb-16 sm:pb-20 text-center">
            <h2 className="text-1xl sm:text-3xl md:text-4xl lg:text-1xl font-extrabold mb-4 leading-snug sm:leading-tight text-white">
              OPHTHALMOLOGY FOCUSED CRO{" "}
              <span className="text-[#4DB1FF]">SINCE 2006</span>
            </h2>

            <p className="max-w-3xl md:max-w-4xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose px-2 sm:px-0">
              Since its establishment in 2006, our ophthalmology-focused
              Clinical Research Organization (CRO) has specialized in delivering
              exceptional research operations and administration.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center mt-0 gap-16 ml-15">
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                animate={{ rotate: rotation }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src={eyePath}
                  alt="Eye"
                  width={240}
                  height={240}
                  className="object-contain z-10"
                />

                <Image
                  src={nerves}
                  alt="nerves"
                  width={360}
                  height={360}
                  className="absolute"
                />

                {["MARKET", "CONCEPT", "DESIGN", "TRIAL"].map((label) => (
                  <motion.div
                    key={label}
                    onClick={() => handleClickTo(label)}
                    onHoverStart={() => setHoverLabel(label)}
                    onHoverEnd={() => setHoverLabel(null)}
                    animate={{ rotate: getLabelDisplayRotation(label) }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`group absolute text-xs sm:text-sm font-semibold cursor-pointer rounded-md px-5 py-2 transform-origin: center center
      ${
        label === "MARKET"
          ? "top-[-25px] left-1/2 -translate-x-1/2"
          : label === "CONCEPT"
          ? "right-[-50px] top-1/2 -translate-y-1/2"
          : label === "DESIGN"
          ? "bottom-[-25px] left-1/2 -translate-x-1/2"
          : "left-[-50px] top-1/2 -translate-y-1/2"
      }
      ${
        activeLabel === label
          ? "bg-white text-black"
          : "bg-[#0B2A4A] text-white"
      }
    `}
                  >
                    {label}

                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={
                        activeLabel === label
                          ? { y: 0, opacity: 1 }
                          : { y: 10, opacity: 0 }
                      }
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`absolute left-1/2 -translate-x-1/2 h-[3px] w-[28px] bg-white rounded-sm
  ${label === "CONCEPT" ? "bottom-[-6px]" : "bottom-[-10px]"}`}
                    />

                    <AnimatePresence>
                      {hoverLabel === label && (
                        <motion.div
                          key={`${label}-${getLabelDisplayRotation(label)}`}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-[3px] w-[28px] bg-white/70 rounded-sm"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>

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
                      escalating demand fir early disease detection and
                      personalized healthcare solutions.
                    </p>
                  )}
                  {activeLabel === "CONCEPT" && (
                    <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
                      Our research is vital for tackling the increasing global
                      burden of eye diseases, particularly as vision impairment
                      and blindness become more prevalent in aging populations.
                    </p>
                  )}
                  {activeLabel === "DESIGN" && (
                    <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
                      Developing clinical monitoring systems utilizing OCT
                      devices, with a focus on enhancing image resolution,
                      importing ease of use, and integrating advanced data
                      analytics.
                    </p>
                  )}
                  {activeLabel === "TRIAL" && (
                    <p className="text-[15px] sm:text-[16px] font-bold text-white/90">
                      Clinical trials leveraging OCT technology are crucial for
                      assessing the safety and efficacy of new treatments,
                      offering real-time imaging data to monitor patient
                      responses and outcomes.
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
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>

                    <svg
                      className="hidden w-4 h-4 text-white transition-all duration-300 ease-in-out group-hover:block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
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
        </main>
        {/* <section className="relative w-full py-20 bg-primary-dark text-white overflow-hidden">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-center max-w-4xl mx-auto mb-16">
            IT IS OFTEN SAID THAT THE{" "}
            <span className="text-sky-400">EYE IS THE WINDOW</span> TO THE SOUL
          </h2>

          <div
            className="relative mx-auto"
            style={{ width: "1200px", height: "650px" }}
          >
            <Image
              src={bodyGraphicPath}
              alt="Stylized human body showing various medical fields"
              width={400}
              height={600}
              objectFit="contain"
              className="absolute z-10"
              style={{
                top: "50px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />

            <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '150px', left: '480px' }}>Endocrinology</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '230px', left: '400px' }}>Gastroenterology</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '300px', left: '400px' }}>Geriatrics</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '380px', left: '400px' }}>Hepatology</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '450px', left: '380px' }}>Inflammation</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '500px', left: '400px' }}>Urology</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '550px', left: '400px' }}>Virology</div>
                        
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '120px', right: '480px' }}>Neurology</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '200px', right: '380px' }}>Cardiovascular</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '280px', right: '350px' }}>Dermatology</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '350px', right: '330px' }}>Radiation Oncology</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '420px', right: '350px' }}>Skeletal System</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '490px', right: '360px' }}>Women&apos;s Health</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '560px', right: '300px' }}>Emerging Viruses</div>
                        <div className={bodyLabelClasses} style={{ backgroundColor: colors.secondaryDark, top: '600px', right: '350px' }}>Genetics</div>
          </div>
        </section> */}
      </div>
    </section>
  );
}
