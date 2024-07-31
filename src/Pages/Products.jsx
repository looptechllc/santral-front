// src/pages/CategoryPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ElementCard from "../components/General/ElementCard";

import Pagination from "../components/General/Pagination";
import searchIcon from "../assets/search.svg";
function Products() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [filters, setFilters] = useState({}); // State to store selected filter options
  const [filterOptions, setFilterOptions] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [sort, setSort] = useState();
  const [search, setSearch] = useState("");
  const [filterData,setFilterData] = useState(
    {
      "filter":{}
    }
  )

  async function fetchProducts() {
    const url =  `https://api.santral.az//v1/products/published?search=${query}`;


    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

        },
        body: JSON.stringify(filterData),
      });
      const data = await response.json();
      if (response.ok) {

        setProducts(data.data);
        console.log(data.data)
        setTotalPages(data.pagination.pages);
        setItemCount(data.pagination.count);

      } else {
       console.log('error')
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }
 
 
  useEffect(() => {
    fetchProducts()
  }, [query, currentPage, filters, sort, search]);

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
    <div className="my-24 bg-white lg:w-[95%] p-[16px] max-w-[1440px] mx-auto">
      <div className="w-full flex items-center justify-between mb-[24px]">
        <h1 className="text-[24px] md:text-[48px] font-bold whitespace-nowrap">
          {query}{" "}
          <span className="text-black/40 text-[24px] font-medium">
            ({itemCount} məhsul)
          </span>
        </h1>
        {/* <div className="flex items-center gap-[24px]">
          <button
            onClick={() => setSort("az")}
            className="px-[16px] whitespace-nowrap py-[8px] bg-[#EBEBEB] rounded-[32px]"
          >
            A-dan Z-yə
          </button>
          <button
            onClick={() => setSort("za")}
            className="px-[16px] whitespace-nowrap py-[8px] bg-[#EBEBEB] rounded-[32px]"
          >
            Z-dən A-ya
          </button>
          <button
            onClick={() => setSort("chp")}
            className="px-[16px] whitespace-nowrap py-[8px] bg-[#EBEBEB] rounded-[32px]"
          >
            Ucuzdan bahaya
          </button>
          <button
            onClick={() => setSort("exp")}
            className="px-[16px] whitespace-nowrap py-[8px] bg-[#EBEBEB] rounded-[32px]"
          >
            Bahadan ucuza
          </button>
          <div className="border border-solid border-black/40 rounded-[32px] flex items-center p-[16px] gap-[10px]">
            <img src={searchIcon} alt="search.svg" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Məhsul axtarın"
              className=" rounded-[32px] focus:outline-none"
            />
          </div>
        </div> */}
      </div>
      <div className="">
        {/* <div className="flex max-h-[872px] overflow-y-scroll select-none flex-col w-[318px] gap-4 bg-[#232323] text-white rounded-[16px] p-[24px]">
          {filterOptions?.map((filter) => (
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
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
          {products?.map((product, index) => (
            <ElementCard
            id={product?.id}
              key={index}
              img={`https://cdn.santral.az//images/${product.thumbnail}`}
              name={product.title}
              price={product.price}
              beforePrice={product.oldPrice}
              sale={product.discountPercent}
              link={product.name}
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

export default Products;
