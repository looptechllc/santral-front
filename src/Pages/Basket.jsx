import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const Basket = () => {
  const [basket, setBasket] = useState();
  const [count, setCount] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

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
        const updatedOrderList = data.data.filter((basketItem) =>
          selectedItems.includes(basketItem.id)
        );
        setOrderList(updatedOrderList);
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
        fetchBasket();
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
        fetchBasket(); 
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function removeAll() {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/products/basket/removeAll`;

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
        console.log("all items deleted successfully");
        fetchBasket(); // Re-fetch the basket data
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function decrement(id) {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/products/basket/dec`;
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
        fetchBasket();
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      setSelectedItems(basket?.data.map((item) => item.id));
      setOrderList(basket?.data);
    } else {
      setSelectedItems([]);
      setOrderList([]);
    }
  };

  const handleSelectItem = (id) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id];

    const newOrderList = orderList.some((item) => item.id === id)
      ? orderList.filter((item) => item.id !== id)
      : [...orderList, basket.data.find((item) => item.id === id)];

    setSelectedItems(newSelectedItems);
    setOrderList(newOrderList);
    setSelectAll(newSelectedItems.length === basket?.data?.length);
  };

  useEffect(() => {
    let price = 0;
    orderList?.map((item) => (price += item.total));
    setTotalPrice(price.toFixed(2));
  }, [basket, selectedItems, count, orderList]);

  useEffect(() => {
    const updatedOrderList = orderList.filter((orderItem) =>
      basket.data.filter((basketItem) => basketItem.id === orderItem.id)
    );
    setOrderList(updatedOrderList);
  }, [basket]);

  return (
    <div className="pt-[40px] pb-[120px] bg-[#fffefa] px-[48px] flex items-start gap-[24px]">
      <div className="w-full bg-white border border-solid border-[#EAEAEA] rounded-[16px] p-[16px] flex flex-col gap-[24px]">
        <div className="flex items-center justify-between">
          <p className="text-[32px]">Səbət</p>
          <div className="flex items-center gap-[16px]">
            <button
              onClick={handleSelectAll}
              className="flex items-center justify-center gap-[10px] px-[16px] py-[8px] rounded-full border border-[#EAEAEA]"
            >
              <input
                className="w-[24px] h-[24px] accent-[#FFD23F]"
                type="checkbox"
                name=""
                id=""
                checked={selectAll}
                onChange={handleSelectAll}
              />
              Hamısını seç
            </button>
            <button
              onClick={removeAll}
              className="flex items-center justify-center gap-[10px] px-[16px] py-[8px] rounded-full border border-[#FDDBD8] bg-[#FDDBD8] text-[#F44336]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 6.73046C20.98 6.73046 20.95 6.73046 20.92 6.73046C15.63 6.20046 10.35 6.00046 5.12004 6.53046L3.08004 6.73046C2.66004 6.77046 2.29004 6.47046 2.25004 6.05046C2.21004 5.63046 2.51004 5.27046 2.92004 5.23046L4.96004 5.03046C10.28 4.49046 15.67 4.70046 21.07 5.23046C21.48 5.27046 21.78 5.64046 21.74 6.05046C21.71 6.44046 21.38 6.73046 21 6.73046Z"
                  fill="#F44336"
                />
                <path
                  d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z"
                  fill="#F44336"
                />
                <path
                  d="M15.21 22.7496H8.79002C5.30002 22.7496 5.16002 20.8196 5.05002 19.2596L4.40002 9.18959C4.37002 8.77959 4.69002 8.41959 5.10002 8.38959C5.52002 8.36959 5.87002 8.67959 5.90002 9.08959L6.55002 19.1596C6.66002 20.6796 6.70002 21.2496 8.79002 21.2496H15.21C17.31 21.2496 17.35 20.6796 17.45 19.1596L18.1 9.08959C18.13 8.67959 18.49 8.36959 18.9 8.38959C19.31 8.41959 19.63 8.76959 19.6 9.18959L18.95 19.2596C18.84 20.8196 18.7 22.7496 15.21 22.7496Z"
                  fill="#F44336"
                />
                <path
                  d="M13.66 17.25H10.33C9.91996 17.25 9.57996 16.91 9.57996 16.5C9.57996 16.09 9.91996 15.75 10.33 15.75H13.66C14.07 15.75 14.41 16.09 14.41 16.5C14.41 16.91 14.07 17.25 13.66 17.25Z"
                  fill="#F44336"
                />
                <path
                  d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                  fill="#F44336"
                />
              </svg>
              Hamısını sil
            </button>
          </div>
        </div>
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
                checked={selectedItems.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
              />
              <img
                className="w-[86px] rounded-[8px] border border-solid border-[#EAEAEA]"
                src={`https://cdn.santral.az//images/${item.thumbnail}`}
                alt=""
              />
              <p className=" font-[500] text-[24px] max-w-[390px]">
                {item.title}
              </p>
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
                {item.total?.toFixed(2)}₼
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
      {selectedItems.length > 0 && (
        <div className="w-[432px] bg-white border border-solid border-[#EAEAEA] rounded-[16px] p-[16px] flex flex-col ">
          <div className="w-full border-b border-[#EAEAEA] pb-[16px] flex items-center justify-between">
            <p>Məhsul:</p>
            <p className="font-[500] text-[20px]">
              {selectedItems.length} məhsul
            </p>
          </div>
          <div className="pt-[24px] pb-[16px] border-b border-[#eaeaea] flex flex-col gap-[16px]">
            {orderList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full gap-[16px] pb-[16px]"
              >
                <p className="leading-[24px] ">{item.title}</p>
                <p className="font-[500]  text-[#FD8521]">
                  {item.total?.toFixed(2)}₼
                </p>
              </div>
            ))}
          </div>
          <div className="pt-[24px] pb-[16px] border-b border-[#eaeaea] flex flex-col gap-[16px]">
            <div className="flex items-center justify-between w-full gap-[16px] pb-[16px]">
              <p className="leading-[24px] ">Ümumi məbləğ:</p>
              <p className="font-[500]  text-[#FD8521]">{totalPrice}₼</p>
            </div>
          </div>
          <div className="pt-[8px] pb-[16px]">
            <p className="text-[12px] text-black/90 leading-[16px]">
              Çatdırılma məsafədən asılı olaraq 2-8 azn məbləğində dəyişir.
              Onlayn alış-verişləriniz zamanı cashback ilə ödənişdən faydalana
              bilərsiniz. Hər uğurlu sifarişdə(1₼ və üzəri) sifariş məbləğinin
              1%-i qədər cashback qazanın.
            </p>
            <button className="bg-[#FFD23F] mt-[32px] flex items-center justify-center p-[16px] gap-[10px] w-full rounded-[32px]">
              Sifarişi rəsmiləşdir
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                  fill="black"
                  fill-opacity="0.87"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
