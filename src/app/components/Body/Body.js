"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Label = ({ label, isRightSide, onClickLabel, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseBackground = isRightSide
    ? "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)"
    : "linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)";

  const hoverBackground = isRightSide
    ? "linear-gradient(90deg, rgba(58, 173, 237, 0.5) 0%, rgba(58, 173, 237, 0) 75%)"
    : "linear-gradient(-90deg, rgba(58, 173, 237, 0.5) 0%, rgba(58, 173, 237, 0) 75%)";

  const isHighlighted = isHovered || isActive;

  return (
    <motion.div
      className={`absolute flex items-center justify-center text-sm font-bold rounded-[24px] py-[10px] px-[15px] whitespace-nowrap label transition-all duration-300 ease-in-out cursor-pointer
        ${
          isHighlighted
            ? "text-[#3AADED] border border-[#3AADED]"
            : "text-white border border-transparent"
        }
      `}
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

export default function Body() {
  const lightPath = "/images/bodyLighting.svg";
  const personIconPath = "/images/personIcon.svg";
  const blueIconPath = "/images/blueIcon.svg";

  const [visible, setVisible] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState(null); // start with body.svg
  const [isManual, setIsManual] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    const startDelay = setTimeout(
      () => {
        let index = currentIndex;

        const startCycle = () => {
          intervalRef.current = setInterval(() => {
            index = (index + 1) % sequence.length;
            setSelectedLabel(sequence[index]);
            setCurrentIndex(index);
          }, 5000);
        };

        if (!isManual) startCycle();

        return () => clearInterval(intervalRef.current);
      },
      selectedLabel === null ? 3000 : 0
    );

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(startDelay);
    };
  }, [isManual]);

  const handleLabelClick = (labelText) => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    // Manual selection
    setSelectedLabel(labelText);
    setIsManual(true);

    // Resume auto-cycle after 5s — continuing from where it left off
    timeoutRef.current = setTimeout(() => {
      setIsManual(false);
    }, 5000);
  };

  // Determine which image to show
  const bodyImagePath = selectedLabel
    ? `/images/${selectedLabel.toLowerCase().replace(/['’\s]+/g, "")}.svg`
    : "/images/body.svg";

  const handleSectionClick = (e) => {
    if (
      e.target.closest(".body-image") ||
      e.target.closest(".label") ||
      e.target.closest(".chat-bubble")
    )
      return;
    setVisible(false);
    setTimeout(() => setVisible(true), 500);
  };

  return (
    <section
      className="relative w-full bg-[#0b1626]/90 text-white py-12 px-6 flex flex-col items-center overflow-hidden"
      onClick={handleSectionClick}
    >
      <h2 className="text-[36px] leading-[45px] font-bold text-center uppercase max-w-[784px] mb-10">
        IT IS OFTEN SAID THAT THE
        <br />
        <span className="text-[#3AADED]">EYE IS THE WINDOW</span> TO THE{" "}
        <span className="whitespace-nowrap">SOUL.</span>
      </h2>

      <div className="relative w-[1101px] h-[745px]">
        {/* LIGHT */}
        <div className="absolute w-[500px] h-[520px] top-[200px] left-[590px] opacity-80">
          <Image
            src={lightPath}
            alt="Body lighting"
            fill
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {/* BODY IMAGE (animated) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={bodyImagePath}
            className="absolute w-[380px] h-[850px] top-[-80px] left-[650px] body-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={bodyImagePath}
              alt={selectedLabel || "Human body"}
              fill
              className="object-contain pointer-events-none select-none drop-shadow-[0_0_25px_rgba(58,173,237,0.3)]"
            />
          </motion.div>
        </AnimatePresence>

        {/* RIGHT SIDE LABELS */}
        {rightSideLabels.map((label, idx) => (
          <Label
            key={`right-${idx}`}
            label={label}
            isRightSide={true}
            onClickLabel={handleLabelClick}
            isActive={selectedLabel === label.text}
          />
        ))}

        {/* LEFT SIDE LABELS */}
        {leftSideLabels.map((label, idx) => (
          <Label
            key={`left-${idx}`}
            label={label}
            isRightSide={false}
            onClickLabel={handleLabelClick}
            isActive={selectedLabel === label.text}
          />
        ))}

        {/* CHAT BUBBLE + EXPLORE BUTTON (unchanged) */}
        <motion.div
          key={visible ? "visible" : "hidden"}
          className="absolute top-[20px] -left-20 chat-bubble"
        >
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: visible ? 0 : -200, opacity: visible ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-start gap-2 w-[372px] h-[70px]"
          >
            <Image
              src={personIconPath}
              alt="Person icon"
              width={31}
              height={31}
              className="object-contain"
            />
            <div className="w-[375px] h-[75px] rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] bg-white text-gray-500 p-5 flex items-center text-[15px] font-medium shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
              Does Sage Research exclusively focus on ophthalmology within its
              CRO Services?
            </div>
          </motion.div>

          {/* BLUE BUBBLES */}
          {[1, 2].map((n, i) => (
            <motion.div
              key={i}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: visible ? 0 : 200, opacity: visible ? 1 : 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: n,
              }}
              className={`relative flex items-start justify-between ${
                i === 0
                  ? "w-[451px] h-[89px] left-[95px] top-[20px]"
                  : "w-[400px] h-[75px] left-[125px] top-[35px]"
              }`}
            >
              <div
                className={`rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] bg-[#003F6E] text-white ${
                  i === 0 ? "w-[411px] h-[89px]" : "w-[380px] h-[75px]"
                } px-5 py-4 flex items-center text-[13px] leading-[20px] font-poppins`}
              >
                <p>
                  {i === 0 ? (
                    <>
                      In addition to our recognized expertise in ophthalmology,
                      Sage Research offers comprehensive CRO services across a{" "}
                      <span className="font-semibold">
                        broad range of therapeutic areas.
                      </span>
                    </>
                  ) : (
                    <>
                      The eyes are a unique, non-invasive window into systemic
                      health, capable of revealing early signs of{" "}
                      <span className="font-semibold">
                        numerous diseases and disorders.
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="absolute right-[-20px] top-[5px] flex items-center justify-center w-[30px] h-[30px] rounded-full border border-white">
                <Image
                  src={blueIconPath}
                  alt="Blue globe icon"
                  width={29}
                  height={29}
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}

          {/* EXPLORE BUTTON */}
          <motion.button
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: visible ? 0 : 200, opacity: visible ? 1 : 0 }}
            transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
            className="absolute flex items-center justify-center gap-2 text-[#3AADED] text-[15px] font-medium w-[140px] h-[50px] rounded-[34px] border border-[#0A345F] bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] left-[366px] top-[290px]"
          >
            Explore
            <span className="text-[#3AADED] text-lg">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
