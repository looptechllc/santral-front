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
    <main className="max-w-[1440px] mx-auto">
      <div className="mt-[24px] hidden md:block">
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
    </main>
  );
};

export default Home;
