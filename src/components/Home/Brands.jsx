import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Brands = () => {

    const [brands,setBrands] = useState()
    useEffect(() => {
        fetch("https://api.santral.az/v1/brands/published?lang=az", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            setBrands(data.data);
            console.log(data)


          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }, []);
  return (
    <div className='py-[52px] px-[48px] hidden md:block'>
        <h2 className='font-[600] text-[48px]'>
        Brands
        </h2>
        <div className='grid grid-cols-3 lg:grid-cols-7 grid-rows-2 overflow-scroll gap-[16px]'>
            {brands?.map((item,index)=>(
                <Link to={item.route} className='w-[180px] h-[146px] rounded-full bg-black flex items-center justify-center'>
                    <img className='max-w-[120px]' src={`https://cdn.santral.az/images/${item.logo}`} alt="" />
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Brands