import React from "react";
import banner1 from "../../assets/bottombanner1.png";
import banner2 from "../../assets/bottombanner2.png";
import banner3 from "../../assets/bottombanner3.png";
const BottomBanner = () => {
  return (
    <div className="md:w-[95%] mx-auto px-3 my-[60px] flex flex-col md:flex-row  gap-[24px]">
      <div className="flex flex-col gap-[24px] ">
      <div className="  w-full  rounded-[16px] overflow-hidden  relative">
        <img src={banner1} alt="skyline" className="object-cover" />
        <div className="absolute  top-[24px] left-[24px] bg-[#000]/50 text-white duration-300 hover:bg-[#FFD23F]/80 hover:text-black rounded-[8px] px-[16px] py-[12px] ">
          {" "}
          <h4 className="text-[20px] text-left font-medium ">Scheinder məhsulları</h4>
          <p className=" font-[500]">Evinizi orijinal üslubla təchiz etmək üçün ən yaxşı mebellər və ən son dizayn</p>
        </div>
      </div>
      <div className="rounded-[16px] overflow-hidden w-full relative">
        <img src={banner2} alt="stihl" className="object-cover" />
        <div className="absolute  top-[24px] left-[24px] bg-[#000]/50 text-white duration-300 hover:bg-[#FFD23F]/80 hover:text-black rounded-[8px] px-[16px] py-[12px] ">
          {" "}
          <h4 className="text-[20px] text-left font-medium ">Bosch məhsulları</h4>
          <p className=" font-[500]">Evinizi orijinal üslubla təchiz etmək üçün ən yaxşı mebellər və ən son dizayn</p>
        </div>
      </div>
      </div>
      <div className="rounded-[16px] overflow-hidden   relative">
        <img src={banner3} alt="gardena" className="object-cover" />
        <div className="absolute  top-[24px] left-[24px] right-[24px] bg-[#000]/50 text-white duration-300 hover:bg-[#FFD23F]/80 hover:text-black rounded-[8px] px-[16px] py-[12px] ">
          {" "}
          <h4 className="text-[20px] text-left font-medium ">Gardena məhsulları</h4>
          <p className=" font-[500]">Evinizi orijinal üslubla təchiz etmək üçün ən yaxşı mebellər və ən son dizayn</p>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
