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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="relative w-full bg-transparent px-3 py-3 z-[40]"
            >
              {/* TOP-LEFT CORNER*/}
              <div className="absolute top-0 left-0 pointer-events-none">
                <Image src={leftRedLinePath} alt="" width={90} height={50} />
                <Image
                  src={leftBlueLinePath}
                  alt=""
                  width={30}
                  height={55}
                  className="absolute top-[4px] left-[4px]"
                />
              </div>

              {/* ORGAN IMAGE*/}
              <div className="absolute top-[4px] right-[4px] w-[55px] h-[55px] z-[50]">
                <Image
                  src={`/images/${selectedLabel
                    .toLowerCase()
                    .replace(/['’\s]+/g, "")}_part.svg`}
                  alt={`${selectedLabel} organ`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* CONTENT*/}
              <div className="pt-[5px] pb-[18px] pr-[20px]">
                <h3 className="text-white font-extrabold text-[16px] leading-[18px]">
                  {selectedLabel}
                </h3>

                <p className="mt-2 text-white text-[13px] leading-[14px]">
                  {descriptions[selectedLabel]}
                </p>
              </div>

              {/* BOTTOM-RIGHT CORNER*/}
              <div className="absolute bottom-0 right-0 pointer-events-none">
                <Image src={rightRedLinePath} alt="" width={110} height={50} />
                <Image
                  src={rightBlueLinePath}
                  alt=""
                  width={110}
                  height={110}
                  className="absolute bottom-[4px] right-[4px]"
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
