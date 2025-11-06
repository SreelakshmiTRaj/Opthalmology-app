"use client";
import Image from "next/image";
import { useState } from "react";
import BodyAnimation from "./BodyAnimation";
import BodyDescriptionBox from "./BodyDescriptionBox";
import ChatBubbles from "./ChatBubbles";

// Define the path to your background SVG
const backgroundSvgPath = "/images/EyeIsTheWindowBg.svg";
const line = "/images/Group 23.svg";

export default function Body() {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [visible, setVisible] = useState(true);

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
  };

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
        {/* <div className="absolute inset-0 bg-[#0a1429]/30 z-10"></div> */}
      </div>

      {/* Content Layer (Make sure content is above the background layers) */}
      <div className="relative z-20 w-full flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-[36px] leading-[45px] font-bold text-center uppercase max-w-[784px] mb-10">
          IT IS OFTEN SAID THAT THE
          <br />
          <span className="text-[#3AADED]">EYE IS THE WINDOW</span> TO THE{" "}
          <span className="whitespace-nowrap">SOUL.</span>
        </h2>

        {/* Container for animation + description box + chat bubbles */}
        <div className="relative w-[1101px] h-[745px]">
          <BodyAnimation
            selectedLabel={selectedLabel}
            onLabelClick={handleLabelClick}
          />

          <BodyDescriptionBox selectedLabel={selectedLabel} />

          <ChatBubbles visible={visible} />
        </div>
      </div>
    </section>
  );
}
