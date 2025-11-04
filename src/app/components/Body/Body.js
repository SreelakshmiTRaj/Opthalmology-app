"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Body() {
  const bodyPath = "/images/body.svg";
  const lightPath = "/images/bodyLighting.svg";
  const personIconPath = "/images/personIcon.svg";
  const blueIconPath = "/images/blueIcon.svg";

  const [visible, setVisible] = useState(true);

  // Function to handle section clicks
  const handleSectionClick = (e) => {
    if (
      e.target.closest(".body-image") ||
      e.target.closest(".label") ||
      e.target.closest(".chat-bubble")
    ) {
      return;
    }

    setVisible(false);
    setTimeout(() => setVisible(true), 500);
  };

  return (
    <section
      className="relative w-full bg-[#0b1626]/90 text-white py-12 px-6 flex flex-col items-center overflow-hidden"
      onClick={handleSectionClick}
    >
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
        <div className="absolute w-[380px] h-[850px] top-[-80px] left-[650px] body-image">
          <Image
            src={bodyPath}
            alt="Human body"
            fill
            className="object-contain pointer-events-none select-none drop-shadow-[0_0_25px_rgba(58,173,237,0.3)]"
          />
        </div>

        {/* RIGHT SIDE LABELS */}
        {[
          { text: "Neurology", top: "85px", left: "935px", width: "110px" },
          {
            text: "Cardiovascular",
            top: "160px",
            left: "990px",
            width: "147px",
          },
          { text: "Dermatology", top: "243px", left: "980px", width: "130px" },
          {
            text: "Radiation Oncology",
            top: "325px",
            left: "960px",
            width: "181px",
          },
          {
            text: "Skeletal System",
            top: "407px",
            left: "975px",
            width: "154px",
          },
          {
            text: "Women’s Health",
            top: "475px",
            left: "960px",
            width: "155px",
          },
          {
            text: "Emerging Viruses",
            top: "550px",
            left: "950px",
            width: "167px",
          },
          { text: "Genetics", top: "615px", left: "920px", width: "100px" },
        ].map((label, idx) => (
          <div
            key={`right-${idx}`}
            className={`absolute flex items-center justify-center text-sm font-bold text-white rounded-[24px] py-[10px] px-[15px] whitespace-nowrap`}
            style={{
              top: label.top,
              left: label.left,
              width: label.width,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
            }}
          >
            {label.text}
          </div>
        ))}

        {/* LEFT SIDE LABELS */}
        {[
          {
            text: "Endocrinology",
            top: "120px",
            left: "600px",
            width: "142px",
          },
          {
            text: "Gastroenterology",
            top: "185px",
            left: "530px",
            width: "166px",
          },
          { text: "Geriatrics", top: "265px", left: "600px", width: "106px" },
          { text: "Hepatology", top: "340px", left: "555px", width: "120px" },
          { text: "Inflammation", top: "420px", left: "560px", width: "132px" },
          { text: "Urology", top: "500px", left: "615px", width: "91px" },
          { text: "Virology", top: "580px", left: "630px", width: "91px" },
        ].map((label, idx) => (
          <div
            key={`left-${idx}`}
            className="absolute text-sm font-bold text-white flex items-center justify-center rounded-[24px] py-[10px] px-[15px] whitespace-nowrap"
            style={{
              top: label.top,
              left: label.left,
              width: label.width,
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)",
            }}
          >
            {label.text}
          </div>
        ))}

        {/* CHAT BUBBLES */}
        <motion.div
          key={visible ? "visible" : "hidden"}
          className="absolute top-[20px] -left-20 chat-bubble"
        >
          {/* WHITE QUESTION */}
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
              className="object-contain mt-[4px]"
            />
            <div className="w-[375px] h-[75px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] bg-white text-gray-500 p-5 flex items-center text-[15px] leading-[1.5] font-medium shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
              Does Sage Research exclusively focus on ophthalmology within its
              CRO Services?
            </div>
          </motion.div>

          {/* BLUE BUBBLE 1 */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: visible ? 0 : 200, opacity: visible ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            className="relative flex items-start justify-between w-[451px] h-[89px] left-[95px] top-[20px]"
          >
            <div className="w-[411px] h-[89px] rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] bg-[#003F6E] text-white px-5 py-4 flex items-center text-[13px] leading-[20px] font-poppins font-normal">
              <p>
                In addition to our recognized expertise in ophthalmology, Sage
                Research offers comprehensive CRO services across a{" "}
                <span className="font-semibold">
                  broad range of therapeutic areas.
                </span>
              </p>
            </div>
            <Image
              src={blueIconPath}
              alt="Blue globe icon"
              width={29}
              height={29}
              className="absolute right-[1px] top-[5px]"
            />
          </motion.div>

          {/* BLUE BUBBLE 2 */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: visible ? 0 : 200, opacity: visible ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 2 }}
            className="relative flex items-start justify-between w-[400px] h-[75px] left-[125px] top-[35px]"
          >
            <div className="w-[380px] h-[75px] rounded-tl-[12px] rounded-br-[12px] rounded-bl-[12px] bg-[#003F6E] text-white px-5 py-4 flex items-center text-[13px] leading-[20px] font-poppins font-normal">
              <p>
                The eyes are a unique, non-invasive window into systemic health,
                capable of revealing early signs of{" "}
                <span className="font-semibold">
                  numerous diseases and disorders.
                </span>
              </p>
            </div>
            <Image
              src={blueIconPath}
              alt="Blue globe icon"
              width={29}
              height={29}
              className="absolute right-[-22px] top-[3px]"
            />
          </motion.div>

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
