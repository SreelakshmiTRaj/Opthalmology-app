"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import BodyAnimation from "./BodyAnimation";
import BodyDescriptionBox from "./BodyDescriptionBox";
import ChatBubbles from "./ChatBubbles";

const backgroundSvgPath = "/images/EyeIsTheWindowBg.svg";
const line = "/images/Group 23.svg";

export default function Body() {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleLabelClick = (label) => setSelectedLabel(label);

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

  // Check screen width
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section
      className="relative w-full text-white py-12 px-6 bg-[#0a1429] flex flex-col items-start md:items-center bg-no-repeat bg-cover bg-center"
      onClick={handleSectionClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundSvgPath}
          alt="Technical Background Pattern"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Zigzag Line */}
      <div className="absolute top-0 w-full z-10">
        <Image
          src={line}
          alt="Zigzag border"
          width={2000}
          height={120}
          className="w-full h-auto object-cover pointer-events-none select-none"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] leading-tight md:leading-[45px] font-bold text-center uppercase max-w-[784px] mx-auto mb-6 pt-10 md:mb-10 px-4">
          IT IS OFTEN SAID THAT THE
          <br />
          <span className="text-[#3AADED]">EYE IS THE WINDOW</span> TO THE{" "}
          <span className="whitespace-nowrap">SOUL.</span>
        </h2>

        {/* Conditional Layout */}
        {isMobile ? (
          <div className="flex flex-col w-full mt-6 gap-6">
            {/* Chat bubbles */}
            <ChatBubbles visible={visible} />

            {/* Mobile two-column layout */}
            <div className="w-full flex flex-row gap-4 mt-15">
              {/* LEFT COLUMN → LABELS */}
              <div className="w-[45%] max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                <BodyAnimation
                  selectedLabel={selectedLabel}
                  onLabelClick={handleLabelClick}
                  isMobile={true}
                />
              </div>

              {/* RIGHT COLUMN → BODY IMAGE + DESCRIPTION BELOW IT */}
              <div className="w-[55%] flex flex-col items-start relative gap-4">
                {/* Body only section with full animations */}
                <BodyAnimation
                  selectedLabel={selectedLabel}
                  onLabelClick={handleLabelClick}
                  isMobileBodyOnly={true}
                />

                {/* Description placed directly under the body image */}
                <div className="w-full">
                  <BodyDescriptionBox selectedLabel={selectedLabel} isMobile={true}/>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-[1101px] h-[745px]">
            <BodyAnimation
              selectedLabel={selectedLabel}
              onLabelClick={handleLabelClick}
            />
            <BodyDescriptionBox selectedLabel={selectedLabel} />
            <ChatBubbles visible={visible} />
          </div>
        )}
      </div>
    </section>
  );
}
