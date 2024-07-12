import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const Basket = () => {
  const [basket, setBasket] = useState();
  const [count, setCount] = useState(1);

  async function fetchBasket() {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/products/basket`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setBasket(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchBasket();
  }, [count]);

  async function increment(id) {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/products/basket/inc`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("item added successfully");
        fetchBasket(); // Re-fetch the basket data
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function remove(id) {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/products/basket/remove`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("item deleted successfully");
        fetchBasket(); // Re-fetch the basket data
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function decrement(id) {
    if (count > 1) {
      // Assuming minimalOrder is 1
      const accessToken = secureLocalStorage.getItem("access_token");
      const url = `https://api.santral.az/v1/products/basket/dec`; // Assuming a decrement API endpoint

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            product: id,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log("item removed successfully");
          fetchBasket(); // Re-fetch the basket data
        } else {
          console.error("Your request cannot be completed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div className="pt-[40px] pb-[120px] bg-[#fffefa] px-[50px]">
      <div className="bg-white border border-solid border-[#EAEAEA] rounded-[16px] p-[16px] flex flex-col gap-[24px]">
        {basket?.data?.map((item) => (
          <div
            key={item.id}
            className=" flex items-center justify-between gap-[16px] border border-solid border-[#EAEAEA] p-[16px] rounded-[16px]"
          >
            <div className="flex items-center gap-[16px]">
              <input
                type="checkbox"
                className="w-[24px] h-[24px] accent-[#FFD23F]"
                name=""
                id=""
              />
              <img
                className="w-[86px] rounded-[8px] border border-solid border-[#EAEAEA]"
                src={`https://cdn.santral.az//images/${item.thumbnail}`}
                alt=""
              />
              <p className=" font-[500] text-[24px]">{item.title}</p>
            </div>
            <div className="flex items-center gap-[16px]">
              <div className="flex items-center gap-[10px] p-[6px] border border-[#EAEAEA] w-fit rounded-[32px]">
                <button
                  className="duration-300 bg-white hover:bg-[#FFD23F] text-black/40 hover:text-white w-[40px] h-[40px] rounded-full text-[32px] flex items-center justify-center p-0"
                  onClick={() => {
                    decrement(item.id);
                    setCount(count - 1);
                  }}
                >
                  <span>-</span>
                </button>
                <span className="text-[20px] font-medium">{item.count}</span>
                <button
                  className="duration-300 bg-white hover:bg-[#FFD23F] text-black/40 hover:text-white w-[40px] h-[40px] rounded-full text-[32px] flex items-center justify-center p-0"
                  onClick={() => {
                    increment(item.id);
                    setCount(count + 1);
                  }}
                >
                  <span>+</span>
                </button>
              </div>
              <p className="font-[500] text-[20px] text-[#FD8521]">
                {item.total}₼
              </p>
              <button onClick={() => remove(item.id)}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2266 20.7738C11.9733 20.7738 11.72 20.6805 11.52 20.4805C11.1333 20.0938 11.1333 19.4538 11.52 19.0671L19.0666 11.5205C19.4533 11.1338 20.0933 11.1338 20.48 11.5205C20.8666 11.9071 20.8666 12.5471 20.48 12.9338L12.9333 20.4805C12.7466 20.6805 12.48 20.7738 12.2266 20.7738Z"
                    fill="#F44336"
                  />
                  <path
                    d="M19.7733 20.7738C19.52 20.7738 19.2666 20.6805 19.0666 20.4805L11.52 12.9338C11.1333 12.5471 11.1333 11.9071 11.52 11.5205C11.9066 11.1338 12.5466 11.1338 12.9333 11.5205L20.48 19.0671C20.8666 19.4538 20.8666 20.0938 20.48 20.4805C20.28 20.6805 20.0266 20.7738 19.7733 20.7738Z"
                    fill="#F44336"
                  />
                  <path
                    d="M20 30.3327H12C4.75996 30.3327 1.66663 27.2393 1.66663 19.9993V11.9993C1.66663 4.75935 4.75996 1.66602 12 1.66602H20C27.24 1.66602 30.3333 4.75935 30.3333 11.9993V19.9993C30.3333 27.2393 27.24 30.3327 20 30.3327ZM12 3.66602C5.85329 3.66602 3.66663 5.85268 3.66663 11.9993V19.9993C3.66663 26.146 5.85329 28.3327 12 28.3327H20C26.1466 28.3327 28.3333 26.146 28.3333 19.9993V11.9993C28.3333 5.85268 26.1466 3.66602 20 3.66602H12Z"
                    fill="#F44336"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
