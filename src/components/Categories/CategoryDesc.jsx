// src/pages/CategoryPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ElementCard from "../General/ElementCard";
import { space } from "postcss/lib/list";
import Pagination from "../General/Pagination";

function CategoryDesc() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [filters, setFilters] = useState({}); // State to store selected filter options
  const [filterOptions, setFilterOptions] = useState([]);
  const [categoryName, setCategoryName] = useState();
  useEffect(() => {
    fetch(`https://api.santral.az/v1/categories/mobile?lang=az`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCategoryName(data.data.filter((item) => item.id == id)[0]?.title);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  useEffect(() => {
    fetchFilters();
  }, [id]);
  useEffect(() => {
    fetch(
      `https://api.santral.az/v1/products/mobile?category=${id}&limit=10&lang=az&page=${currentPage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);

        setTotalPages(data.pagination.pages);
        setItemCount(data.pagination.count);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [id, currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchFilters = () => {
    fetch(
      `https://api.santral.az/v1/products/mobile?filters=1&category=${id}&lang=az`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    )
      .then((response) => response.json())
      .then((data) => setFilterOptions(data.data))
      .catch((error) => console.error("Error fetching filters:", error));
  };
  const handleFilterChange = (filterId, optionId) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: optionId,
    }));
  };
  return (
    <div className="my-24 bg-white container mx-auto">
      <h1 className="text-[48px] font-bold">
        {categoryName}{" "}
        <span className="text-black/40 text-[24px] font-medium">
          ({itemCount} məhsul)
        </span>
      </h1>
      <div className="flex gap-[22px] items-start justify-between">
        <div className="flex max-h-[872px] overflow-y-scroll select-none flex-col w-[318px] gap-4 bg-[#232323] text-white rounded-[16px] p-[24px]">
          {filterOptions.map((filter) => (
            <div key={filter.id}>
              <div className="flex justify-between select-none mb-[24px]  items-center cursor-pointer">
                <h2 className="text-[20px] font-medium ">{filter.title}</h2>
                {filters[filter.id] ? (
                  <span
                    className="text-3xl text-[#FFD23F] select-none "
                    onClick={() => handleFilterChange(filter.id, null)}
                  >
                    -
                  </span>
                ) : (
                  <span
                    className="text-3xl text-[#FFD23F] select-none "
                    onClick={() => handleFilterChange(filter.id, "toggle")}
                  >
                    +
                  </span>
                )}
              </div>
              {filters[filter.id] && (
                <ul className="select-none flex flex-col gap-[16px]">
                  {filter.options.map((option) => (
                    <li key={option.id}>
                      <input
                        type="checkbox"
                        id={option.id}
                        checked={filters[filter.id] === option.id}
                        onChange={() =>
                          handleFilterChange(filter.id, option.id)
                        }
                        className="hidden"
                      />
                      <label
                        htmlFor={option.id}
                        className="cursor-pointer select-none flex items-center"
                      >
                        <div
                          className={`w-[24px] h-[24px] border  rounded-sm mr-2 flex items-center justify-center transition-colors ${
                            filters[filter.id] === option.id
                              ? "bg-[#FFD23F] border-[#FFD23F]"
                              : "bg-black border-white/40 "
                          }`}
                        >
                          {filters[filter.id] === option.id && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-black"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.002 15.875l8.65-8.651-1.415-1.416-7.235 7.235-3.231-3.23-1.414 1.414 4.645 4.647 1.0 1.001z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        {option.title} ({option.count})
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ElementCard
              key={index}
              img={`https://cdn.santral.az//images/${product.thumbnail}`}
              name={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CategoryDesc;


