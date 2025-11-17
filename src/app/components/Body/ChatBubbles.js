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
      className="relative top-[20px] -left-20 chat-bubble 
                 max-sm:relative max-sm:top-0 max-sm:left-0
                 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-5"
    >
      {/* Left white bubble */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: visible ? 0 : -200, opacity: visible ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex items-start gap-2 w-[372px] h-[70px] max-sm:w-[90vw] max-sm:h-auto"
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
            className="absolute -left-[14px] top-[0px]"
          />
          <div
            className="bg-white text-gray-500 
                p-5 flex items-center text-[15px] font-medium 
                shadow-[0_2px_10px_rgba(0,0,0,0.15)]
                w-[375px] h-[75px]
                rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px]
                max-sm:w-full max-sm:h-auto max-sm:p-4 max-sm:text-[14px]"
          >
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
          transition={{ duration: 1, ease: "easeOut", delay: n }}
          className={`relative flex items-start justify-between 
                      ${
                        i === 0
                          ? "w-[451px] h-[89px] left-[95px] top-[20px]"
                          : "w-[400px] h-[75px] left-[125px] top-[35px]"
                      }
                      max-sm:static max-sm:w-[90vw] max-sm:h-auto max-sm:items-start max-sm:px-3`}
        >
          <div className="relative">
            <div
              //           className={`relative rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-none
              //   bg-[#003F6E] text-white px-5 py-4 flex items-center text-[13px] leading-[20px] font-poppins
              //   ${i === 0 ? "w-[411px] h-[89px]" : "w-[380px] h-[75px]"}
              //   max-sm:w-full max-sm:h-auto max-sm:p-3
              //   ${i === 1 ? "max-sm:w-11/12 max-sm:self-end" : ""}
              // `}
              className={`relative rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-none
      bg-[#003F6E] text-white px-5 py-4 flex items-center text-[13px] leading-[20px] font-poppins
      ${i === 0 ? "w-[411px] h-[89px]" : "w-[380px] h-[75px]"}
      
      ${i === 0 ? "max-sm:w-[82vw]" : "max-sm:w-[75vw]"} 
      max-sm:h-auto max-sm:p-3
      `}
            >
              <Image
                src={blueTailPath}
                alt="Blue chat tail"
                width={15}
                height={16}
                className="absolute -right-[14px] top-[0px]"
              />
              <p>
                {i === 0 ? (
                  <>
                    In addition to our recognized expertise in ophthalmology,
                    Sage Research offers comprehensive CRO services across a{" "}
                    <span className="font-bold">
                      broad range of therapeutic areas.
                    </span>
                  </>
                ) : (
                  <>
                    The eyes are a unique, non-invasive window into systemic
                    health, capable of revealing early signs of{" "}
                    <span className="font-bold">
                      numerous diseases and disorders.
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div
            className={`absolute flex items-center justify-center 
              w-[30px] h-[30px] rounded-full border border-white 
              ${i === 0 ? "right-[-2px]" : "right-[-22px]"} top-[7px]
              max-sm:absolute max-sm:w-[26px] max-sm:h-[26px] 
              max-sm:right-0 
              ${i === 0 ? "max-sm:right-0 max-sm:top-27" : ""}
              ${i === 1 ? "max-sm:right-0 max-sm:top-50" : ""}
              `}
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

      {/* Explore Button */}
      <motion.button
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: visible ? 0 : 200, opacity: visible ? 1 : 0 }}
        transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
        className="absolute left-[366px] top-[290px]
                   flex items-center justify-center gap-2
                   text-[#3AADED] text-[15px] font-medium 
                   w-[140px] h-[50px] rounded-[34px] border border-[#0A345F]
                   bg-gradient-to-r from-[rgba(255,255,255,0.1)]
                   to-[rgba(255,255,255,0)]
                   max-sm:absolute max-sm:left-58 max-sm:mt-4 max-sm:w-[120px] max-sm:h-[45px]"
      >
        Explore <span className="text-[#3AADED] text-lg">→</span>
      </motion.button>
    </motion.div>
  );
}
