"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

  const rightSideLabels = [
    { text: "Neurology", top: "85px", left: "935px", width: "110px" },
    { text: "Cardiovascular", top: "160px", left: "990px", width: "147px" },
    { text: "Dermatology", top: "243px", left: "980px", width: "130px" },
    { text: "Radiation Oncology", top: "325px", left: "960px", width: "181px" },
    { text: "Skeletal System", top: "407px", left: "975px", width: "154px" },
    { text: "Women’s Health", top: "475px", left: "960px", width: "155px" },
    { text: "Emerging Viruses", top: "550px", left: "950px", width: "167px" },
    { text: "Genetics", top: "615px", left: "920px", width: "100px" },
  ];

  const leftSideLabels = [
    { text: "Endocrinology", top: "120px", left: "600px", width: "142px" },
    { text: "Gastroenterology", top: "185px", left: "530px", width: "166px" },
    { text: "Geriatrics", top: "265px", left: "600px", width: "106px" },
    { text: "Hepatology", top: "340px", left: "555px", width: "120px" },
    { text: "Inflammation", top: "420px", left: "560px", width: "132px" },
    { text: "Urology", top: "500px", left: "615px", width: "91px" },
    { text: "Virology", top: "580px", left: "630px", width: "91px" },
  ];

  const sequence = [
    ...rightSideLabels.map((l) => l.text),
    ...[...leftSideLabels].reverse().map((l) => l.text),
  ];

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = currentIndex;

      if (!selectedLabel) {
        onLabelClick(sequence[0]);
        setCurrentIndex(0);
      }

      const startCycle = () => {
        intervalRef.current = setInterval(() => {
          index = (index + 1) % sequence.length;
          onLabelClick(sequence[index]);
          setCurrentIndex(index);
        }, 5000);
      };

      if (!isManual) startCycle();
      return () => clearInterval(intervalRef.current);
    }, selectedLabel === null ? 3000 : 0);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(startDelay);
    };
  }, [isManual]);

  const bodyImagePath = selectedLabel
    ? `/images/${selectedLabel.toLowerCase().replace(/['’\s]+/g, "")}.svg`
    : "/images/body.svg";

  return (
    <>
      {/* Light glow */}
      <div className="absolute w-[500px] h-[520px] top-[200px] left-[590px] opacity-80">
        <Image src={lightPath} alt="Body lighting" fill className="object-contain" />
      </div>

      {/* Human body image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bodyImagePath}
          className="absolute w-[380px] h-[850px] top-[-80px] left-[650px] body-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Image src={bodyImagePath} alt={selectedLabel || "Human body"} fill className="object-contain" />
        </motion.div>
      </AnimatePresence>

      {/* Organ highlight */}
      <AnimatePresence mode="wait">
        {selectedLabel && (
          <motion.div
            key={selectedLabel}
            className="absolute w-[125px] h-[110px] top-105 left-75"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              src={`/images/${selectedLabel.toLowerCase().replace(/['’\s]+/g, "")}_part.svg`}
              alt={`${selectedLabel} organ illustration`}
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
