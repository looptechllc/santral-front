import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/headerlogo.svg";
import call from "../../assets/call.svg";
import catalog from "../../assets/catalog.svg";
import heart from "../../assets/whiteHeart.svg";
import cart from "../../assets/whiteCart.svg";
import searchIcon from "../../assets/search.svg";
import whiteRightArrow from "../../assets/whiteRightArrow.svg";
import yellowrightarrow from "../../assets/yellowRightArrow.svg";

import Container from "@mui/material/Container";

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCatalog, setShowCatalog] = useState();
  const language = "en";

  const location = useLocation();
  const catalogRef = useRef(null)
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
  // useEffect(() => {

  //     // catalogRef.current.scrollIntoView({ behavior: "smooth" });
  //     window.scrollBy({
  //       top: 600,
  //       left: 0,
  //       behavior: "smooth",
  //     });

  //   setSelectedCategory(null); 
  // }, [location]);
  return (
    <>
      
      <Container ref={catalogRef} className=" rounded-[16px] overflow-hidden my-[24px]">
        {!loading && (
          <div className="flex items-stretch">
            <div
              className={`w-1/4 bg-black ${
                !selectedCategory ? "rounded-[16px]" : "rounded-l-[16px]"
              } overflow-hidden`}
            >
              {categories.map((category) => (
                <CustomAccordion
                  key={category.id}
                  category={category}
                  language={language}
                  onCategorySelect={handleCategorySelect}
                  isSelected={
                    selectedCategory && selectedCategory.id === category.id
                  }
                  expandable={false}
                />
              ))}
            </div>
            {selectedCategory && (
              <div className="w-3/4  max-h-[630px]  bg-black rounded-r-[16px] p-4 grid grid-cols-3 place-content-start place-items-start overflow-scroll ">
                {selectedCategory &&
                  selectedCategory.children.map((child) => (
                    <CustomAccordion
                      isExpanded={true}
                      key={child.id}
                      category={child}
                      language={language}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default Catalog;

// import './CustomAccordion.css';

const CustomAccordion = ({
  category,
  language,
  onCategorySelect,
  isSelected,
  isExpanded,
  expandable,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleChange = () => {
    expandable && setExpanded(!expanded);
    onCategorySelect(category);
  };

  const getTranslation = (translations) => {
    const translation = translations.find((t) => t.language === language);
    return translation ? translation.title : "";
  };

  return (
    <div className="accordion w-full">
      <div
        className="accordion-summary text-[20px] font-medium w-full p-[16px]"
        onClick={handleChange}
      >
        {category.children?.length > 0 ? (
          <div className="flex w-full items-center justify-between">
            <Link
              to={`/category/${category.id}`}
              className={isSelected ? "text-yellow-400  p-[8px]" : "text-white p-[8px]"}
            >
              {category.title}
            </Link>
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
