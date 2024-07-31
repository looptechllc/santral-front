import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const NewsDetail = () => {
    const [news, setNews] = useState();
    const id = useParams();
    // console.log(id)
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
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
     
  }, []);
  useEffect(()=>{
    const contentbox = document.getElementById("content")
    contentbox.innerHTML = news?.content
  },[news])
  return (
    <div  className='px-[16px] md:px-[276px] py-[32px] max-w-[1440px] mx-auto'>
      <h2 className='text-[48px] text-[#333]'>{news?.title}</h2>
      <img src={`https://cdn.santral.az//images/${news?.thumbnail}`} alt='thumbnail' className='w-full rounded-[16px] my-[26px]' />
      <div id='content'></div>
    </div>
  )
}

export default NewsDetail