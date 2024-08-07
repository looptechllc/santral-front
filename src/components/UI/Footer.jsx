import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import yellowCall from "../../assets/yellowCall.svg";
import yellowMail from "../../assets/yellowMail.svg";
import yellowLocation from "../../assets/yellowLocation.svg";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/mastercard.svg";
import logoanimated from "../../assets/logoanimated.svg";
import yellowWhatsapp from "../../assets/yellowWhatsapp.svg";
import yellowInstagram from "../../assets/yellowInstagram.svg";
import yellowFacebook from "../../assets/yellowFacebook.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const [categories, setCategories] = useState();
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
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const [showMore, setShowMore] = useState(false);
  return (
    <div className=" border-t-[1px] border-solid border-[#ffd23f] pt-[40px]  bg-black text-white">
      <div className="w-[95%] max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-[30px] w-full">
          <Link className="" to="/">
            <img className="w-[217px]" src={logo} alt="logo.svg" />
          </Link>
          <a
            href="https://www.facebook.com/SantralAzerbaijan?mibextid=LQQJ4d"
            target="_blank"
          >
            <img
              className="p-[8px] bg-[#232323] rounded-full w-[40px] h-[40px]"
              src={yellowFacebook}
              alt="facebook.svg"
            />
          </a>
          <a
            href="https://www.instagram.com/santral_azerbaijan?igsh=MWlscjNqdnpqZ25peQ=="
            target="_blank"
          >
            <img
              className="p-[8px] bg-[#232323] rounded-full w-[40px] h-[40px]"
              src={yellowInstagram}
              alt="facebook.svg"
            />
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=994504001410&text&type=phone_number&app_absent=0"
            target="_blank"
          >
            <img
              className="p-[8px] bg-[#232323] rounded-full w-[40px] h-[40px]"
              src={yellowWhatsapp}
              alt="facebook.svg"
            />
          </a>
        </div>
        <div className="w-full"></div>
        <p className="text-white/60">
          2000-ci ildən bu yana “Santral Elektrik” QSC şirkəti belə uğurlu
          iqtisadi siyasətdən bəhrələnərək{" "}
          <span
            onClick={() => {
              setShowMore(true);
            }}
            className={
              !showMore ? "text-[#FFD23F] cursor-pointer font-medium" : "hidden"
            }
          >
            Ətraflı oxu
          </span>{" "}
          <span className={showMore ? "" : "hidden"}>
            müştərilərə müasir tələblərə cavab verən müxtəlif çeşidli məhsullar
            və sərfəli xidmətlər təklif edir.
          </span>
        </p>
      </div>
      <hr className="w-full  h-[1px] bg-white/40 border-none my-[40px]" />
      <div className="w-[95%] max-w-[1440px] mx-auto gap-y-[20px] grid grid-cols-2 md:grid-cols-4 place-content-start place-items-start">
        <div className="flex flex-col items-start  justify-center">
          <h2 className="font-medium text-[20px] mb-[32px] text-[#FFD23F]">
            Şirkət
          </h2>
          <div className="flex flex-col items-start gap-[16px]">
            <Link to="/about">Haqqımızda</Link>
            <Link to="/branches">Filliallar</Link>
            <Link to="/news">Xəbərlər</Link>
            <a>Partnyorlar</a>
          </div>
        </div>
        <div className="flex flex-col items-start  justify-center">
          <h2 className="font-medium text-[20px] mb-[32px] text-[#FFD23F]">
            Müştəri üçün
          </h2>
          <div className="flex flex-col items-start gap-[16px]">
            <Link to="/catdirilma-xidmeti">Çatdırılma qaydaları</Link>
            <Link to="/mexfilik-siyaseti">Məxfilik siyasəti</Link>
            <a>Blog</a>
          </div>
        </div>
        <div className="flex flex-col items-start col-span-2 md:col-span-1  justify-center">
          <h2 className="font-medium text-[20px] mb-[32px] text-[#FFD23F]">
            Kateqoriyalar
          </h2>
          <div className="flex flex-col flex-wrap items-start gap-[16px]">
            {categories?.slice(0, 5).map((item, index) => (
              <Link key={index} to={item.route}>
                {item.title}
              </Link>
            ))}
          </div>
          {/* <div className="col-span-2 md:col-span-1">
  <h2 className="font-medium text-[20px] mb-[32px] text-[#FFD23F]">
    Kateqoriyalar
  </h2>
  <div className="flex flex-wrap md:space-x-8">
    <div className="flex flex-col space-y-4">
      {categories?.slice(0, Math.ceil(categories.length / 2)).map((item, index) => (
        <Link key={index} to={item.route}>
          {item.title}
        </Link>
      ))}
    </div>
    <div className="flex flex-col space-y-4">
      {categories?.slice(Math.ceil(categories.length / 2)).map((item, index) => (
        <Link key={index} to={item.route}>
          {item.title}
        </Link>
      ))}
    </div>
  </div>
</div> */}
        </div>
        <div className="flex flex-col items-start  justify-center">
          <h2 className="font-medium text-[20px] mb-[16px] md:mb-[32px] text-[#FFD23F]">
            Əlaqə
          </h2>
          <div className="flex flex-col items-start gap-[16px]">
            <a href="tel:1410" className="flex items-center gap-[8px]">
              <img src={yellowCall} alt="call" />
              1410
            </a>
            <a href="tel:0123104314" className="flex items-center gap-[8px]">
              <img src={yellowCall} alt="call" />
              0123104314
            </a>
            <a
              href="mailto:sales@santral.az"
              className="flex items-center gap-[8px]"
            >
              <img src={yellowMail} alt="mail" /> sales@santral.az
            </a>
            <a href="https://maps.app.goo.gl/a4zex47PsNa3fsYaA" target="_blank" className="flex items-center gap-[8px]">
              <img src={yellowLocation} alt="location" /> Z.Bünyadov pr., 2071{" "}
              <br />
              AZ1029, AZərbaycan, Bakı
            </a>
            <div className="flex items-center gap-[8px]">
              <img src={visa} alt="visa.svg" />
              <img
                className="border-l border-solid border-[#EAEAEA] px-[8px]"
                src={mastercard}
                alt="mastercard.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-[1px] bg-white/40 border-none mt-[40px]" />
      <div className="flex items-center justify-center py-[20px]">
        <p className="text-center flex items-center gap-[8px] text-[18px] whitespace-nowrap">
          Saytı hazırladı:  <a href="https://www.looptech.az/" target="_blank"><img className="w-[135px]" src={logoanimated} alt="looptechLogo" /></a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
