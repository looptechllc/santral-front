import React from "react";
import ProductsGrid from "../components/Home/ProductsGrid";
import Advantages from "../components/Home/Advantages";
import SaleProducts from "../components/Home/SaleProducts";
import Categories from "./Categories";

const Home = () => {
  return (
    <>
      <Categories />
      <ProductsGrid />
      <Advantages />
      <SaleProducts />
    </>
  );
};

export default Home;
