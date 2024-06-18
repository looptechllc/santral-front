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

const Home = () => {
  return (
    <>
    <Catalog />
    <NewComing />
      <Categories />
      <ProductsGrid />
      <Brands />
      <Advantages />
      <SaleProducts />
      <BottomBanner />
      <News />
    </>
  );
};

export default Home;
