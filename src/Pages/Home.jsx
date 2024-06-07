import React from "react";
import ProductsGrid from "../components/Home/ProductsGrid";
import Advantages from "../components/Home/Advantages";
import SaleProducts from "../components/Home/SaleProducts";
import Categories from "./Categories";
import Catalog from "../components/General/Catalog";

const Home = () => {
  return (
    <>
    <Catalog />
      <Categories />
      <ProductsGrid />
      <Advantages />
      <SaleProducts />
    </>
  );
};

export default Home;
