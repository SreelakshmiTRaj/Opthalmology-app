"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { descriptions } from "./descriptions";

export default function BodyDescriptionBox({
  selectedLabel,
  isMobile = false,
}) {
  const rightRedLinePath = "/images/rightRedLine.svg";
  const rightBlueLinePath = "/images/rightBlueLine.svg";
  const leftBlueLinePath = "/images/leftBlueline.svg";
  const leftRedLinePath = "/images/leftRedline.svg";

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start text-left">
        <AnimatePresence mode="wait">
          {selectedLabel && (
            <motion.div
              key={selectedLabel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              /* IMPORTANT — brings the whole description box ABOVE the body */
              className="relative w-full bg-transparent px-4 py-4 z-[40]"
            >
              {/* TOP-LEFT CORNER */}
              <div className="absolute top-0 left-0 pointer-events-none">
                <Image src={leftRedLinePath} alt="" width={110} height={60} />
                <Image
                  src={leftBlueLinePath}
                  alt=""
                  width={40}
                  height={70}
                  className="absolute top-[6px] left-[6px]"
                />
              </div>

              {/* ORGAN IMAGE — FIXED Z-INDEX SO IT APPEARS ABOVE BODY */}
              {selectedLabel && (
                <div className="absolute top-[8px] right-[8px] w-[80px] h-[80px] z-[50]">
                  <Image
                    src={`/images/${selectedLabel
                      .toLowerCase()
                      .replace(/['’\s]+/g, "")}_part.svg`}
                    alt={`${selectedLabel} organ`}
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
              )}

              {/* CONTENT — REDUCED TOP & BOTTOM SPACING */}
              <div className="pt-[20px] pb-[25px] pr-[30px]">
                <h3 className="text-white font-extrabold text-[17px] leading-5">
                  {selectedLabel}
                </h3>

                <p className="mt-2 text-white text-[13px] leading-[19px]">
                  {descriptions[selectedLabel]}
                </p>
              </div>

              {/* BOTTOM-RIGHT CORNER */}
              <div className="absolute bottom-0 right-0 pointer-events-none">
                <Image src={rightRedLinePath} alt="" width={150} height={80} />
                <Image
                  src={rightBlueLinePath}
                  alt=""
                  width={130}
                  height={130}
                  className="absolute bottom-[6px] right-[6px]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ---------- DESKTOP (UNCHANGED) ----------
  return (
    <>
      <AnimatePresence mode="wait">
        {selectedLabel && (
          <motion.div
            key={selectedLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="absolute text-white font-inter font-extrabold text-[20px] w-[475px] top-127 left-10 text-left">
              {selectedLabel}
            </div>

            <div
              className="absolute text-white font-inter text-[15px] leading-[20px] w-[475px] top-137 left-10 text-left overflow-hidden pr-30 max-w-2xl"
              style={{
                maxWidth: "475px",
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {descriptions[selectedLabel]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-[200px] h-[120px]">
        <Image
          src={leftRedLinePath}
          alt="Red decorative line"
          width={210}
          height={100}
          className="absolute top-120 left-0 opacity-100"
        />

        <Image
          src={leftBlueLinePath}
          alt="Blue decorative line"
          width={60}
          height={110}
          className="absolute top-122 left-[10.25px] opacity-100"
        />
      </div>

      <div className="absolute bottom-0 right-0 w-[449px] h-[170px]">
        <Image
          src={rightRedLinePath}
          alt="Bottom red line"
          width={350}
          height={160}
          className="absolute -top-20 -left-140 opacity-150"
        />

        <Image
          src={rightBlueLinePath}
          alt="Bottom blue line"
          width={350}
          height={350}
          className="absolute -top-8 -left-138 opacity-100"
        />
      </div>
    </>
  );
}
