import { fontBangla } from "@/app/layout";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-10 py-10 md:py-16">
      
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6">
        <h2
          className={`${fontBangla.className} 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-bold leading-snug md:leading-[70px]`}
        >
          আপনার শিশুকে দিন একটি{" "}
          <span className="text-primary">সুন্দর ভবিষ্যত</span>
        </h2>

        <p className="text-gray-600 text-[15px] sm:text-base">
          Buy Every Toy with up to
          <span className="font-semibold text-primary"> 15% Discount</span>
        </p>

        <div>
          <button className="btn btn-primary btn-outline px-6">
            Explore Products
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex justify-center">
        <Image
          alt="Buy Every toy with up to 15% Discount"
          src={"/assets/hero.png"}
          width={550}
          height={450}
          className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[500px] h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default Banner;
