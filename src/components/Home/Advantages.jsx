import React from 'react'
import resmilesdirme from '../../assets/resmilesdirme.svg'
import catdirilma from '../../assets/catdirilma.svg'
import bonus from '../../assets/bonus.svg'

const Advantages = () => {
    const advantages = [
        {
            title:"Qapıda rəsmiləşdirmə",
            desc:"Nağd, hissə-hissə və ya qapıda ödəmə imkanı",
            icon:resmilesdirme
        },
        {
            title:"Mağazadan Pulsuz Çatdırılma",
            desc:"30₼ və üstü sifarişlərdə  Bakı şəhəri ərazisinə ödənişsiz çatdırılma",
            icon:catdirilma
        },
        {
            title:"Bonus kartla daha çox alış veriş",
            desc:"Bonus karta yığılmış pullar ilə daha çox alış veriş etmək şansınız olacaq",
            icon:bonus
        }
    ]
  return (
    <div className='md:w-[95%] mx-auto px-3 my-[60px]'>
        <h2 className=' text-[36px] md:text-[48px] font-bold my-[16px]'>Üstünlüklərimiz</h2>
        <div className='flex flex-col md:flex-row gap-[24px]'>
            {advantages.map((item,index)=>(
                <div key={index} className='drop-shadow-md rounded-[8px] bg-white w-full flex items-center p-[16px] justify-center gap-[16px]'>
                    <img className='p-[16px] bg-[#FFF9D1] rounded-full' src={item.icon} alt={item.title} />
                    <div>
                        <p className='text-[20px] font-medium '>{item.title}</p>
                        <p className='font-light my-[8px]'>{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Advantages