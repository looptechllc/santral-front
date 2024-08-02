import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import he from 'he';

const NewsDetail = () => {
  const [news, setNews] = useState();
  const id = useParams();
  
  useEffect(() => {
    const accessToken = secureLocalStorage.getItem("access_token");
    fetch(`https://api.santral.az/v1/blogs/info/${id.slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);

  const decodedContent = news ? he.decode(news.content) : '';

  return (
    <div className='px-[16px] md:px-[276px] py-[32px] max-w-[1440px] mx-auto'>
      <h2 className='text-[48px] text-[#333]'>{news?.title}</h2>
      {news && (
        <img src={`https://cdn.santral.az//images/${news.thumbnail}`} alt='thumbnail' className='w-full rounded-[16px] my-[26px]' />
      )}
      <div id='content' dangerouslySetInnerHTML={{ __html: decodedContent }}></div>
    </div>
  );
};

export default NewsDetail;
