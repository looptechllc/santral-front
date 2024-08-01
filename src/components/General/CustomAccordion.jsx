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

  useEffect(() => {
    setExpanded(isInitiallyExpanded);
  }, [isInitiallyExpanded]);

  const handleMouseEnter = () => {
    if (!isMobile && expandable) {
      setExpanded(true);
      onCategorySelect(category);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && expandable) {
      setExpanded(false);
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
        className="accordion-summary text-[20px] font-medium w-full p-[16px] cursor-pointer"
        onClick={handleChange}
      >
        {category.children?.length > 0 ? (
          <div className="flex w-full items-center justify-between">
            <Link
              onClick={() => handleChildLinkClick()}
              to={`/category/${category.id}`}
              className={isSelected ? "text-yellow-400 p-[8px]" : "text-white p-[8px]"}
            >
              {category.title}
            </Link>
            <span>
              {isSelected ? (
                <img src={yellowrightarrow} alt="rightarrow.svg" />
              ) : (
                <img src={whiteRightArrow} alt="rightarrow.svg" />
              )}
            </span>
          </div>
        ) : (
          <Link
            onClick={() => handleChildLinkClick()}
            to={`/category/${category.id}`}
            className={isSelected ? "text-yellow-400 p-[8px]" : "text-white p-[8px]"}
          >
            {category.title}
          </Link>
        )}
      </div>
      {(isMobile || expanded) && (
        <div className={`accordion-details ${expanded && isMobile ? "expanded" : ""}`}>
          {category.children &&
            category.children.map((child) => (
              <Link
                key={child.id}
                onClick={() => handleChildLinkClick()}
                to={`/category/${child.id}`}
              >
                {child.title}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
