"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { rightSideLabels, leftSideLabels } from "./labelData";

const Label = ({ label, isRightSide, onClickLabel, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseBackground = isRightSide
    ? "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)"
    : "linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)";

  const hoverBackground = isRightSide
    ? "linear-gradient(90deg, rgba(58,173,237,0.5) 0%, rgba(58,173,237,0) 75%)"
    : "linear-gradient(-90deg, rgba(58,173,237,0.5) 0%, rgba(58,173,237,0) 75%)";

  const isHighlighted = isHovered || isActive;

  return (
    <motion.div
      className={`absolute flex items-center justify-center text-sm font-bold rounded-[24px] py-[10px] px-[15px] whitespace-nowrap cursor-pointer transition-all duration-300 ${
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
      transition={{ duration: 0.3 }}
    >
      {label.text}{" "}
    </motion.div>
  );
};

export default function BodyAnimation({
  selectedLabel,
  onLabelClick,
  isMobile = false,
  isMobileBodyOnly = false,
}) {
  const lightPath = "/images/bodyLighting.svg";
  const bodyImagePath = "/images/body.svg";

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const sequence = [
    ...rightSideLabels.map((l) => l.text),
    ...[...leftSideLabels].reverse().map((l) => l.text),
  ];

  useEffect(() => {
    if (isMobileBodyOnly && !selectedLabel) return;

    let index = currentIndex;
    const startCycle = () => {
      intervalRef.current = setInterval(() => {
        index = (index + 1) % sequence.length;
        onLabelClick(sequence[index]);
        setCurrentIndex(index);
      }, 5000);
    };

    startCycle();
    return () => clearInterval(intervalRef.current);
  }, [
    currentIndex,
    onLabelClick,
    sequence.length,
    selectedLabel,
    isMobileBodyOnly,
  ]);

  if (isMobile) {
    return (
      <div
        className="relative w-full max-h-[70vh] overflow-y-auto 
                 scrollbar-thin scrollbar-thumb-blue-400/50 scrollbar-track-transparent 
                 [scrollbar-gutter:stable] pr-2 ml-auto 
                 [&::-webkit-scrollbar-track]:!mr-auto 
                 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {[...rightSideLabels, ...leftSideLabels].map((label, i) => {
          const isActive = selectedLabel === label.text;
          const isRightSide = i < rightSideLabels.length;

          const baseBackground = isRightSide
            ? "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)"
            : "linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)";

          const hoverBackground = isRightSide
            ? "linear-gradient(90deg, rgba(58,173,237,0.5) 0%, rgba(58,173,237,0) 75%)"
            : "linear-gradient(-90deg, rgba(58,173,237,0.5) 0%, rgba(58,173,237,0) 75%)";

          return (
            <motion.div
              key={i}
              className={`
              flex items-center justify-start 
              text-[13px] font-bold rounded-[24px] whitespace-nowrap 
              cursor-pointer transition-all duration-300 mb-2 
              px-[15px] py-[10px] w-full 
              ${
                isActive
                  ? "text-[#3AADED] border border-[#3AADED]"
                  : "text-white border border-transparent"
              }
            `}
              style={{
                background: isActive ? hoverBackground : baseBackground,
              }}
              onClick={() => onLabelClick(label.text)}
              whileTap={{ scale: 0.96 }}
            >
              {label.text}
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (isMobileBodyOnly) {
    return (
      <div className="relative w-full flex justify-center">
        <div className="relative w-[160px] h-[360px]">
          <div className="absolute inset-0 opacity-70 z-0">
            <Image
              src="/images/bodyLighting.svg"
              alt="Glow"
              fill
              className="object-contain"
            />
          </div>

          <AnimatePresence mode="wait">
            {selectedLabel && (
              <motion.div
                key={selectedLabel + "-mobile-part"}
                className="absolute inset-0 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image
                  src={`/images/${selectedLabel
                    .toLowerCase()
                    .replace(/['’\s]+/g, "")}_part.svg`}
                  alt="Organ Highlight"
                  fill
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedLabel || selectedLabel !== "Geriatrics" ? (
            <div className="absolute inset-0 z-10">
              <Image
                src="/images/body.svg"
                alt="Body"
                fill
                className="object-contain"
              />
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            {selectedLabel && (
              <motion.div
                key={selectedLabel + "-mobile-full"}
                className="absolute inset-0 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image
                  src={`/images/${selectedLabel
                    .toLowerCase()
                    .replace(/['’\s]+/g, "")}.svg`}
                  alt="Full Highlight"
                  fill
                  className="object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="absolute w-[500px] h-[520px] top-[200px] left-[590px] opacity-80">
        {" "}
        <Image
          src={lightPath}
          alt="Body lighting"
          fill
          className="object-contain"
        />{" "}
      </div>
      <AnimatePresence mode="wait">
        {" "}
        {selectedLabel && (
          <motion.div
            key={selectedLabel + "-part"}
            className="absolute w-[125px] h-[110px] top-105 left-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {" "}
            <Image
              src={`/images/${selectedLabel
                .toLowerCase()
                .replace(/['’\s]+/g, "")}_part.svg`}
              alt="Organ part"
              fill
              className="object-contain"
            />{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {" "}
        {selectedLabel !== "Geriatrics" && (
          <motion.div
            key="static-body"
            className="absolute w-[380px] h-[850px] top-[-80px] left-[650px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {" "}
            <Image
              src={bodyImagePath}
              alt="Human body"
              fill
              className="object-contain"
            />{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {" "}
        {selectedLabel && (
          <motion.div
            key={selectedLabel + "-full"}
            className="absolute w-[380px] h-[850px] top-[-80px] left-[650px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {" "}
            <Image
              src={`/images/${selectedLabel
                .toLowerCase()
                .replace(/['’\s]+/g, "")}.svg`}
              alt="Highlight"
              fill
              className="object-contain"
            />{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>
      {[...rightSideLabels, ...leftSideLabels].map((label, i) => (
        <Label
          key={i}
          label={label}
          isRightSide={i < rightSideLabels.length}
          onClickLabel={onLabelClick}
          isActive={selectedLabel === label.text}
        />
      ))}{" "}
    </>
  );
}
