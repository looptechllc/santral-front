import React from "react";
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

const Home = () => {

  const settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 2000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed as needed (3000ms = 3 seconds)
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                autoplay: true,
                autoplaySpeed: 3000
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 2,
                autoplay: true,
                autoplaySpeed: 3000
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000
            }
        }
    ]
};
  return (
    <main className="max-w-[1440px] mx-auto">
      <div className="flex">
      <div className="mt-[24px] hidden md:block w-full">
        <Catalog />
      </div>
      {/* <Slider {...settings}>
        <div className="w-full bg-black p-48">

        </div>
      </Slider> */}
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
