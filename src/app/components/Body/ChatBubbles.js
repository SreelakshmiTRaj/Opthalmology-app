"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const personIconPath = "/images/personIcon.svg";
const whiteTailPath = "/images/whiteTail.svg";
const blueTailPath = "/images/blueTail.svg";
const blueIconPath = "/images/blueIcon.svg";

export default function ChatBubbles({ visible = true }) {
  return (
    <motion.div
      key={visible ? "visible" : "hidden"}
      className="absolute top-[20px] -left-20 chat-bubble"
    >
      {/* Left white bubble */}
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

        <div className="relative">
          <Image
            src={whiteTailPath}
            alt="Chat tail"
            width={15}
            height={16}
            className="absolute -left-[14px] top-[0px] opacity-100"
          />

          <div className="w-[375px] h-[75px] rounded-tl-[3px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] bg-white text-gray-500 p-5 flex items-center text-[15px] font-medium shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
            Does Sage Research exclusively focus on ophthalmology within its CRO
            Services?
          </div>
        </div>
      </motion.div>

      {/* Two blue reply bubbles */}
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
          <div className="relative">
            <Image
              src={blueTailPath}
              alt="Blue chat tail"
              width={15}
              height={16}
              className="absolute -right-[15px] top-[0px] opacity-100"
            />

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
          </div>

          {/* Small blue icon beside bubble */}
          <div
            className={`absolute flex items-center justify-center w-[30px] h-[30px] rounded-full border border-white`}
            style={{
              right: i === 0 ? "-2px" : "-22px",
              top: "7px",
            }}
          >
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
  );
}
