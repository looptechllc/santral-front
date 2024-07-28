import React from "react";
import banner1 from "../../assets/upperbanner1.png";
import banner2 from "../../assets/upperbanner2.png";
import banner3 from "../../assets/upperbanner3.png";
const ProductsGrid = () => {
  return (
    <div className="md:w-[95%] mx-auto px-3 my-[60px] flex flex-col md:flex-row  gap-[24px]">
      <div className="rounded-[16px] overflow-hidden   relative">
        <img src={banner1} alt="gardena" className="object-cover" />
       
      </div>
      <div className="flex flex-col gap-[24px] ">
      
      <div className="  w-full  rounded-[16px] overflow-hidden  relative">
        <img src={banner2} alt="skyline" className="object-cover" />
        {/* <div className="absolute  top-[24px] left-[24px] bg-[#000]/50 rounded-[8px] px-[16px] py-[12px] ">
          {" "}
          <h4 className="text-[20px] text-left font-medium text-white">Scheinder məhsulları</h4>
          <p className="text-white font-[500]">Evinizi orijinal üslubla təchiz etmək üçün ən yaxşı mebellər və ən son dizayn</p>
        </div> */}
      </div>
      <div className="rounded-[16px] overflow-hidden w-full relative">
        <img src={banner3} alt="stihl" className="object-cover" />
        {/* <div className="absolute  bottom-0 right-0 bg-[#fff]/70 p-[16px] rounded-tl-[16px] text-[20px] text-center font-medium">
          {" "}
          Stihl məhsulları
        </div> */}
      </div>
      </div>
      
    </div>
  );
};

export default ProductsGrid;
