"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Body() {
  const bodyPath = "/images/body.svg";
  const lightPath = "/images/bodyLighting.svg";
  const personIconPath = "/images/personIcon.svg";

  return (
    <section className="relative w-full bg-[#0b1626]/90 text-white py-12 px-6 flex flex-col items-center overflow-hidden">
      {/* HEADING */}
      <h2 className="text-[36px] leading-[45px] font-bold text-center uppercase max-w-[784px] mb-10">
        IT IS OFTEN SAID THAT THE
        <br />
        <span className="text-[#3AADED]">EYE IS THE WINDOW</span> TO THE{" "}
        <span className="whitespace-nowrap">SOUL.</span>
      </h2>

      {/* BODY CONTAINER */}
      <div className="relative w-[1101px] h-[745px]">
        {/* LIGHT UNDER BODY */}
        <div className="absolute w-[500px] h-[520px] top-[200px] left-[590px] opacity-80">
          <Image
            src={lightPath}
            alt="Body lighting"
            fill
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {/* BODY IMAGE */}
        <div className="absolute w-[380px] h-[850px] top-[-80px] left-[650px]">
          <Image
            src={bodyPath}
            alt="Human body"
            fill
            className="object-contain pointer-events-none select-none drop-shadow-[0_0_25px_rgba(58,173,237,0.3)]"
          />
        </div>

        {/* RIGHT SIDE LABELS */}
        {[
          { text: "Neurology", top: 85, left: 285, width: 110 },
          { text: "Cardiovascular", top: 160, left: 340, width: 147 },
          { text: "Dermatology", top: 243, left: 330, width: 130 },
          { text: "Radiation Oncology", top: 325, left: 310, width: 181 },
          { text: "Skeletal System", top: 407, left: 325, width: 154 },
          { text: "Women’s Health", top: 475, left: 310, width: 155 },
          { text: "Emerging Viruses", top: 550, left: 300, width: 167 },
          { text: "Genetics", top: 615, left: 270, width: 100 },
        ].map((label, idx) => (
          <div
            key={`right-${idx}`}
            className={`absolute text-sm font-bold text-white flex items-center justify-center rounded-[24px] py-[10px] px-[15px] whitespace-nowrap`}
            style={{
              top: `${label.top}px`,
              left: `${label.left + 650}px`,
              width: `${label.width}px`,
              height: "32px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
            }}
          >
            {label.text}
          </div>
        ))}

        {/* LEFT SIDE LABELS */}
        {[
          { text: "Endocrinology", top: 120, left: -50, width: 142 },
          { text: "Gastroenterology", top: 185, left: -120, width: 166 },
          { text: "Geriatrics", top: 265, left: -50, width: 106 },
          { text: "Hepatology", top: 340, left: -95, width: 120 },
          { text: "Inflammation", top: 420, left: -90, width: 132 },
          { text: "Urology", top: 500, left: -35, width: 91 },
          { text: "Virology", top: 580, left: -20, width: 91 },
        ].map((label, idx) => (
          <div
            key={`left-${idx}`}
            className={`absolute text-sm font-bold text-white flex items-center justify-center rounded-[24px] py-[10px] px-[15px] whitespace-nowrap`}
            style={{
              top: `${label.top}px`,
              left: `${label.left + 650}px`,
              width: `${label.width}px`,
              height: "32px",
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 100%)",
            }}
          >
            {label.text}
          </div>
        ))}

        {/* LEFT SIDE CHAT BUBBLE */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute flex items-start gap-2 top-[20px] -left-20 w-[372px] h-[70px]"
        >
          <Image
            src={personIconPath}
            alt="Person icon"
            width={31}
            height={31}
            className="object-contain mt-[4px]"
          />

          <div className="w-[332px] h-[75px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] bg-white text-gray-500 p-5 flex items-center text-[15px] leading-[1.5] font-medium shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
            Does Sage Research exclusively focus on ophthalmology within its CRO
            Services?
          </div>
        </motion.div>
      </div>
    </section>
  );
}
