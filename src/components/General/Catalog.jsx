import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
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
      closeCatalog()
    } else {
      navigate("/");
    }
  };

  return (
    <Container
      ref={catalogRef}
      className={`md:rounded-[16px] mb-[24px] z-[200] ${
        isMobile
          ? "fixed top-0 left-0 w-full h-full bg-black overflow-auto"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!loading && (
        <div
          className={`flex items-stretch ${
            isMobile ? "flex-col" : "lg:flex-row"
          }`}
        >
          {isMobile && (
            <>
              <div className="flex items-center justify-between py-[32px] px-[16px]">
                <p className="text-white font-[500] text-[20px]">Kataloq</p>
                <button onClick={closeCatalog} className=" text-white self-end">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9998 30.3333C8.09317 30.3333 1.6665 23.9067 1.6665 16C1.6665 8.09334 8.09317 1.66667 15.9998 1.66667C23.9065 1.66667 30.3332 8.09334 30.3332 16C30.3332 23.9067 23.9065 30.3333 15.9998 30.3333ZM15.9998 3.66667C9.19984 3.66667 3.6665 9.20001 3.6665 16C3.6665 22.8 9.19984 28.3333 15.9998 28.3333C22.7998 28.3333 28.3332 22.8 28.3332 16C28.3332 9.20001 22.7998 3.66667 15.9998 3.66667Z"
                      fill="white"
                    />
                    <path
                      d="M12.2266 20.7733C11.9733 20.7733 11.72 20.68 11.52 20.48C11.1333 20.0933 11.1333 19.4533 11.52 19.0667L19.0666 11.52C19.4533 11.1333 20.0933 11.1333 20.48 11.52C20.8666 11.9067 20.8666 12.5467 20.48 12.9333L12.9333 20.48C12.7466 20.68 12.48 20.7733 12.2266 20.7733Z"
                      fill="white"
                    />
                    <path
                      d="M19.7733 20.7733C19.52 20.7733 19.2666 20.68 19.0666 20.48L11.52 12.9333C11.1333 12.5467 11.1333 11.9067 11.52 11.52C11.9066 11.1333 12.5466 11.1333 12.9333 11.52L20.48 19.0667C20.8666 19.4533 20.8666 20.0933 20.48 20.48C20.28 20.68 20.0266 20.7733 19.7733 20.7733Z"
                      fill="white"
                    />
                  </svg>
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
                isSelected={
                  selectedCategory && selectedCategory.id === category.id
                }
                expandable={!isMobile}
                isMobile={isMobile}
                isVisible={isVisible}
                isExpanded={true} // Ensure side menu accordions are open by default on desktop
                isInitiallyExpanded={!isMobile} // Ensure accordions are closed by default on mobile
              />
            ))}
          </div>
          {selectedCategory && !isMobile && (
            <div
              className={`lg:w-3/4 max-h-[630px] bg-black rounded-r-[16px] p-4 px-[16px] grid grid-cols-3 place-content-start place-items-start overflow-scroll ${
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
    </Container>
  );
};

export default Catalog;
