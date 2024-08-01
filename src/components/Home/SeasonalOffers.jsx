import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import ElementCard from "../General/ElementCard";
import secureLocalStorage from "react-secure-storage";

const SeasonalOffers = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState();


  const productSliderRef = useRef(null);

  

  async function fetchProducts() {
    setProducts([]);
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/sliders/producttab/published?page=1&lang=az`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data[0]);
        console.log(data.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  

  useEffect(() => {
      fetchProducts();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setId(categories[0].id);
      setActiveCategory(categories[0].id);
    }
  }, [categories]);

  const handlePrev = () => {
    productSliderRef.current.slickPrev();
  };

  const handleNext = () => {
    productSliderRef.current.slickNext();
  };

  

  const productSettings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,

    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="px-[16px] md:px-[48px]">
      <div className="flex justify-between items-center mb-[24px]">
        <h2 className="font-[600] text-[24px] md:text-[48px]">{products?.title}</h2>
        <div className="hidden md:block">
          <button
            onClick={handlePrev}
            className="mr-2 border border-black rounded-full w-[55px] h-[55px]"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="w-[55px] h-[55px] bg-[#FFD23F] rounded-full border border-[#ffd23f]"
          >
            &#8594;
          </button>
        </div>
      </div>

      <Slider ref={productSliderRef} {...productSettings}>
        {products?.products?.map((product, index) => (
          <ElementCard
            id={product?.id}
            key={index}
            img={`https://cdn.santral.az//images/${product.thumbnail.public}`}
            name={product.title}
            price={product.price}
            beforePrice={product.oldPrice}
            sale={product.discountPercent}
            link={product.name}
            isLiked={product.isLiked}
          />
        ))}
      </Slider>
    </div>
  );
};

export default SeasonalOffers;
