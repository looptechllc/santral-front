import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage';
import ElementCard from '../components/General/ElementCard';

const Favorites = () => {
    const [favorites,setFavorites] = useState();
    async function fetchFavorites() {
        const accessToken = secureLocalStorage.getItem("access_token");
        const url = `https://api.santral.az/v1/customers/favorites/`;
    
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            // body: JSON.stringify({}),
          });
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setFavorites(data);
            
          } else {
            console.log("error");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }


      useEffect(()=>{
        fetchFavorites()
      },[])
  return (
    <div className='px-[48px] pt-[24px] pb-[108px]'>
        <div>
        <h2 className='text-[32px] text-black/90'>Seçilmişlər</h2>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-[24px] my-[24px]'>
            {favorites?.map((item,index)=>(
                <ElementCard id ={item.id} img={`https://cdn.santral.az//images/${item.thumbnail}`} sale={0}  name={item.title} price={item.price}  beforePrice={item.oldPrice} isLiked={true}  link={item.title}/>
            ))}
        </div>
    </div>
  )
}

export default Favorites