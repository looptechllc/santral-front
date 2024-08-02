import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import ElementCard from "../General/ElementCard";

const NewComing = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState();

  const categorySliderRef = useRef(null);
  const productSliderRef = useRef(null);

  const getFirstDegreeChildren = (data) => {
    return data.flatMap((item) =>
      item.children.map((child) => ({
        id: child.id,
        name: child.name,
        title: child.title,
        translations: child.translations,
        route: child.route,
      }))
    );
  };

  async function fetchProducts() {
    const url = `https://api.santral.az/v1/products/mobile?category=${id}`;
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
        console.log(data)
        setProducts(data.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetch("https://api.santral.az/v1/categories/mobile?lang=az", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(getFirstDegreeChildren(data.data));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

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

  const categorySettings = {
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    cssEase: "linear",
    slidesToShow: 7,
    slidesToScroll: 3,
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
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
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
          initialSlide: 2
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
    <div className="px-[48px]">
      <div className="flex justify-between items-center mb-[24px]">
        <h2 className="font-[600] text-[24px] md:text-[48px]">Sizin üçün yeni gələnlər</h2>
        <div className="hidden md:block">
          <button onClick={handlePrev} className="mr-2 border border-black rounded-full w-[55px] h-[55px]">
            &#8592;
          </button>
          <button onClick={handleNext} className="w-[55px] h-[55px] bg-[#FFD23F] rounded-full border border-[#ffd23f]">
            &#8594;
          </button>
        </div>
      </div>
      <div className="mb-[32px]">
        <Slider ref={categorySliderRef} {...categorySettings}>
          {categories.map((item, index) => (
            <div key={index} className="px-[8px]">
              <button
                onClick={() => {
                  setId(item.id);
                  setActiveCategory(item.id);
                }}
                className={`py-[8px] px-[16px] font-[500] ${
                  activeCategory === item.id ? "bg-[#FFD23F]" : "bg-[#EBEBEB]"
                } w-full rounded-[32px]  text-[14px] md:text-[16px]`}
              >
                {item.title}
              </button>
            </div>
          ))}
        </Slider>
      </div>
      <Slider ref={productSliderRef} {...productSettings}>
        {products.map((product, index) => (
          <ElementCard
          id={product?.id}
            key={index}
            img={`https://cdn.santral.az//images/${product.thumbnail}`}
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

export default NewComing;
