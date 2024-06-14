import React, { useEffect, useState } from 'react'

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


          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }, []);
  return (
    <div className='py-[52px] px-[48px]'>
        <h2 className='font-[600] text-[48px]'>
        Brands
        </h2>
        <div className='grid grid-cols-7 gap-[16px]'>
            {brands?.map((item,index)=>(
                <div className='w-[180px] h-[146px] rounded-full bg-black flex items-center justify-center'>
                    <img className='max-w-[120px]' src={`https://cdn.santral.az/images/${item.logo}`} alt="" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Brands