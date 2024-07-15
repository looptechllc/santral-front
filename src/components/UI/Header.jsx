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

const Header = () => {
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

            <div className="dropdown w-fit relative">
              {loggedIn ? (
                <Link to="/profile" className="dropbtn bg-black rounded-[32px] px-[24px] py-[16px] text-white">
                  Hesab
                </Link>
              ) : (
                <button
                  onClick={toggleDropdown}
                  className="dropbtn bg-black rounded-[32px] px-[24px] py-[16px] text-white"
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
            <select name="" id="" className="bg-transparent">
              <option value="">Az</option>
              <option value="">En</option>
              <option value="">Ru</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-[#323232] w-full p-[16px]">
        <div className="w-[95%] mx-auto flex items-center justify-between gap-[80px]">
          <button
            onClick={() => setShowCatalog(!showCatalog)}
            className="bg-[#232323] border border-white p-[16px] rounded-[16px] text-[20px] text-white font-medium flex items-center justify-start gap-[8px] w-[50%]"
          >
            <img src={catalog} alt="catalog.svg" /> Kataloq
          </button>
          <div className="bg-white w-full rounded-[32px] flex items-center p-[16px] gap-[10px]">
            <img src={searchIcon} alt="search.svg" />
            <input
              type="text"
              placeholder="25000 müxtəlif məhsul içindən axtarın"
              className="rounded-[32px] focus:outline-none w-full px-5"
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-[50%] flex items-center justify-end gap-[20px]">
            <Link to="/favorites" className="rounded-full bg-[#232323] p-[8px]">
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
    </>
  );
};

export default Header;
