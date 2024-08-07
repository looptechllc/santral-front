import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
const News = () => {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
    
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    const [news,setNews] = useState()
    useEffect(() => {
        fetch("https://api.santral.az/v1/blogs/published?lang=az", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            setNews(data.data);


          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }, []);
    // const news =[
    //     {
    //         img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s",
    //         title:"Santral Baku expo centerde!",
    //         desc:"loremimpsum dolor sit amet",
    //         date:"12 Jan, 2024",
    //         link:"/almaarmud"
    //     }
    // ] 
  return (
    <div className='px-[16px] md:px-[47px]'>
        <div className='w-full flex items-center justify-between'>
        <h2 className='font-[600] text-[24px] md:text-[48px]'>Xəbərlər</h2>
        <Link to="/news" className='text-[20px] font-medium text-[#FFD23F]'>Hamısına bax</Link>
        </div>
        <Slider {...settings}>
        {news?.map((item,index)=>(
            <NewsCard img={`https://cdn.santral.az/images/${item.thumbnail}`} title={item.title} desc={item.desc} date={item?.date?new Date(item?.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }):""} link={item.id} />
        ))}
        </Slider>
    </div>
  )
}

export default News;


const NewsCard = ({img,title,desc,date,link})=>{
    return(
        <div className='max-w-[433px] flex flex-col items-start gap-[16px] mb-[48px] md:mb-[120px]'>
            <img src={img} alt={title} className='w-[433px] h-[295px] object-center rounded-[8px]' />
            <div className='flex flex-col items-start gap-[8px]'>
            <p className='font-[500] text-[24px] text-[#333] line-clamp-1'>{title}</p>
            <p className='font-[400] text-[16px] text-[#333]'>{desc}</p>
            </div>
            <div className='w-full flex items-start justify-between'>
                <Link to={`/news/${link}`} className='font-[500] px-[16px] py-[8px] rounded-[32px] bg-[#FFD23F]  border border-solid border-[#FFD23F] active:border-white hover:bg-white duration-300'>Ətraflı oxu</Link>
                <p className='text-[12px] text-[#333] font-400'>{date}</p>
            </div>


        </div>
    )
}