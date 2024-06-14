import React from 'react'
import { Link } from 'react-router-dom';

const News = () => {
    const news =[
        {
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s",
            title:"Santral Baku expo centerde!",
            desc:"loremimpsum dolor sit amet",
            date:"12 Jan, 2024",
            link:"/almaarmud"
        }
    ] 
  return (
    <div className='px-[47px]'>
        <h2 className='font-[600] text-[48px]'>News</h2>
        {news.map((item,index)=>(
            <NewsCard img={item.img} title={item.title} desc={item.desc} date={item.date} link={item.link} />
        ))}
    </div>
  )
}

export default News;


const NewsCard = ({img,title,desc,date,link})=>{
    return(
        <div className='max-w-[433px] flex flex-col items-start gap-[16px]'>
            <img src={img} alt={title} className='w-[433px] h-[295px] object-cover rounded-[8px]' />
            <div className='flex flex-col items-start gap-[8px]'>
            <p className='font-[500] text-[24px] text-[#333]'>{title}</p>
            <p className='font-[400] text-[16px] text-[#333]'>{desc}</p>
            </div>
            <div className='w-full flex items-start justify-between'>
                <Link className='font-[500] px-[16px] py-[8px] rounded-[32px] bg-[#FFD23F]'>Ətraflı oxu</Link>
                <p className='text-[12px] text-[#333] font-400'>{date}</p>
            </div>


        </div>
    )
}