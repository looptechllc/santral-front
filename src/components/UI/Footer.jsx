import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import yellowCall from "../../assets/yellowCall.svg";
import yellowMail from "../../assets/yellowMail.svg";
import yellowLocation from "../../assets/yellowLocation.svg";
import visa from "../../assets/visa.svg";
import mastercard from "../../assets/mastercard.svg";
import looptech from "../../assets/looptech.svg";
import yellowWhatsapp from "../../assets/yellowWhatsapp.svg";
import yellowInstagram from "../../assets/yellowInstagram.svg";
import yellowFacebook from "../../assets/yellowFacebook.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className=" border-t-[1px] border-solid border-[#ffd23f] pt-[40px]  bg-black text-white">
      <div className="w-[95%] mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-[30px] w-full">
        <Link className="" to="/">
          <img className="w-[217px]" src={logo} alt="logo.svg" />
        </Link>
        <img className="p-[8px] bg-[#232323] rounded-full w-[40px] h-[40px]" src={yellowFacebook} alt="facebook.svg" />
        <img className="p-[8px] bg-[#232323] rounded-full w-[40px] h-[40px]" src={yellowInstagram} alt="facebook.svg" />
        <img className="p-[8px] bg-[#232323] rounded-full w-[40px] h-[40px]" src={yellowWhatsapp} alt="facebook.svg" />
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
      <hr className="w-full h-[1px] bg-white/40 border-none my-[40px]" />
      <div className="w-[95%] mx-auto gap-y-[20px] grid grid-cols-2 md:grid-cols-4 place-content-start place-items-start">
        <div className="flex flex-col items-start  justify-center">
          <h2 className="font-medium text-[20px] mb-[32px] text-[#FFD23F]">
            Şirkət
          </h2>
          <div className="flex flex-col items-start gap-[16px]">
            <a>Haqqımızda</a>
            <a>Dükanlar</a>
            <a>Partnyorlar</a>
          </div>
        </div>
        <div className="flex flex-col items-start  justify-center">
          <h2 className="font-medium text-[20px] mb-[32px] text-[#FFD23F]">
            Müştəri üçün
          </h2>
          <div className="flex flex-col items-start gap-[16px]">
            <a>Çatdırılma qaydaları</a>
            <a>İstifadə qaydaları</a>
            <a>Ödəmə üsulları</a>
            <a>Məxfilik siyasəti</a>
            <a>Blog</a>
          </div>
        </div>
        <div className="flex flex-col items-start col-span-2 md:col-span-1  justify-center">
          <h2 className="font-medium text-[20px] mb-[32px] text-[#FFD23F]">
            Kateqoriyalar
          </h2>
          <div className="flex flex-col items-start gap-[16px]">
            <a>Mebel</a>
            <a>Divar kağızları</a>
            <a>Bağçılıq</a>
            <a>Seramika & Santexnik</a>
            <a>Elektrik malları</a>
          </div>
        </div>
        <div className="flex flex-col items-start  justify-center">
          <h2 className="font-medium text-[20px] mb-[16px] md:mb-[32px] text-[#FFD23F]">
            Əlaqə
          </h2>
          <div className="flex flex-col items-start gap-[16px]">
            <a className="flex items-center gap-[8px]">
              <img src={yellowCall} alt="call" />
              1410
            </a>
            <a className="flex items-center gap-[8px]">
              <img src={yellowCall} alt="call" />
              0123104314
            </a>
            <a className="flex items-center gap-[8px]">
              <img src={yellowMail} alt="mail" /> sales@santral.az
            </a>
            <a className="flex items-center gap-[8px]">
              <img src={yellowLocation} alt="location" /> Z.Bünyadov pr., 2071 <br />
              AZ1029, AZərbaycan, Bakı
            </a>
            <div className="flex items-center gap-[8px]">
            <img src={visa} alt="visa.svg" />
            <img className="border-l border-solid border-[#EAEAEA] px-[8px]" src={mastercard} alt="mastercard.svg" />
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-[1px] bg-white/40 border-none mt-[40px]" />
      <div className="flex items-center justify-center py-[20px]">
        <p className="text-center flex items-center gap-[8px] text-[18px]">Saytı hazırladı: <img src={looptech} alt="looptechLogo" /></p>
      </div>
    </div>
  );
};

export default Footer;
