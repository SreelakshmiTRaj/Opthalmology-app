import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import Image from "next/image";
import Overview from "./components/Overview/Overview";

export default function Home() {
  const bgImagePath = "/images/bgImage.svg";

  return (
    <main className="w-full min-h-screen text-white overflow-hidden">
      <section className="relative w-full min-h-screen bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImagePath}
            alt="background"
            fill
            className="object-cover"
            quality={100}
          />
        </div>

        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          <Hero />
        </div>
      </section>

      <section className="relative z-30 w-full mx-auto">
          <Body />
      </section>
      <section className="relative z-40">
        <Overview />
      </section>
    </main>
  );
}
