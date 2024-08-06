import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomAccordion from "./CustomAccordion";
import searchIcon from "../../assets/search.svg";

const Catalog = ({ isVisible }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const catalogRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const closeCatalog = () => {
    setSelectedCategory(null);
    if (isVisible) {
      isVisible(false);
    }
  };

  const [query, setQuery] = useState("");
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (query) {
      navigate(`/products/${query}`);
      closeCatalog();
    } else {
      navigate("/");
    }
  };

  return (
    <div
      ref={catalogRef}
      className={`md:rounded-[16px] mb-[24px] z-[200] ${
        isMobile ? "fixed top-0 left-0 w-full h-full bg-black overflow-auto" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full">
        {!loading && (
          <div className={`flex items-stretch ${isMobile ? "flex-col" : "lg:flex-row"}`}>
            {isMobile && (
              <>
                <div className="flex items-center justify-between py-[32px] px-[16px]">
                  <p className="text-white font-[500] text-[20px]">Kataloq</p>
                  <button onClick={closeCatalog} className="text-white self-end">
                    {/* Close button SVG here */}
                  </button>
                </div>
                <div className="bg-white md:w-full rounded-[32px] flex items-center p-[16px] gap-[10px]">
                  <button onClick={handleSearchSubmit}>
                    <img src={searchIcon} alt="search.svg" />
                  </button>
                  <input
                    type="text"
                    placeholder="25000 müxtəlif məhsul içindən axtarın"
                    className="rounded-[32px] focus:outline-none w-full px-5"
                    onChange={handleSearchChange}
                  />
                </div>
              </>
            )}
            <div
              className={`lg:w-1/4 bg-black ${
                !selectedCategory ? "rounded-[16px]" : "rounded-l-[16px]"
              } overflow-hidden`}
            >
              {categories.map((category) => (
                <CustomAccordion
                  key={category.id}
                  category={category}
                  language="en"
                  onCategorySelect={handleCategorySelect}
                  isSelected={selectedCategory && selectedCategory.id === category.id}
                  expandable={!isMobile}
                  isMobile={isMobile}
                  isVisible={isVisible}
                  isInitiallyExpanded={!isMobile} // Ensure accordions are expanded by default on desktop
                />
              ))}
            </div>
            {selectedCategory && !isMobile && (
              <div
                className={`lg:w-3/4 max-h-[630px] mr-[50px] bg-black rounded-r-[16px] p-4 px-[16px] grid grid-cols-3 place-content-start place-items-start overflow-scroll ${
                  isHovered ? "block" : "hidden"
                }`}
              >
                {selectedCategory.children.map((child) => (
                  <CustomAccordion
                    key={child.id}
                    category={child}
                    language="en"
                    isExpanded={true} // Keep child accordions expanded by default
                    isMobile={isMobile}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
