"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { rightSideLabels,leftSideLabels } from "./labelData"

const Label = ({ label, isRightSide, onClickLabel, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Default background gradient ofr the label
  const baseBackground = isRightSide
    ? "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)"
    : "linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)";

  // Default background gradient for active label
  const hoverBackground = isRightSide
    ? "linear-gradient(90deg, rgba(58,173,237,0.5) 0%, rgba(58,173,237,0) 75%)"
    : "linear-gradient(-90deg, rgba(58,173,237,0.5) 0%, rgba(58,173,237,0) 75%)";

  const isHighlighted = isHovered || isActive;

  return (
    <motion.div
      className={`absolute flex items-center justify-center text-sm font-bold rounded-[24px] py-[10px] px-[15px] whitespace-nowrap label transition-all duration-300 ease-in-out cursor-pointer ${
        isHighlighted
          ? "text-[#3AADED] border border-[#3AADED]"
          : "text-white border border-transparent"
      }`}
      style={{
        top: label.top,
        left: label.left,
        width: label.width,
        background: isHighlighted ? hoverBackground : baseBackground,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClickLabel(label.text)}
      animate={{ x: isHighlighted ? (isRightSide ? -5 : 5) : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {label.text}
    </motion.div>
  );
};

export default function BodyAnimation({ selectedLabel, onLabelClick }) {
  const lightPath = "/images/bodyLighting.svg";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const sequence = [
    ...rightSideLabels.map((l) => l.text),
    ...[...leftSideLabels].reverse().map((l) => l.text),
  ];

  // To manage automatic cycling of labels
  useEffect(() => {
    const startDelay = setTimeout(
      () => {
        let index = currentIndex;

        if (!selectedLabel) {
          onLabelClick(sequence[0]);
          setCurrentIndex(0);
        }

        // Function for auto-cycling interval
        const startCycle = () => {
          intervalRef.current = setInterval(() => {
            index = (index + 1) % sequence.length;
            onLabelClick(sequence[index]);
            setCurrentIndex(index);
          }, 5000);
        };

        if (!isManual) startCycle();
        return () => clearInterval(intervalRef.current);
      },
      selectedLabel === null ? 5000 : 0
    );

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(startDelay);
    };
  }, [isManual]);

  const bodyImagePath = "/images/body.svg";

  return (
    <>
      {/* Light glow */}
      <div className="absolute w-[500px] h-[520px] top-[200px] left-[590px] opacity-80">
        <Image
          src={lightPath}
          alt="Body lighting"
          fill
          className="object-contain"
        />
      </div>

      {/* Organ highlight */}
      <AnimatePresence mode="wait">
        {selectedLabel && (
          <motion.div
            key={selectedLabel}
            className="absolute w-[125px] h-[110px] top-105 left-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              src={`/images/${selectedLabel
                .toLowerCase()
                .replace(/['’\s]+/g, "")}_part.svg`}
              alt={`${selectedLabel} organ illustration`}
              fill
              className="object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static human body image */}
      <AnimatePresence mode="wait">
        {selectedLabel !== "Geriatrics" && (
          <motion.div 
            key="static-body" 
            className="absolute w-[380px] h-[850px] top-[-80px] left-[650px]"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={bodyImagePath}
              alt="Human body"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Organ highlight*/}
      <AnimatePresence mode="wait">
        {selectedLabel && (
          <motion.div
            key={selectedLabel}
            className="absolute w-[380px] h-[850px] top-[-80px] left-[650px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={`/images/${selectedLabel
                .toLowerCase()
                .replace(/['’\s]+/g, "")}.svg`}
              alt={`${selectedLabel} highlight`}
              fill
              className="object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Labels */}
      {[...rightSideLabels, ...leftSideLabels].map((label, i) => (
        <Label
          key={i}
          label={label}
          isRightSide={i < rightSideLabels.length}
          onClickLabel={onLabelClick}
          isActive={selectedLabel === label.text}
        />
      ))}
    </>
  );
}
