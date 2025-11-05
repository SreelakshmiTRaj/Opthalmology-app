import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import Image from "next/image";

export default function Home() {
  const bgImagePath = "/images/bgImage.svg";

  return (
    <section className="relative w-full min-h-screen bg-primary-dark text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImagePath}
          alt="background"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-[#0b1626]/60 z-10"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <Hero />
          {/* Blurred overlay behind Body */}
          <div className="absolute inset-0 backdrop-blur-[8px] bg-[#0b1626]/40 z-0 rounded-t-3xl"></div>

          {/* Actual Body content */}
          <div className="relative z-10">
            <Body />
          </div>
      </div>
    </section>
  );
}
