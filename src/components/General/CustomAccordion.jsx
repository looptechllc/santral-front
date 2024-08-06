import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import yellowrightarrow from "../../assets/yellowRightArrow.svg";
import whiteRightArrow from "../../assets/whiteRightArrow.svg";

const CustomAccordion = ({
  category,
  language,
  onCategorySelect,
  isSelected,
  isExpanded = false,
  expandable,
  isMobile,
  isVisible,
  isInitiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(isInitiallyExpanded);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setExpanded(isInitiallyExpanded); // Set expanded based on isInitiallyExpanded prop
  }, [isInitiallyExpanded]);

  const handleMouseEnter = () => {
    if (!isMobile && expandable) {
      setExpanded(true);
      onCategorySelect(category);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && expandable) {
      setExpanded(false);
      setIsHovered(false);
    }
  };

  const handleChange = () => {
    if (isMobile) {
      setExpanded(!expanded);
      onCategorySelect(category);
    }
  };

  const handleChildLinkClick = () => {
    if (isVisible) {
      isVisible(false);
    }
  };

  return (
    <div className="accordion w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className="accordion-summary text-[20px] border-b border-white/40 md:border-0 font-medium w-full p-[16px] cursor-pointer"
        onClick={handleChange}
      >
        {category.children?.length > 0 ? (
          <div className="flex w-full items-center justify-between">
            <Link
              onClick={() => handleChildLinkClick()}
              to={category.route}
              className={isSelected && isHovered ? "text-yellow-400 p-[8px]" : "text-white p-[8px]"}
            >
              {category.title}
            </Link>
            <span>
              {isSelected && isHovered ? (
                <img src={yellowrightarrow} alt="rightarrow.svg" />
              ) : (
                <img src={whiteRightArrow} alt="rightarrow.svg" />
              )}
            </span>
          </div>
        ) : (
          <Link
            onClick={() => handleChildLinkClick()}
            to={category.route}
            className={isSelected && isHovered ? "text-yellow-400 p-[8px]" : "text-white p-[8px]"}
          >
            {category.title}
          </Link>
        )}
      </div>
      {(isMobile || expanded) && (
        <div className={`accordion-details px-[16px] ${expanded && isMobile ? "expanded" : ""}`}>
          {category.children &&
            category.children.map((child) => (
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
  );
};

export default CustomAccordion;