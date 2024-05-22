import React from "react";
import vitaluce from "../../assets/vitaluce.png";
import elementimage from "../../assets/elementimage.jpg";
import ElementCard from "../General/ElementCard";

const SaleProducts = () => {
  const element = {img: elementimage,sale:"40",name:"Lorem ipsum dolor sit amet consectetur",price:"699",beforePrice:"999"}
  return (
    <div className="md:w-[95%] mx-auto my-[60px]">
    <h2 className=' text-[36px] md:text-[48px] font-bold my-[16px]'>Endirimli məhsullar</h2>

<div className=" px-3 grid grid-cols-2 gap-[24px]">
  <div className="  w-full row-span-2 rounded-[16px] overflow-hidden  relative">
    <img src={vitaluce} alt="vitaluce" className="object-cover" />
    <div className="absolute w-full bottom-0 border-t-2 border-solid border-[#FFD23F] rounded-t-full bg-[#fff]/70 p-[60px] text-[36px] text-white text-center font-medium flex items-center justify-center gap-[24px]"> 
    <p className="text-left font-medium">
    40%-ə qədər endirimlərlə Santralda 
    </p>
    <button className='flex text-black whitespace-nowrap items-center gap-[10px] bg-[#FFD23F] py-[16px] px-[24px] rounded-[32px] text-[16px]'>

    İndi kəşf edin
        </button>
     </div>
  </div>
  <div className="grid grid-cols-2 gap-[16px]">
    <ElementCard  img={element.img} sale={element.sale} name={element.name} price={element.price} beforePrice={element.beforePrice}/>
    <ElementCard  img={element.img} sale={element.sale} name={element.name} price={element.price} beforePrice={element.beforePrice}/>
  </div>
  <div className="grid grid-cols-2 gap-[16px]">
    <ElementCard  img={element.img} sale={element.sale} name={element.name} price={element.price} beforePrice={element.beforePrice}/>
    <ElementCard  img={element.img} sale={element.sale} name={element.name} price={element.price} beforePrice={element.beforePrice}/>
  </div>
</div>
    </div>
  );
};

export default SaleProducts;
