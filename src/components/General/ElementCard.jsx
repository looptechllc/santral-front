import React, { useState } from 'react'
import cart from '../../assets/cart.svg'
import heart from '../../assets/heart.svg'
import heartFill from '../../assets/heartFill.svg'
const ElementCard = ({img,sale,name,price,beforePrice}) => {
    const [liked,setLiked] = useState()
    const toggleLike =()=>{
        setLiked(!liked)
    }
  return (
    <div className='bg-[#f5f5f5] rounded-[8px] overflow-hidden max-w-[330px]'>
        <div className="w-full relative">
        <img className='w-full max-h-[250px]' src={img} alt="element image" />
        {sale!=0&&
        <p className='bg-red-500 text-white rounded-bl-[8px] absolute top-0 right-0 p-[12px]'>
            {sale} %
        </p>}
        </div>
        <div className='p-[16px] flex flex-col items-start gap-[16px]'>
            <p className='font-medium text-[24px]'>{name}</p>
            <div className='flex items-center gap-[12px]'>
            <p className='text-[#FD8521] text-[24px] font-medium leading-[32px]'>{price} ₼</p>
            {beforePrice!=0&&<p className='text-[#808080] line-through text-[18px] font-medium leading-[32px]'>{beforePrice} ₼</p>}
            
            </div>
            <div className='flex items-center justify-between w-full'>
            <button className='flex items-center gap-[10px] bg-[#FFD23F] py-[16px] px-[30px] rounded-[32px]'>
                <img src={cart} alt="cart.svg" />
                Səbətə əlavə et
            </button>
            <button onClick={toggleLike} className={`p-3 rounded-full ${liked?"bg-[#FDDBD8]":"bg-[#efefef]"} duration-300`}>
                {liked?<img src={heartFill} alt="heart.svg" className='bg' />:<img src={heart} alt="heart.svg" className='bg' />}
            </button>
            </div>

        </div>
    </div>
  )
}

export default ElementCard