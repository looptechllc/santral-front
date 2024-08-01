import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import CustomAccordion from "./CustomAccordion";

const Catalog = ({ isVisible }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const catalogRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <Container
      ref={catalogRef}
      className="rounded-[16px] mb-[24px] z-[200]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!loading && (
        <div className={`flex items-stretch ${isMobile ? 'flex-col' : 'lg:flex-row'}`}>
          <div className={`lg:w-1/4 bg-black ${!selectedCategory ? "rounded-[16px]" : "rounded-l-[16px]"} overflow-hidden`}>
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
                isExpanded={true} // Ensure side menu accordions are open by default on desktop
                isInitiallyExpanded={!isMobile} // Ensure accordions are closed by default on mobile
              />
            ))}
          </div>
          {selectedCategory && !isMobile && (
            <div className={`lg:w-3/4 max-h-[630px] bg-black rounded-r-[16px] p-4 grid grid-cols-3 place-content-start place-items-start overflow-scroll ${isHovered ? 'block' : 'hidden'}`}>
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
    </Container>
  );
};

export default Catalog;
