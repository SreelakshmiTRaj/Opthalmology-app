"use client";
import Image from "next/image";
import { useState } from "react";
import BodyAnimation from "./BodyAnimation";
import BodyDescriptionBox from "./BodyDescriptionBox";
import ChatBubbles from "./ChatBubbles";

const backgroundSvgPath = "/images/EyeIsTheWindowBg.svg";
const line = "/images/Group 23.svg";

export default function Body() {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [visible, setVisible] = useState(true);

  // Function to set the selected label when clicked
  const handleLabelClick = (label) => {
    setSelectedLabel(label);
  };

  // Function for clicks on background
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
      className="relative w-full text-white py-12 px-6 bg-[#0a1429] flex flex-col items-center bg-no-repeat bg-cover bg-center"
      onClick={handleSectionClick}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundSvgPath}
          alt="Technical Background Pattern"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/*ZigZag image*/}
      <div className="absolute top-0 w-full z-10">
        <Image
          src={line}
          alt="Zigzag border"
          width={2000}
          height={120}
          className="w-full h-auto object-cover pointer-events-none select-none"
        />
      </div>

      <div className="relative z-20 w-full flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] leading-tight md:leading-[45px] font-bold text-center uppercase max-w-[784px] mx-auto mb-6 pt-10 md:mb-10 px-4">
          IT IS OFTEN SAID THAT THE
          <br />
          <span className="text-[#3AADED]">EYE IS THE WINDOW</span> TO THE{" "}
          <span className="whitespace-nowrap">SOUL.</span>
        </h2>

        <div className="relative w-[1101px] h-[745px]">
          {/*Body diagram*/}
          <BodyAnimation
            selectedLabel={selectedLabel}
            onLabelClick={handleLabelClick}
          />

          {/*Description box*/}
          <BodyDescriptionBox selectedLabel={selectedLabel} />

          {/*Chat bubbles*/}
          <ChatBubbles visible={visible} />
        </div>
      </div>
    </section>
  );
}
