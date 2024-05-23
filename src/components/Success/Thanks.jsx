import React from 'react'
import success from '../../assets/success.svg'
import { Link } from 'react-router-dom'
const Thanks = () => {
  return (
    <div className='bg-[#fffefa] py-[34px] w-full flex items-center justify-center'>
        <div className='border border-solid border-[#EAEAEA] bg-white p-[24px] rounded-[16px] flex flex-col items-center gap-[32px]'>
            <img src={success} alt="success.svg" />
            <div className='flex flex-col items-center gap-[24px]'>
            <h2 className='font-bold text-[48px] '>Sifarişiniz üçün təşəkkür edirik</h2>
            <p className=''>Sifarişiniz uğurla tamamlandı</p>
            <p className=''>Sifarişinizin rəsmiləşdirilməsi üçün sizinlə əlaqə saxlanılacaqdır</p>
            </div>
            <div className="flex w-full gap-[16px]">
                <Link className='bg-[#FFD23F] border border-solid border-[#FFD23F] rounded-[32px] px-[24px] py-[16px] w-full text-center' to="/">
                Əsas səhifə
                </Link>
                <Link className='border border-solid border-[#FFD23F] rounded-[32px] px-[24px] py-[16px] w-full text-center text-[#FFD23F]' to="/orders">
                Sifarişlərim
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Thanks