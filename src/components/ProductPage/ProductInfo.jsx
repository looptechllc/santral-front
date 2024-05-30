import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import heart from "../../assets/heart.svg";
import share from "../../assets/share.svg";
import heartFill from "../../assets/heartFill.svg";
const ProductInfo = () => {
  const { name } = useParams();
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://api.santral.az/v1/routes/find?domain=santral_www&location=/az/products/${name}`
        );
        const data = await response.json();
        console.log(data);
        setDescription(data.route);
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [name]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const [liked, setLiked] = useState();
  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="w-[95%] mx-auto ">
      <div className="flex gap-[24px]">
        <img
          src={`https://cdn.santral.az/images/${description.thumbnail}`}
          alt=""
        />
        <div className="bg-white drop-shadow-sm border border-solid border-[#EAEAEA] rounded-[16px] p-[18px] w-full">
          <div className="flex items-center gap-[16px] w-full justify-between">
            <p className="text-[24px] font-medium">{description?.title}</p>
            <div className="flex items-center gap-[16px]">
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
              <button className={`p-3 rounded-full bg-[#efefef] duration-300`}>
                <img src={share} alt="share.svg" className="bg" />
              </button>
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-[10px] p-[12px] border border-[#EAEAEA] w-fit rounded-[32px]">
              <button
                className="duration-300 bg-white hover:bg-[#FFD23F] text-black/40 hover:text-white w-[40px] h-[40px] rounded-full text-[32px] flex items-center justify-center p-0"
                onClick={decrement}
              >
                <span>-</span>
              </button>
              <span className="text-[20px] font-medium">{count}</span>
              <button
                className="duration-300 bg-white hover:bg-[#FFD23F] text-black/40 hover:text-white w-[40px] h-[40px] rounded-full text-[32px] flex items-center justify-center p-0"
                onClick={increment}
              >
                <span>+</span>
              </button>
            </div>
            <p>{(count * description?.price).toFixed(2)} ₼</p>
          </div>
          <p>SKU: {description?.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
/* 
{
    "parent": {
        "parent": null,
        "language": "az",
        "public": true,
        "id": 38,
        "route": "/az/products/",
        "viewModule": "Ecommerce",
        "view": "Products",
        "lookup": "Page",
        "lookupId": 100,
        "title": "Məhsullar"
    },
    "language": "az",
    "public": true,
    "id": 33488,
    "route": "/az/products/lsut04224w-input-voltage-48v-dc-50sm-ledasun-spot--33488/",
    "viewModule": "Ecommerce",
    "view": "ProductItem",
    "modelModule": "Ecommerce",
    "model": "Product",
    "lookup": "Product",
    "lookupId": 33488,
    "type": "none",
    "title": "LS-UT042-24W INPUT VOLTAGE 48V DC  50SM LEDASUN SPOT ",
    "desc": "",
    "stock": 100,
    "minimalOrder": 1,
    "price": 32.6,
    "oldPrice": 0,
    "category": {
        "id": 1308,
        "title": "Ledasun",
        "parent": {
            "id": 202,
            "title": "Spotlar",
            "parent": {
                "id": 194,
                "title": "İşıqlandırma",
                "route": "/iqlandrma-194"
            },
            "route": "/iqlandrma-194/spotlar-202"
        },
        "route": "/iqlandrma-194/spotlar-202/ledasun-1308"
    },
    "brand": {
        "id": 766,
        "title": "LEDASUN"
    },
    "translations": [
        {
            "language": "az",
            "name": "lsut04224w-input-voltage-48v-dc-50sm-ledasun-spot--33488",
            "title": "LS-UT042-24W INPUT VOLTAGE 48V DC  50SM LEDASUN SPOT ",
            "desc": "",
            "_id": "664dc4d97abbaefc02c1b8aa",
            "route": "/az/products/lsut04224w-input-voltage-48v-dc-50sm-ledasun-spot--33488"
        },
        {
            "language": "en",
            "name": "lsut04224w-input-voltage-48v-dc-50sm-ledasun-spot--33488",
            "title": "",
            "desc": "",
            "_id": "664dc4d97abbaefc02c1b8ab",
            "route": "/en/products/lsut04224w-input-voltage-48v-dc-50sm-ledasun-spot--33488"
        },
        {
            "language": "ru",
            "name": "lsut04224w-input-voltage-48v-dc-50sm-ledasun-spot--33488",
            "title": "",
            "desc": "",
            "_id": "664dc4d97abbaefc02c1b8ac",
            "route": "/ru/products/lsut04224w-input-voltage-48v-dc-50sm-ledasun-spot--33488"
        }
    ],
    "thumbnail": "a25fe575-4eff-11ee-8450-005056b06295.png",
    "images": [],
    "favorite": false,
    "parameters": null,
    "params": []
}

*/
