"use client";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const headerNavItems = ["Home", "Services", "Eye is the Window", "For Sites", "Company"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navHover, setNavHover] = useState(null);
  const [navActive, setNavActive] = useState("Home");
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const [moverX, setMoverX] = useState(0);
  const moverWidth = 24;

  const updateMoverPosition = (targetItem) => {
    const container = navRef.current;
    if (!container) return;
    const index = headerNavItems.indexOf(targetItem);
    const itemEl = itemRefs.current[index];
    if (!itemEl) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    const center = itemRect.left + itemRect.width / 2 - containerRect.left;
    const x = center - moverWidth / 2;
    setMoverX(Math.round(x));
  };

  useEffect(() => {
    updateMoverPosition(navActive);
  }, [navActive]);

  useEffect(() => {
    if (navHover) updateMoverPosition(navHover);
    else updateMoverPosition(navActive);
  }, [navHover]);

  useEffect(() => {
    const onResize = () => updateMoverPosition(navHover || navActive);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [navHover, navActive]);

  return (
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
        <nav
          ref={navRef}
          className="relative bg-slate-700/70 h-9 flex space-x-0.5 text-sm font-normal rounded-md px-2 py-1 overflow-hidden"
        >
          {headerNavItems.map((item, idx) => (
            <div
              key={item}
              ref={(el) => (itemRefs.current[idx] = el)}
              className="relative flex items-center justify-center px-1 py-3 space-x-1 cursor-pointer"
              onMouseEnter={() => setNavHover(item)}
              onMouseLeave={() => setNavHover(null)}
            >
              <a
                href="#"
                className={`px-2 transition-colors duration-200 ${
                  item === navActive ? "text-sky-400" : "text-white/80 hover:text-white"
                }`}
                onClick={() => setNavActive(item)}
              >
                {item}
              </a>
            </div>
          ))}

          <AnimatePresence>
            {navHover && (
              <motion.div
                key="hover-mover"
                className="absolute bottom-[2px] h-[2.5px] bg-sky-400 rounded-full"
                initial={{ opacity: 0, scaleX: 0, originX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1, x: moverX }}
                exit={{ opacity: 0, scaleX: 0 }}
                style={{ width: moverWidth }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </AnimatePresence>
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
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <div className="lg:hidden flex items-center">
        <button onClick={() => setIsMenuOpen((prev) => !prev)} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-800/90 text-white flex flex-col items-center py-6 space-y-3 lg:hidden rounded-b-lg shadow-md backdrop-blur">
          {headerNavItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm ${item === "Home" ? "text-sky-400" : "text-white/80 hover:text-white"}`}
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
  );
}

