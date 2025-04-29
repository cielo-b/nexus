// components/Sponsors.tsx
import Image from "next/image";
import techno from "@/public/images/techno.png";
import yto from "@/public/images/yto2.png";
import aguura from "@/public/images/aguura.png";
import zoe from "@/public/images/zoe.svg";
import AnimatedContent from "./animated";
import { Marquee } from "./marquee";

const Sponsors = () => {
  const sponsors = [
    { name: "TechnoServe", image: techno },
    { name: "ZoeEmpowers", image: zoe },
    { name: "YTO Logistics", image: yto },
    { name: "Aguura Inc.", image: aguura },
  ];

  return (
    <AnimatedContent>
      <div className="w-full flex flex-col py-16 gap-10 items-center justify-center overflow-hidden bg-background">
        <h1 className="text-[#838383] font-medium">
          Partners and Clientele
        </h1>
        <div className="w-full px-4 md:px-0 md:w-4/5 relative">
          <div className="relative w-full">
            <Marquee 
              pauseOnHover 
              duration={20}
              className="py-4 [--gap:2rem]"
            >
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center mx-4 md:mx-10 cursor-pointer transition-transform hover:scale-105"
                >
                  <Image 
                    src={sponsor.image} 
                    alt={sponsor.name} 
                    width={180} 
                    height={80}
                    className="object-contain h-12 md:h-16 w-auto"
                  />
                </div>
              ))}
            </Marquee>
            {/* Gradient fade effects */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          </div>
        </div>
      </div>
    </AnimatedContent>
  );
};

export default Sponsors;