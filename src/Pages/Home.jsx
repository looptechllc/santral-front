import React, { useEffect, useState } from "react";
import ProductsGrid from "../components/Home/ProductsGrid";
import Advantages from "../components/Home/Advantages";
import SaleProducts from "../components/Home/SaleProducts";
import Categories from "./Categories";
import Catalog from "../components/General/Catalog";
import Brands from "../components/Home/Brands";
import News from "../components/Home/News";
import NewComing from "../components/Home/NewComing";
import BottomBanner from "../components/Home/BottomBanner";
import SeasonalOffers from "../components/Home/SeasonalOffers";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed as needed (3000ms = 3 seconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  const [sliderData, setSliderData] = useState();
  // const id = useParams();
  // console.log(id)
  useEffect(() => {
    // const accessToken = secureLocalStorage.getItem("access_token");
    fetch(`https://api.santral.az/v1/sliders/main/published?lang=az`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setSliderData(data.data);
        console.log(data);
        console.log(sliderData[0].route?.split("/"))
      })
      .catch((error) => {
        console.error("Error fetching slider:", error);
      });
  }, []);
  return (
    <main className="max-w-[1440px] mx-auto overflow-hidden">
     <div className="flex relative overflow-hidden w-full h-[700px] md:px-[50px]">
      <div className="mt-[24px] hidden md:block hover:absolute hover:z-[80] w-full">
        <Catalog />
      </div>
      <div className="w-full overflow-hidden md:w-[970px] absolute md:right-[54px] md:h-[624px] mt-[6px] md:mt-[24px]">
        <Slider {...settings}>
          {sliderData?.map((item, index) => (
            <div
              key={index}
              style={{
                // backgroundImage: ,
              }}
              className="bg-center bg-cover h-[460px] md:h-[624px] w-full relative md:rounded-[16px] overflow-hidden"
            >
              <img src={`https://cdn.santral.az/images/${item.image}`} alt="background image" className="absolute top-0 left-0 w-full h-full object-cover" />
              <div className="absolute bg-white/40 bottom-[48px] left-[48px]  right-[48px]  flex gap-[16px] justify-between rounded-[16px] flex-col md:flex-row items-start md:items-center p-[16px] ">
                
                <img
                  src={`https://cdn.santral.az/images/${item.logo}`}
                  alt="logo"
                  className="max-h-[30px]"
                />
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[24px] font-[500]">{item.title}</p>
                  <p className="text-[14px] font-[500]">{item.desc}</p>
                </div>
                <Link to={item.route} className="px-[24px] py-[16px] bg-[#FFD23F] rounded-[32px]">
                {item.label}
                </Link>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
      <NewComing />
      <Categories />
      <ProductsGrid />
      <Brands />
      <SeasonalOffers />
      <Advantages />
      <SaleProducts />
      <BottomBanner />
      <News />
    </main>
  );
};

export default Home;
