import React from "react";
import skyline from "../../assets/skyline.png";
import stihl from "../../assets/stihl.png";
import gardena from "../../assets/gardena.png";
const ProductsGrid = () => {
  return (
    <div className="md:w-[95%] mx-auto px-3 grid grid-cols-2 gap-[24px]">
      <div className="  w-full row-span-2 rounded-[16px] overflow-hidden  relative">
        <img src={skyline} alt="skyline" className="object-cover" />
        <div className="absolute w-full bottom-0 bg-[#fff]/70 py-[16px] text-[20px] text-center font-medium"> Skyline design mebellər </div>
      </div>
      <div className="rounded-[16px] overflow-hidden w-full relative">
        <img src={stihl} alt="stihl" className="object-cover" />
        <div className="absolute  bottom-0 right-0 bg-[#fff]/70 p-[16px] rounded-tl-[16px] text-[20px] text-center font-medium"> Stihl məhsulları</div>
      </div>
      <div className="rounded-[16px] overflow-hidden  w-full relative">
        <img src={gardena} alt="gardena" className="object-cover" />
        <div className="absolute  bottom-0 left-0 bg-[#fff]/70 p-[16px] rounded-tr-[16px] text-[20px] text-center font-medium"> Gardena məhsulları</div>
      </div>
    </div>
  );
};

export default ProductsGrid;
