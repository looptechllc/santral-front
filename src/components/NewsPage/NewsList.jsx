import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanitizeHtml from 'sanitize-html';
import he from 'he'
const NewsList = () => {
  const [news, setNews] = useState();
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
        console.log(data.data)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  return (
    <div className=" px-[50px] py-[32px]">
        <div>
            <h2 className="text-[48px] text-[#424242] text-center">Santral xəbərlər</h2>
            <p className="my-[16px] text-[24px] text-[#848484] text-center">Santralın xəbərlərindən xəbərdar olun!</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] py-[40px]">
        {news?.map((item, index) => (
          <NewsCard
            img={`https://cdn.santral.az/images/${item.thumbnail}`}
            title={item.title}
            desc={item.content}
            date={
              item?.date
                ? new Date(item?.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""
            }
            link={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;


const NewsCard = ({img,title,desc,date,link})=>{
    const decodedDesc = he.decode(desc);

  // Remove HTML tags
  const plainText = decodedDesc.replace(/<[^>]+>/g, '').substring(0, 300) + "...";
    return(
        <div className='max-w-[433px] flex flex-col items-start gap-[16px]'>
            <img src={img} alt={title} className='w-[433px] h-[295px] object-center rounded-[8px]' />
            <div className='flex flex-col items-start gap-[8px]'>
            <p className='font-[500]  text-[24px] text-[#333]'>{title}</p>
            <p className='font-[400] text-[16px] text-[#333] pr-5'   dangerouslySetInnerHTML={{ __html: plainText }}></p>
            </div>
            <div className='w-full flex items-start justify-between'>
                <Link to={`/news/${link}`} className='font-[500] z-20 px-[16px] py-[8px] rounded-[32px] bg-[#FFD23F]'>Ətraflı oxu</Link>
                <p className='text-[12px] text-[#333] font-400'>{date}</p>
            </div>


        </div>
    )
}