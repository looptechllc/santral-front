import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const About = () => {
    const [about, setAbout] = useState();
    // const id = useParams();
    // console.log(id)
  useEffect(() => {
    // const accessToken = secureLocalStorage.getItem("access_token");
    fetch(`https://api.santral.az/v1/pages/10001`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },

    })
      .then((response) => response.json())
      .then((data) => {
        setAbout(data.data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
     
  }, []);
  useEffect(()=>{
    const contentbox = document.getElementById("content")
    contentbox.innerHTML = about?.content
  },[about])
  return (
    <div className='py-[24px] px-[16px] md:px-[48px]'>
      <h2 className='text-[32px] font-[400]'>{about?.title}</h2>
      <div id='content'></div>
    </div>
  )
}

export default About