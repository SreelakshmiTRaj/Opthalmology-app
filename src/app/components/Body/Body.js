"use client";
import Image from "next/image";

export default function Body() {
  const bodyPath = "/images/body.svg";
  const lightPath = "/images/bodyLighting.svg";

  return (
    <section className="relative w-full bg-[#0b1626]/90 text-white py-12 px-6 flex flex-col items-center">
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
        <div
          className="absolute"
          style={{
            width: "500px",
            height: "520px",
            top: "200px", // moved up from 280px
            left: "640px",
            opacity: 0.8,
          }}
        >
          <Image
            src={lightPath}
            alt="Body lighting"
            fill
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {/* BODY IMAGE */}
        <div
          className="absolute"
          style={{
            width: "380px",
            height: "850px",
            top: "-80px", // moved up from 0px
            left: "700px",
          }}
        >
          <Image
            src={bodyPath}
            alt="Human body"
            fill
            className="object-contain pointer-events-none select-none drop-shadow-[0_0_25px_rgba(58,173,237,0.3)]"
          />
        </div>

        {/* RIGHT SIDE LABELS */}
        {[
          { text: "Neurology", top: 50, left: 234, width: 110 },
          { text: "Cardiovascular", top: 134, left: 274, width: 147 },
          { text: "Dermatology", top: 218, left: 261.5, width: 130 },
          { text: "Radiation Oncology", top: 302, left: 278.5, width: 181 },
          { text: "Skeletal System", top: 386, left: 292, width: 154 },
          { text: "Women’s Health", top: 470, left: 271.5, width: 155 },
          { text: "Emerging Viruses", top: 554, left: 274, width: 167 },
          { text: "Genetics", top: 627, left: 234, width: 100 },
        ].map((label, idx) => (
          <div
            key={idx}
            className="absolute text-sm font-medium text-white"
            style={{
              top: `${label.top}px`,
              left: `${label.left + 700}px`,
              width: `${label.width}px`,
              height: "32px",
              borderRadius: "24px",
              padding: "10px 15px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
              opacity: 1,
            }}
          >
            {label.text}
          </div>
        ))}
      </div>
    </section>
  );
}
