import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/headerlogo.svg";
import call from "../../assets/call.svg";
import whiteRightArrow from "../../assets/whiteRightArrow.svg";
import yellowrightarrow from "../../assets/yellowRightArrow.svg";

import Container from "@mui/material/Container";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const language = "en";

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
        console.log(data);
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="w-full bg-[#FFD23F] p-[16px]">
        <div className="w-[95%] mx-auto flex items-center justify-between text-black/90">
          <Link to="/">
            <img src={logo} alt="logo.svg" />
          </Link>
          <div className="flex items-center gap-[100px] font-light">
            <Link to="/about">Haqqımızda</Link>
            <Link to="/filliallar">Filiallar</Link>
            <Link to="/kampaniyalar">Kampaniyalar</Link>
            <Link to="/partners">Partnyorlar</Link>
          </div>
          <div className="flex items-center gap-[16px]">
            <a href="tel:1410" className="flex items-center gap-[8px]">
              <img src={call} alt="" />
              1410
            </a>
            <button className="bg-black rounded-[32px] px-[24px] py-[16px] text-white">
              Daxil ol
            </button>
            <select name="" id="" className="bg-transparent">
              <option value="">Az</option>
              <option value="">En</option>
              <option value="">Ru</option>
            </select>
          </div>
        </div>
      </div>
      <Container className=" rounded-[16px] overflow-hidden">
        {!loading && (
          <div className="flex  ">
            <div className={`w-1/4 bg-black ${!selectedCategory?"rounded-[16px]":"rounded-l-[16px]"} overflow-hidden`}>
              {categories.map((category) => (
                <CustomAccordion
                  key={category.id}
                  category={category}
                  language={language}
                  onCategorySelect={handleCategorySelect}
                  isSelected={
                    selectedCategory && selectedCategory.id === category.id
                  }
                  expandable = {false}
                />
              ))}
            </div>
            {selectedCategory&&<div className="w-3/4  bg-black rounded-r-[16px] p-4 grid grid-cols-3 place-content-start place-items-start overflow-scroll max-h-[500px]">
              {selectedCategory &&
                selectedCategory.children.map((child) => (
                  <CustomAccordion
                    isExpanded={true}
                    key={child.id}
                    category={child}
                    language={language}
                  />
                ))}
            </div>}
          </div>
        )}
      </Container>
    </>
  );
};

export default Header;

// import './CustomAccordion.css';

const CustomAccordion = ({
  category,
  language,
  onCategorySelect,
  isSelected,
  isExpanded,
  expandable
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleChange = () => {
    expandable&&setExpanded(!expanded);
    onCategorySelect(category);
  };

  const getTranslation = (translations) => {
    const translation = translations.find((t) => t.language === language);
    return translation ? translation.title : "";
  };

  return (
    <div className="accordion w-full">
      <div
        className="accordion-summary text-[20px] font-medium w-full"
        onClick={handleChange}
      >
        {category.children?.length > 0 ? (
          <div className="flex w-full items-center justify-between">
            <span className={isSelected?"text-yellow-400":"text-white"}>{category.title}</span>
            <span className="">
              {isSelected ? (
                <img src={yellowrightarrow} alt="rightarrow.svg" />
              ) : (
                <img src={whiteRightArrow} alt="rightarrow.svg" />
              )}
            </span>
          </div>
        ) : (
          <Link to={`/category/${category.id}`}>{category.title}</Link>
        )}
      </div>
      <div className={`accordion-details ${expanded ? "expanded" : ""}`}>
        {category.children &&
          category.children.map((child) => (
            <Link key={child.id} to={`/category/${child.id}`}>
              {child.title}
            </Link>
          ))}
      </div>
    </div>
  );
};
