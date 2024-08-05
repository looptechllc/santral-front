import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ElementCard from "../General/ElementCard";
import Countdown from 'react-countdown';

const SaleProducts = () => {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const url = `https://api.santral.az/v1/sliders/bottom/published?page=1&lang=az`;
    setProducts([]);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data);
      } else {
        console.log("Error fetching products");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="md:w-[95%] mx-auto my-[60px] ">
      <h2 className="text-[36px] md:text-[48px] font-bold my-[16px]">
        Endirimli məhsullar
      </h2>

      <div className="px-3 grid grid-cols-1 md:grid-cols-2  gap-[24px]">
        <div className="w-full row-span-2 rounded-[16px] overflow-hidden relative">
          {products?.slice(0, 1).map((item, index) => {
            const finishDate = new Date(item.finishDate); // Parse finishDate

            return (
              <div className="bg-[#f5f5f5] hover:bg-[#fff9d1] duration-300 rounded-[8px] overflow-hidden w-full h-full" key={index}>
                <div className="w-full relative">
                  <Link to={`/product/${item.products[0].name}`}>
                    <img
                      className="w-full h-[600px]"
                      src={`https://cdn.santral.az//images/${item.image}`}
                      alt="element image"
                    />
                  </Link>
                </div>
                <div className="p-[16px] h-full flex flex-col items-start gap-[16px]">
                  <p className="font-medium text-[48px] max-h-[64px] overflow-hidden">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-[16px]">
                    <p className="text-[#FD8521] text-[48px] font-medium leading-[32px]">
                      {item.products[0].price} ₼
                    </p>
                    {item.products[0].oldPrice !== 0 && (
                      <p className="text-[#808080] line-through text-[32px] font-medium leading-[32px]">
                        {item.products[0].oldPrice} ₼
                      </p>
                    )}
                  </div>
                  <div className="mt-[28px] w-full grid grid-cols-4 md:gap-[16px]">
                    {/* Countdown Display */}
                    <div className="md:w-[137px] min-h-[122px] bg-[#FFD23F] md:rounded-[8px] rounded-l-[16px] p-[12px] flex flex-col items-center justify-center gap-[10px]">
                      <Countdown date={finishDate} renderer={({ days }) => (
                        <>
                          <p className="font-[700] text-[24px] md:text-[56px]">{String(days).padStart(2, '0')}</p>
                          <p className="text-black/60 text-[14px] md:text-[20px]">Gün</p>
                        </>
                      )} />
                    </div>
                    <div className="md:w-[137px] min-h-[122px] bg-[#FFD23F] md:rounded-[8px] p-[12px] flex flex-col items-center justify-center gap-[10px]">
                      <Countdown date={finishDate} renderer={({ hours }) => (
                        <>
                          <p className="font-[700] text-[24px] md:text-[56px]">{String(hours).padStart(2, '0')}</p>
                          <p className="text-black/60 text-[14px] md:text-[20px]">Saat</p>
                        </>
                      )} />
                    </div>
                    <div className="md:w-[137px] min-h-[122px] bg-[#FFD23F] md:rounded-[8px] p-[12px] flex flex-col items-center justify-center gap-[10px]">
                      <Countdown date={finishDate} renderer={({ minutes }) => (
                        <>
                          <p className="font-[700] text-[24px] md:text-[56px]">{String(minutes).padStart(2, '0')}</p>
                          <p className="text-black/60 text-[14px] md:text-[20px]">Dəq</p>
                        </>
                      )} />
                    </div>
                    <div className="md:w-[137px] min-h-[122px] bg-[#FFD23F] md:rounded-[8px] rounded-r-[16px] p-[12px] flex flex-col items-center justify-center gap-[10px]">
                      <Countdown date={finishDate} renderer={({ seconds }) => (
                        <>
                          <p className="font-[700] text-[24px] md:text-[56px]">{String(seconds).padStart(2, '0')}</p>
                          <p className="text-black/60 text-[14px] md:text-[20px]">san</p>
                        </>
                      )} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 gap-[16px]">
          {products?.slice(1, 5).map((product, index) => (
            <ElementCard
              id={product?.id}
              key={index}
              img={`https://cdn.santral.az//images/${product.image}`}
              name={product.title}
              price={product.products[0].price}
              beforePrice={product.products[0].oldPrice}
              sale={product.products[0].discountPercent}
              link={product.products[0].name}
              isLiked={product.products[0].isLiked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaleProducts;
