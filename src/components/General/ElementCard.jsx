import React, { useState } from "react";
import cart from "../../assets/cart.svg";
import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heartFill.svg";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const ElementCard = ({
  id,
  img,
  sale,
  name,
  price,
  beforePrice,
  link,
  isLiked,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const toggleLike = () => {
    setLiked(!liked);
  };

  const accessToken = secureLocalStorage.getItem("access_token");

  async function addToCard(e) {
    e.preventDefault();
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/products/basket/add`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          count: 1,
          product: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("item added successfully");
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }
  async function addFavorite(e) {
    e.preventDefault();
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/customers/favorites/add`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("item added successfully");
        toggleLike();
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function removeFavorite(e) {
    e.preventDefault();
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/customers/favorites/remove`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("item added successfully");
        toggleLike();
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className="bg-[#f5f5f5] rounded-[8px] overflow-hidden max-w-[330px]">
      <div className="w-full relative">
        <Link to={`/product/${link}`}>
          {" "}
          <img className="w-full h-[250px]" src={img} alt="element image" />
        </Link>
        {sale != 0&&beforePrice!=0 && (
          <p className="bg-red-500 text-white rounded-bl-[8px] absolute top-0 right-0 p-[12px]">
            {sale} %
          </p>
        )}
      </div>
      <div className="p-[16px] flex flex-col items-start gap-[16px]">
        <p className="font-medium text-[24px] max-h-[64px] overflow-hidden">{name}</p>
        <div className="flex items-center gap-[12px]">
          <p className="text-[#FD8521] text-[24px] font-medium leading-[32px]">
            {price} ₼
          </p>
          {beforePrice != 0 && (
            <p className="text-[#808080] line-through text-[18px] font-medium leading-[32px]">
              {beforePrice} ₼
            </p>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            onClick={addToCard}
            className="flex items-center gap-[10px] bg-[#FFD23F] py-[16px] px-[30px] rounded-[32px]"
          >
            <img src={cart} alt="cart.svg" />
            Səbətə əlavə et
          </button>
          <button
            onClick={(e) => {
              isLiked ? removeFavorite(e) : addFavorite(e);
            }}
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
        </div>
      </div>
    </div>
  );
};

export default ElementCard;
