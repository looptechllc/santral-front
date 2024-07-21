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

const Home = () => {
  return (
    <>
    <div className="mt-[24px]">
    <Catalog />
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
    </>
  );
};

export default Home;
