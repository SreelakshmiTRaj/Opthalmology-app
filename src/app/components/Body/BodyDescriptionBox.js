"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function BodyDescriptionBox({ selectedLabel }) {
  const descriptions = {
    Neurology:
      "The brain and nervous system focused on neurologic disorders, treatments, and outcomes.",
    Cardiovascular:
      "The cardiovascular system to analyze and measure various treatments and conditions of the heart and vasculature",
    Dermatology:
      "Evaluation of the safety and effectiveness of medical interventions and therapeutics of the skin.",
    "Radiation Oncology":
      "The precise delivery techniques, tumor response, encompassing various techniques and treatments to treat cancer.",
    "Skeletal System":
      "The skeletal system, osteology, bones and bone health or conditions.",
    "Women’s Health":
      "Female-specific health conditions, including reproductive health, and various female-specific treatments and therapies.",
    "Emerging Viruses": "Novel or newly recognized viral infections in humans.",
    Genetics:
      "Research involving DNA analysis to investigate the effectiveness and safety of new treatments or interventions.",
    Virology:
      "The effectiveness of a vaccine or medical intervention in humans to treat viral infections.",
    Urology:
      "The urologic system consisting of kidneys, ureters, bladder and urethra.",
    Inflammation:
      "Inflammation of the human body caused by chronic illness and diseases.",
    Hepatology:
      "Liver, gallbladder, biliary tree, and pancreas aiming to evaluate medical, surgical, or behavioral interventions.",
    Geriatrics:
      "A focus on older adults and changes that are related to the aging process.",
    Gastroenterology:
      "The gastrointestinal tract (GI tract) diseases, procedures or treatment outcomes.",
    Endocrinology:
      "Hormones, endocrine glands, and specific endocrine disorders like diabetes, Graves’ disease, and other autoimmune disorders.",
  };

  const rightRedLinePath = "/images/rightRedLine.svg";
  const rightBlueLinePath = "/images/rightBlueLine.svg";
  const leftBlueLinePath = "/images/leftBlueline.svg";
  const leftRedLinePath = "/images/leftRedline.svg";

  return (
    <>
      <AnimatePresence mode="wait">
        {selectedLabel && (
          <motion.div
            key={selectedLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="absolute text-white font-inter font-extrabold text-[20px] w-[475px] top-127 left-10 text-left">
              {selectedLabel}
            </div>

            <div
              className="absolute text-white font-inter text-[15px] leading-[20px] w-[475px] top-137 left-10 text-left overflow-hidden text-ellipsis pr-30 max-w-2xl"
              style={{
                maxWidth: "475px",
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {descriptions[selectedLabel]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-[200px] h-[120px]">
        {/* Red Line */}
        <Image
          src={leftRedLinePath}
          alt="Red decorative line"
          width={210}
          height={100}
          className="absolute top-120 left-0 opacity-100"
        />

        {/* Blue Line */}
        <Image
          src={leftBlueLinePath}
          alt="Blue decorative line"
          width={60}
          height={110}
          className="absolute top-122 left-[10.25px] opacity-100"
        />
      </div>

      <div className="absolute bottom-0 right-0 w-[449px] h-[170px]">
        <Image
          src={rightRedLinePath}
          alt="Bottom red line"
          width={350}
          height={160}
          className="absolute -top-20 -left-140 opacity-150"
        />

        <Image
          src={rightBlueLinePath}
          alt="Bottom blue line"
          width={350}
          height={350}
          className="absolute -top-8 -left-138 opacity-100"
        />
      </div>
    </>
  );
}
