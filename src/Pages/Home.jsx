import React from "react";
import ProductsGrid from "../components/Home/ProductsGrid";
import Advantages from "../components/Home/Advantages";
import SaleProducts from "../components/Home/SaleProducts";

const Home = () => {
  return (
    <>
      <ProductsGrid />
      <Advantages />
      <SaleProducts />
    </>
  );
};

export default Home;
