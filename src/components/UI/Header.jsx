import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/headerlogo.svg";
import call from "../../assets/call.svg";
import catalog from "../../assets/catalog.svg";
import heart from "../../assets/whiteHeart.svg";
import cart from "../../assets/whiteCart.svg";
import searchIcon from "../../assets/search.svg";
import whiteRightArrow from "../../assets/whiteRightArrow.svg";
import yellowrightarrow from "../../assets/yellowRightArrow.svg";

import Container from "@mui/material/Container";
import secureLocalStorage from "react-secure-storage";
import Catalog from "../General/Catalog";

const Header = ({isOpen,setIsOpen}) => {
  const [formData, setFormData] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showCatalog, setShowCatalog] = useState();
  const language = "en";

  const location = useLocation();
  const catalogRef = useRef(null);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const [dropdown, setDropdown] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setDropdown(document?.getElementById("dropdown"));
  }, []);

  const toggleDropdown = () => {
    dropdown?.classList.toggle("hidden");
    setDropdownOpen(!dropdownOpen);
  };

  async function loginWithUser(e) {
    e.preventDefault();
    const url = `https://api.santral.az/v1/auth/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        secureLocalStorage.setItem("access_token", data.access_token);
        secureLocalStorage.setItem("refresh_token", data.refresh_token);
        setLoggedIn(true);
        toggleDropdown();
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }

  useEffect(() => {
    const accessToken = secureLocalStorage.getItem("access_token");
    accessToken ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    if (query) {
      navigate(`/products/${query}`);
    } else navigate("/");
  };

  return (
    <header className="sticky top-0 z-[9999]">
      <div className="w-full bg-[#FFD23F] p-[16px] ">
        <div className="w-[95%] mx-auto flex items-center justify-between text-black/90">
          <Link to="/">
            <img src={logo} alt="logo.svg" className="w-[142px] md:w-[217px]" />
          </Link>
          <div className=" items-center gap-[100px] font-light hidden md:flex">
            <Link to="/about">Haqqımızda</Link>
            <Link to="/branches">Filiallar</Link>
            <Link to="/kampaniyalar">Kampaniyalar</Link>
            <Link to="/partners">Partnyorlar</Link>
          </div>
          <div className="flex items-center gap-[16px]">
            <a
              href="tel:1410"
              className=" items-center gap-[8px] hidden md:flex"
            >
              <img src={call} alt="" />
              1410
            </a>

            <div className="dropdown w-fit relative">
              {loggedIn ? (
                <Link
                  to="/profile"
                  className="dropbtn  px-[24px] py-[16px] text-white"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_799_14384)">
                      <path
                        d="M12 11.9999C13.1867 11.9999 14.3467 11.648 15.3334 10.9888C16.3201 10.3295 17.0892 9.3924 17.5433 8.29604C17.9974 7.19969 18.1162 5.99329 17.8847 4.8294C17.6532 3.66551 17.0818 2.59642 16.2426 1.7573C15.4035 0.918186 14.3344 0.346741 13.1705 0.11523C12.0067 -0.116281 10.8003 0.00253868 9.7039 0.456664C8.60754 0.91079 7.67047 1.67983 7.01118 2.66652C6.35189 3.65321 6 4.81325 6 5.99994C6.00159 7.59075 6.63424 9.11595 7.75911 10.2408C8.88399 11.3657 10.4092 11.9984 12 11.9999ZM12 1.99994C12.7911 1.99994 13.5645 2.23454 14.2223 2.67406C14.8801 3.11359 15.3928 3.7383 15.6955 4.46921C15.9983 5.20011 16.0775 6.00438 15.9231 6.7803C15.7688 7.55623 15.3878 8.26896 14.8284 8.82837C14.269 9.38778 13.5563 9.76874 12.7804 9.92308C12.0044 10.0774 11.2002 9.99821 10.4693 9.69546C9.73836 9.39271 9.11365 8.88002 8.67412 8.22222C8.2346 7.56443 8 6.79107 8 5.99994C8 4.93908 8.42143 3.92166 9.17157 3.17151C9.92172 2.42137 10.9391 1.99994 12 1.99994Z"
                        fill="black"
                        fill-opacity="0.87"
                      />
                      <path
                        d="M12 14.0006C9.61386 14.0033 7.32622 14.9523 5.63896 16.6396C3.95171 18.3268 3.00265 20.6145 3 23.0006C3 23.2658 3.10536 23.5202 3.29289 23.7077C3.48043 23.8953 3.73478 24.0006 4 24.0006C4.26522 24.0006 4.51957 23.8953 4.70711 23.7077C4.89464 23.5202 5 23.2658 5 23.0006C5 21.1441 5.7375 19.3636 7.05025 18.0509C8.36301 16.7381 10.1435 16.0006 12 16.0006C13.8565 16.0006 15.637 16.7381 16.9497 18.0509C18.2625 19.3636 19 21.1441 19 23.0006C19 23.2658 19.1054 23.5202 19.2929 23.7077C19.4804 23.8953 19.7348 24.0006 20 24.0006C20.2652 24.0006 20.5196 23.8953 20.7071 23.7077C20.8946 23.5202 21 23.2658 21 23.0006C20.9974 20.6145 20.0483 18.3268 18.361 16.6396C16.6738 14.9523 14.3861 14.0033 12 14.0006Z"
                        fill="black"
                        fill-opacity="0.87"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_799_14384">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              ) : (
                <button
                  onClick={toggleDropdown}
                  className="dropbtn bg-black rounded-[32px] px-[16px] md:px-[24px] py-[12px] md:py-[16px] text-white"
                >
                  Daxil ol
                </button>
              )}
              <div
                id="dropdown"
                className="dropdown-content w-[395px] bg-white rounded-[16px] mt-2 absolute right-0 hidden flex flex-col p-[16px] z-50"
              >
                <button className="self-end" onClick={toggleDropdown}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                      fill="black"
                      fill-opacity="0.87"
                    />
                    <path
                      d="M9.16999 15.5804C8.97999 15.5804 8.78999 15.5104 8.63999 15.3604C8.34999 15.0704 8.34999 14.5904 8.63999 14.3004L14.3 8.64035C14.59 8.35035 15.07 8.35035 15.36 8.64035C15.65 8.93035 15.65 9.41035 15.36 9.70035L9.69998 15.3604C9.55998 15.5104 9.35999 15.5804 9.16999 15.5804Z"
                      fill="black"
                      fill-opacity="0.87"
                    />
                    <path
                      d="M14.83 15.5804C14.64 15.5804 14.45 15.5104 14.3 15.3604L8.63999 9.70035C8.34999 9.41035 8.34999 8.93035 8.63999 8.64035C8.92999 8.35035 9.40998 8.35035 9.69998 8.64035L15.36 14.3004C15.65 14.5904 15.65 15.0704 15.36 15.3604C15.21 15.5104 15.02 15.5804 14.83 15.5804Z"
                      fill="black"
                      fill-opacity="0.87"
                    />
                  </svg>
                </button>
                <form
                  onSubmit={(e) => loginWithUser(e)}
                  className="w-full flex flex-col gap-[24px]"
                >
                  <div className="flex flex-col gap-[8px]">
                    <label htmlFor="" className="text-[14px]">
                      E-mail
                    </label>
                    <input
                      value={formData?.username}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          username: e.target.value,
                        }))
                      }
                      className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                      type="text"
                      placeholder="E-mail daxil edin"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <label htmlFor="" className="text-[14px]">
                      Şifrə
                    </label>
                    <input
                      value={formData?.password}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          password: e.target.value,
                        }))
                      }
                      className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                      type="password"
                      placeholder="*****"
                    />
                  </div>
                  <a href="" className="text-black/60 text-[14px] self-end">
                    Şifrəni unutmusunuz?
                  </a>
                  <button
                    type="submit"
                    className="w-full bg-[#FFD23F] rounded-[32px] flex items-center justify-center gap-[10px] p-[16px]"
                  >
                    Daxil ol{" "}
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.79289 5.29289C9.18342 4.90237 9.81658 4.90237 10.2071 5.29289L16.2071 11.2929C16.5976 11.6834 16.5976 12.3166 16.2071 12.7071L10.2071 18.7071C9.81658 19.0976 9.18342 19.0976 8.79289 18.7071C8.40237 18.3166 8.40237 17.6834 8.79289 17.2929L14.0858 12L8.79289 6.70711C8.40237 6.31658 8.40237 5.68342 8.79289 5.29289Z"
                        fill="black"
                        fill-opacity="0.87"
                      />
                    </svg>
                  </button>
                </form>
                <p className="text-black/60 mt-[16px]">
                  Hesabınız yoxdur?{" "}
                  <Link
                    to="/registration"
                    className="underline font-bold text-[#FD8521]"
                  >
                    Qeydiyyatdan keç
                  </Link>
                </p>
              </div>
            </div>
            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              <svg
                width="42"
                height="42"
                viewBox="0 0 63 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 47.25H52.5C53.9437 47.25 55.125 46.0688 55.125 44.625C55.125 43.1812 53.9437 42 52.5 42H10.5C9.05625 42 7.875 43.1812 7.875 44.625C7.875 46.0688 9.05625 47.25 10.5 47.25ZM10.5 34.125H52.5C53.9437 34.125 55.125 32.9438 55.125 31.5C55.125 30.0562 53.9437 28.875 52.5 28.875H10.5C9.05625 28.875 7.875 30.0562 7.875 31.5C7.875 32.9438 9.05625 34.125 10.5 34.125ZM7.875 18.375C7.875 19.8187 9.05625 21 10.5 21H52.5C53.9437 21 55.125 19.8187 55.125 18.375C55.125 16.9312 53.9437 15.75 52.5 15.75H10.5C9.05625 15.75 7.875 16.9312 7.875 18.375Z"
                  fill="black"
                />
              </svg>
            </button>
            <select name="" id="" className="bg-transparent hidden md:block">
              <option value="">Az</option>
              <option value="">En</option>
              <option value="">Ru</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-[#323232] w-full p-[16px] ">
        <div className="w-[95%] mx-auto flex items-center justify-between gap-[16px] md:gap-[80px]">
          <button
            onClick={() => setShowCatalog(!showCatalog)}
            className="bg-[#232323] border border-white/40 p-[16px] rounded-[16px] text-[20px] text-white font-medium flex items-center justify-center md:justify-start gap-[8px] md:w-[50%]"
          >
            <img src={catalog} alt="catalog.svg" />
            <span className="hidden md:block"> Kataloq</span>
          </button>
          <div className="bg-white md:w-full rounded-[32px] flex items-center p-[16px] gap-[10px]">
            <img src={searchIcon} alt="search.svg" />
            <input
              type="text"
              placeholder="25000 müxtəlif məhsul içindən axtarın"
              className="rounded-[32px] focus:outline-none w-full px-5"
              onChange={handleSearchChange}
            />
          </div>
          <div className="md:w-[50%] flex items-center justify-end gap-[20px]">
            <Link
              to="/favorites"
              className="rounded-full bg-[#232323] p-[8px] hidden md:block"
            >
              <img className="w-[24px] h-[24px]" src={heart} alt="heart.svg" />
            </Link>
            <Link to="/basket" className="rounded-full bg-[#232323] p-[8px]">
              <img className="w-[24px] h-[24px]" src={cart} alt="heart.svg" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${showCatalog ? "" : "hidden"} z-[200] h-screen bg-black`}
      >
        <Catalog isVisible={setShowCatalog} />
      </div>
    </header>
  );
};

export default Header;
