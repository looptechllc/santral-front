import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import heart from "../../assets/heart.svg";
import cart from "../../assets/cart.svg";
import tamcard from "../../assets/tamcard.svg";
import share from "../../assets/share.svg";
import heartFill from "../../assets/heartFill.svg";
import ReactImageGallery from "react-image-gallery";
import ElementCard from "../General/ElementCard";
const ProductInfo = () => {
  const { name } = useParams();
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);
  const [creditMonth, setCreditMonth] = useState(6);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState();
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://api.santral.az/v1/routes/find?domain=santral_www&location=/az/products/${name}`
        );
        const data = await response.json();
        // console.log(data);
        setDescription(data.route);
        setCount(data.route.minimalOrder);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [name]);
  async function fetchRelated(id) {
    const url = `https://api.santral.az/v1/products/published?id=${id}&related=1&lang=az`;

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
        setRelatedProducts(data.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      // toast.error("Error:", error);
    }
  }
  useEffect(() => {
    fetchRelated(description?.id);
  }, [description]);
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > description?.minimalOrder) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const [liked, setLiked] = useState();
  const toggleLike = () => {
    setLiked(!liked);
  };
  const images =
    description?.images?.length > 0
      ? description?.images?.map((item) => item)
      : [description.thumbnail];
  console.log(images);
  return (
    <div className="md:w-[95%] mx-auto pb-[120px] ">
      <div className="flex flex-col md:flex-row gap-[24px] my-[24px]">
        <div className="bg-white w-full rounded-[16px] p-[16px]  drop-shadow-sm border border-solid border-[#EAEAEA] ">
          {images && (
            <div className="flex items-start gap-[16px]">
              <div className="flex flex-col gap-[16px]">
                {images?.map((item, index) => (
                  <img
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className="rounded-[16px] w-[74px]"
                    src={`https://cdn.santral.az/images/${item}`}
                    alt=""
                  />
                ))}
              </div>

              <div className="h-[525px] w-[530px]">
                <img
                  className="rounded-[16px] object-cover"
                  src={`https://cdn.santral.az/images/${images[selectedIndex]}`}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div className="bg-white drop-shadow-sm border border-solid border-[#EAEAEA] rounded-[16px] p-[18px] w-full flex flex-col gap-[24px]">
          <div className=" border-b border-[#eaeaea] py-[24px]">
            <div className="flex items-center gap-[16px] w-full justify-between">
              <p className="text-[24px] font-medium">{description?.title}</p>
              <div className="w-full flex items-center justify-end gap-[8px] md:gap-[16px]">
                <button
                  onClick={toggleLike}
                  className={`p-3 rounded-full ${
                    liked ? "bg-[#FDDBD8]" : "bg-[#efefef]"
                  } duration-300`}
                >
                  {liked ? (
                    <img src={heartFill} alt="heart.svg" className="bg" />
                  ) : (
                    <img src={heart} alt="heart.svg" className="bg" />
                  )}
                </button>
                <button
                  className={`p-3 rounded-full bg-[#efefef] duration-300`}
                >
                  <img src={share} alt="share.svg" className="bg" />
                </button>
              </div>
            </div>
            <div className="flex w-full items-center justify-between mt-[16px]">
              {description?.stock > 0 ? (
                <p className="text-[#17A539] font-medium">Məhsul mövcuddur</p>
              ) : (
                <p className="text-[#a51717] font-medium">
                  Məhsul mövcud deyil
                </p>
              )}
              <p className="text-[#777] font-light">
                SKU: {description?.title}
              </p>
            </div>
          </div>

          <div className=" flex w-full items-center justify-between border-b border-[#eaeaea] py-[24px]">
            <div className="flex items-center gap-[10px] p-[6px]  border border-[#EAEAEA] w-fit rounded-[32px]">
            <button
  className="duration-300 bg-white hover:bg-[#FFD23F] text-black/40 hover:text-white w-[40px] h-[40px] rounded-full text-[32px] flex items-center justify-center p-0 group"
  onClick={decrement}
>
  <svg
    className="fill-current text-black/40 group-hover:text-white"
    width="18"
    height="2"
    viewBox="0 0 18 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 2H1C0.453333 2 0 1.54667 0 1C0 0.453333 0.453333 0 1 0H17C17.5467 0 18 0.453333 18 1C18 1.54667 17.5467 2 17 2Z"
      fill="currentColor"
    />
  </svg>
</button>
<span className="text-[20px] font-medium">{count}</span>
<button
  className="duration-300 bg-white hover:bg-[#FFD23F] text-black/40 hover:text-white w-[40px] h-[40px] rounded-full text-[32px] flex items-center justify-center p-0 group"
  onClick={increment}
>
  <svg
    className="fill-current text-black/40 group-hover:text-white"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 17H8C7.45333 17 7 16.5467 7 16C7 15.4533 7.45333 15 8 15H24C24.5467 15 25 15.4533 25 16C25 16.5467 24.5467 17 24 17Z"
      fill="currentColor"
    />
    <path
      d="M16 25C15.4533 25 15 24.5467 15 24V8C15 7.45333 15.4533 7 16 7C16.5467 7 17 7.45333 17 8V24C17 24.5467 16.5467 25 16 25Z"
      fill="currentColor"
    />
  </svg>
</button>

            </div>
            <p className="text-[#FD8521] text-[32px] font-bold">
              {(count * description?.price).toFixed(2)} ₼
            </p>
          </div>
          <div>
            <div className="flex flex-col-reverse md:flex-row items-center w-full gap-[16px]">
              <div className="w-full">
                <p className="text-[20px] font-medium">
                  Hissəli alış kalkulyatoru
                </p>
                <p className="text-[#777] font-light my-[6px]">
                  Şərtlər endirimsiz qiymətə tətbiq olunur
                </p>
              </div>
              <div className=" w-full border-[2px] border-solid border-[#FFD23F] rounded-[10px] p-[16px] flex items-center justify-center gap-[10px]">
                <img src={tamcard} alt="tamcard.svg" />
                <p className="font-light">TamKart ilə faizsiz ödə!</p>
              </div>
            </div>
            <div className="p-[24px] border border-solid border-[#eaeaea] rounded-[10px] my-[16px] flex flex-col-reverse md:flex-row items-center justify-between">
              <div className="flex items-center justify-center w-full gap-[15px] px-[16px] md:px-[32px] py-[16px] md:py-0">
                <button
                  onClick={() => {
                    setCreditMonth(6);
                  }}
                  className={`${
                    creditMonth == 6
                      ? "bg-[#323232] text-white"
                      : "bg-[#F3F3F3] text-black"
                  } w-[40px] md:w-[50px] h-[50px] md:h-[50px] text-[12px] whitespace-nowrap px-[8px] py-[12px] rounded-full `}
                >
                  6 ay
                </button>
                <button
                  onClick={() => {
                    setCreditMonth(9);
                  }}
                  className={`${
                    creditMonth == 9
                      ? "bg-[#323232] text-white"
                      : "bg-[#F3F3F3] text-black"
                  } w-[50px] h-[50px] text-[12px] whitespace-nowrap px-[8px] py-[12px] rounded-full `}
                >
                  9 ay
                </button>
                <button
                  onClick={() => {
                    setCreditMonth(12);
                  }}
                  className={`${
                    creditMonth == 12
                      ? "bg-[#323232] text-white"
                      : "bg-[#F3F3F3] text-black"
                  } w-[50px] h-[50px] text-[12px] whitespace-nowrap px-[8px] py-[12px] rounded-full `}
                >
                  12 ay
                </button>
                <button
                  onClick={() => {
                    setCreditMonth(15);
                  }}
                  className={`${
                    creditMonth == 15
                      ? "bg-[#323232] text-white"
                      : "bg-[#F3F3F3] text-black"
                  } w-[50px] h-[50px] text-[12px] whitespace-nowrap px-[8px] py-[12px] rounded-full `}
                >
                  15 ay
                </button>
                <button
                  onClick={() => {
                    setCreditMonth(18);
                  }}
                  className={`${
                    creditMonth == 18
                      ? "bg-[#323232] text-white"
                      : "bg-[#F3F3F3] text-black"
                  } w-[50px] h-[50px] text-[12px] whitespace-nowrap px-[8px] py-[12px] rounded-full `}
                >
                  18 ay
                </button>
                <button
                  onClick={() => {
                    setCreditMonth(24);
                  }}
                  className={`${
                    creditMonth == 24
                      ? "bg-[#323232] text-white"
                      : "bg-[#F3F3F3] text-black"
                  } w-[50px] h-[50px] text-[12px] whitespace-nowrap px-[8px] py-[12px] rounded-full `}
                >
                  24 ay
                </button>
              </div>
              <div className="md:px-[32px]  border-b md:border-l md:border-b-0 border-solid border-[#eaeaea] flex md:flex-col items-center w-full justify-between md:w-fit">
                <p className="whitespace-nowrap">Aylıq ödəniş</p>
                <p className="font-medium mt-[9px]">
                  {((description.price * count) / creditMonth).toFixed(2)} ₼
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <button className="border-2 border-solid border-[#FFD23F] py-[16px] w-full rounded-[32px] font-medium">
              Zəng et
            </button>
            <button className="border-2 border-solid border-[#ffd23f] bg-[#ffd23f] py-[16px] w-full rounded-[32px] font-medium flex items-center justify-center gap-[10px]">
              <img src={cart} alt="cart.svg" />
              Səbətə at
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[16px]">
        <button
          onClick={() => {
            setSelectedDetail(0);
          }}
          className={`duration-300 mb-[16px] p-[16px] rounded-[32px] ${
            selectedDetail == 0 ? "bg-[#FFD23F]" : "bg-[#EAEAEA]"
          }`}
        >
          Xüsusiyyətlər
        </button>
        <button
          onClick={() => {
            setSelectedDetail(1);
          }}
          className={`duration-300 mb-[16px] p-[16px] rounded-[32px] ${
            selectedDetail == 1 ? "bg-[#FFD23F]" : "bg-[#EAEAEA]"
          }`}
        >
          Oxşar məhsullar
        </button>
      </div>
      {!selectedDetail ? (
        <div className="bg-white drop-shadow-sm border border-solid border-[#EAEAEA] rounded-[16px] p-[18px] ">
          {description?.desc && (
            <p className="text-black/90">{description?.desc}</p>
          )}
          {description?.parameters?.length > 0 && (
            <div className="grid grid-cols-2 gap-[24px] my-[24px]">
              {description?.parameters?.map((item, index) => (
                <div className="pb-[12px] w-full border-b border-[#EAEAEA] flex items-center justify-between">
                  <p className="text-[#777777]">{item?.param?.title}</p>
                  <p>{item?.option?.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white drop-shadow-sm border border-solid border-[#EAEAEA] rounded-[16px] p-[18px] grid  gap-[24px] grid-cols-1 md:grid-cols-4 place-items-center">
          {relatedProducts?.map((item, index) => (
            <ElementCard
              id={item?.id}
              img={`https://cdn.santral.az//images/${item.thumbnail}`}
              sale={item.discountPercent}
              name={item?.name}
              price={item?.price}
              beforePrice={item.oldPrice}
              link={item.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
