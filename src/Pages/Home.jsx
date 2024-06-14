import React from "react";
import ProductsGrid from "../components/Home/ProductsGrid";
import Advantages from "../components/Home/Advantages";
import SaleProducts from "../components/Home/SaleProducts";
import Categories from "./Categories";
import Catalog from "../components/General/Catalog";
import Brands from "../components/Home/Brands";
import News from "../components/Home/News";

const Home = () => {
  return (
    <>
    <Catalog />
      <Categories />
      <ProductsGrid />
      <Brands />
      <Advantages />
      <SaleProducts />
      <News />
    </>
  );
};

export default Home;
