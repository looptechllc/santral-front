// import Link from "next/link";

import { Link } from "react-router-dom";
import heart from "../../assets/whiteHeart.svg";
import cart from "../../assets/whiteCart.svg";
import searchIcon from "../../assets/search.svg";

export default function Drawer({ isOpen, setIsOpen, scrollToSection }) {
  return (
    <main
      className={
        "fixed  inset-0 z-[99999999999] transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out " +
        (isOpen
          ? " translate-x-0 opacity-100 transition-opacity duration-500  "
          : " translate-x-full opacity-0 transition-all delay-500  ")
      }
    >
      <section
        className={
          "delay-300 h-full w-screen max-w-lg transform bg-[#FFD23F] shadow-xl transition-all duration-500 ease-in-out  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <div className="relative flex h-full w-screen max-w-lg flex-col space-y-6 overflow-y-scroll pb-10">
          <div className=" w-full flex flex-col items-start gap-10 px-4 pt-4 ">
            <div className="flex w-full items-center justify-end">
              <button onClick={() => setIsOpen(false)}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9998 30.3333C8.09317 30.3333 1.6665 23.9067 1.6665 16C1.6665 8.09334 8.09317 1.66667 15.9998 1.66667C23.9065 1.66667 30.3332 8.09334 30.3332 16C30.3332 23.9067 23.9065 30.3333 15.9998 30.3333ZM15.9998 3.66667C9.19984 3.66667 3.6665 9.20001 3.6665 16C3.6665 22.8 9.19984 28.3333 15.9998 28.3333C22.7998 28.3333 28.3332 22.8 28.3332 16C28.3332 9.20001 22.7998 3.66667 15.9998 3.66667Z"
                    fill="#292D32"
                  />
                  <path
                    d="M12.2266 20.7733C11.9733 20.7733 11.72 20.68 11.52 20.48C11.1333 20.0933 11.1333 19.4533 11.52 19.0667L19.0666 11.52C19.4533 11.1333 20.0933 11.1333 20.48 11.52C20.8666 11.9067 20.8666 12.5467 20.48 12.9333L12.9333 20.48C12.7466 20.68 12.48 20.7733 12.2266 20.7733Z"
                    fill="#292D32"
                  />
                  <path
                    d="M19.7733 20.7733C19.52 20.7733 19.2666 20.68 19.0666 20.48L11.52 12.9333C11.1333 12.5467 11.1333 11.9067 11.52 11.52C11.9066 11.1333 12.5466 11.1333 12.9333 11.52L20.48 19.0667C20.8666 19.4533 20.8666 20.0933 20.48 20.48C20.28 20.68 20.0266 20.7733 19.7733 20.7733Z"
                    fill="#292D32"
                  />
                </svg>
              </button>
            </div>

            <div className="bg-[#232323] rounded-[16px] p-[16px] w-full border border-[#D9D9D9]">
              <Link
                to="/basket"
                className="py-[16px] bg-[#232323] p-[8px] text-white flex items-center gap-[16px]"
              >
                <img className="w-[24px] h-[24px]" src={cart} alt="heart.svg" />
                Səbət
              </Link>

              <Link
                to="/favorites"
                className="py-[16px] border-y border-white/40 bg-[#232323] p-[8px] text-white flex items-center gap-[16px]"
              >
                <img
                  className="w-[24px] h-[24px]"
                  src={heart}
                  alt="heart.svg"
                />
                Seçilmişlər
              </Link>
            </div>
            <ul className=" w-full flex flex-col items-start justify-between gap-[16px] mt-[16px] font-[400] text-[20px]">
              <li className="w-full border-b border-black/40 py-[12px]">
                <Link className=" " to="/">
                  Əsas
                </Link>
              </li>
              <li className="w-full border-b border-black/40 py-[12px]">
                <Link className=" " to="/about">
                  Haqqımızda
                </Link>
              </li>
              <li className="w-full border-b border-black/40 py-[12px]">
                <Link
                  className=" "
                  to="/branches"
                >
                  Filliallar
                </Link>
              </li>
              <li className="w-full border-b border-black/40 py-[12px]">
                <Link className=" " to="/news">
                  Xəbərlər
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section
        className="h-full w-screen cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
