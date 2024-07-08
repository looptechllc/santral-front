import React, { useEffect, useMemo, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import profilePic from "../assets/profile.png";
import edit from "../assets/locationedit.png";
const Profile = () => {
  const [userData, setUserData] = useState();
  const [orders, setOrders] = useState();
  const [addresses, setAddresses] = useState();
  const [addressData,setAddressData] = useState();
  const [passwordData,setPasswordData] = useState();
  async function getUserInfo() {
    const url = `https://api.santral.az/v1/auth/me`;
    const accessToken = secureLocalStorage.getItem("access_token");

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  async function getAllOrders() {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = "https://api.santral.az/v1/orders/history?page=1&lang=az";

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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  async function getAddresses() {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = "https://api.santral.az/v1/customers/address?lang=az";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: "{}",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setAddresses(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  useEffect(() => {
    getUserInfo();
    getAddresses();
    getAllOrders();
  }, []);

  const tabs = [
    "Şəxsi məlumatlar",
    "Sifarişlərim",
    "Mənim ünvanlarım",
    "Şifrəni yenilə",
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedOrders = useMemo(() => {
    if (!orders?.data) return [];
    let sortableItems = [...orders.data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aKey = a[sortConfig.key];
        let bKey = b[sortConfig.key];
        if (sortConfig.key === "products") {
          aKey = a.products.map((product) => product.title).join(", ");
          bKey = b.products.map((product) => product.title).join(", ");
        } else if (sortConfig.key === "createdAt") {
          aKey = new Date(a.createdAt);
          bKey = new Date(b.createdAt);
        }
        if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
        if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [orders, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  async function addAddress(e) {
    e.preventDefault();
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/customers/address/create`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(addressData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('address added successfully')
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }
  async function changePassword(e) {
    e.preventDefault();
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/auth/changepassword`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(passwordData),
      });
      const data = await response.json();
      if (response.ok) {
       alert('password changed successfully')
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }
  useEffect(()=>{
    console.log(passwordData)
  },[passwordData])
  return (
    <div className="w-[95%] mx-auto py-[24px]">
      <div className="flex items-start gap-[24px]">
        <div className="p-[16px] bg-black text-white rounded-[16px] flex flex-col items-start lg:min-w-[318px]">
          {tabs?.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index);
              }}
              className={`px-[24px] py-[16px] w-full text-left duration-300  text-[20px] rounded-[32px] ${
                activeTab === index ? "bg-[#FFD23F] text-black" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="w-full">
          {activeTab === 0 ? (
            <div className="w-full">
              <h2 className="text-[32px]">Şəxsi məlumatlar</h2>
              <form className="grid grid-cols-2 gap-x-[24px] gap-y-[16px] w-full">
                <div className="col-span-2 flex items-center justify-center">
                  <input
                    type="image"
                    src={userData?.photo ?? profilePic}
                    alt="profile picture"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">
                    Ad <span className="text-[#F44336]">*</span>
                  </label>
                  <input
                    value={userData?.firstname}
                    onChange={(e) =>
                      setUserData((prevUserData) => ({
                        ...prevUserData,
                        firstname: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Adınızı daxil edin"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">
                    Soyad <span className="text-[#F44336]">*</span>
                  </label>
                  <input
                    value={userData?.lastname}
                    onChange={(e) =>
                      setUserData((prevUserData) => ({
                        ...prevUserData,
                        lastname: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Soyadınızı daxil edin"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">
                    Mobil nömrə <span className="text-[#F44336]">*</span>
                  </label>
                  <input
                    value={userData?.phone}
                    onChange={(e) =>
                      setUserData((prevUserData) => ({
                        ...prevUserData,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Mobil nömrənizi daxil edin"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">
                    E-mail <span className="text-[#F44336]">*</span>
                  </label>
                  <input
                    value={userData?.email}
                    onChange={(e) =>
                      setUserData((prevUserData) => ({
                        ...prevUserData,
                        email: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="E-mail daxil edin"
                  />
                </div>
                <div className="w-full flex items-center my-[32px] justify-end col-span-2">
                  <button
                    type="submit"
                    className="w-[295px] bg-[#FFD23F] rounded-[32px] flex items-center justify-center gap-[10px] p-[14px]"
                  >
                    Yadda saxla{" "}
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab == 1 ? (
            <div className="w-full">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-[#EAEAEA] rounded-t-[8px]">
                  <tr>
                    <th className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        Satış
                        <button onClick={() => requestSort("id")}>
                          <span className="ml-2">⬆️⬇️</span>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        Menu item
                        <button onClick={() => requestSort("products")}>
                          <span className="ml-2">⬆️⬇️</span>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        Tarix
                        <button onClick={() => requestSort("createdAt")}>
                          <span className="ml-2">⬆️⬇️</span>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        Satış
                        <button onClick={() => requestSort("products.price")}>
                          <span className="ml-2">⬆️⬇️</span>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        Satış
                        <button onClick={() => requestSort("total.total")}>
                          <span className="ml-2">⬆️⬇️</span>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        Satış
                        <button onClick={() => requestSort("payment.type")}>
                          <span className="ml-2">⬆️⬇️</span>
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 border-b">
                      <div className="flex items-center">
                        Satış
                        <button onClick={() => requestSort("status")}>
                          <span className="ml-2">⬆️⬇️</span>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{item.id}</td>
                      <td className="px-4 py-2 border-b">
                        {item.products.map((product, index) => (
                          <p key={index}>
                            {product.quantity} x{" "}
                            <span className="font-bold">{product.title}</span>
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {item.createdAt.split("T")[0]}
                      </td>
                      <td className="px-4 h-full  py-2 border-b">
                        {item.products.map((product, index) => (
                          <p key={index} className="my-[20px]">
                            {product.price}₼
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {item.total.total}₼
                      </td>
                      <td className="px-4 py-2 border-b">
                        {item.payment.type}
                      </td>
                      <td className="px-4 py-2 border-b">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab == 2 ? (
            <div className="w-full flex flex-col lg:flex-row items-start gap-[24px]">
              <div className="flex flex-col  gap-[24px]">
                {addresses?.data?.map((item,index)=>(
                  <div className="bg-white border border-solid border-[#EAEAEA] rounded-[16px] p-[16px] grid grid-cols-2 gap-x-[70px] gap-y-[8px]">
                    <p className="flex flex-col items-start">
                      Ad
                     <span className="font-medium capitalize">
                     {item.firstname}
                     </span>
                    </p>
                    <p className="flex flex-col items-start">
                      Soyad
                     <span className="font-medium capitalize">
                     {item.lastname}
                     </span>
                    </p>
                    <p className="flex flex-col items-start">
                      Şəhər
                     <span className="font-medium capitalize">
                     {addresses.cities[item.city]}
                     </span>
                    </p>
                    <p className="flex flex-col items-start">
                      Nömrə
                     <span className="font-medium capitalize">
                     {item.mobile}
                     </span>
                    </p>
                    <p className="flex flex-col items-start">
                      Ünvan
                     <span className="font-medium capitalize">
                     {item.address}
                     </span>
                    </p>
                    <div className="flex w-full items-end justify-end">
                    <button className="w-[56px] ">
                    <img src={edit} alt="locationedit.png" />
                    </button>
                    </div>
                    
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[32px]">Yeni ünvan əlavə et</p>
                <form className="grid grid-cols-2 gap-x-[24px] gap-y-[16px]">
                <div className="w-full">
                  <label htmlFor="">
                    Ad 
                  </label>
                  <input
                    value={addressData?.firstname}
                    onChange={(e) =>
                      setAddressData((prevUserData) => ({
                        ...prevUserData,
                        firstname: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Adınızı daxil edin"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">
                    Soyad 
                  </label>
                  <input
                    value={addressData?.lastname}
                    onChange={(e) =>
                      setAddressData((prevUserData) => ({
                        ...prevUserData,
                        lastname: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Soyadınızı daxil edin"
                  />
                </div>
                <div className="w-full col-span-2">
                  <label htmlFor="">
                    Mobil nömrə 
                  </label>
                  <input
                    value={addressData?.mobile}
                    onChange={(e) =>
                      setAddressData((prevUserData) => ({
                        ...prevUserData,
                        mobile: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Mobil nömrənizi daxil edin"
                  />
                </div>
                <div className="w-full col-span-2">
                  <label htmlFor="">
                  Şəhər 
                  </label>
                  <select
                    value={addressData?.city}
                    onChange={(e) =>
                      setAddressData((prevUserData) => ({
                        ...prevUserData,
                        city: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Şəhər  "
                  >
                    <option value="" disabled selected>Şəhər</option>
                    {Object.keys(addresses?.cities).map((item,index)=>(
                      <option value={item}>{addresses?.cities[item]}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full col-span-2">
                  <label htmlFor="">
                  Ünvan  
                  </label>
                  <input
                    value={addressData?.address}
                    onChange={(e) =>
                      setAddressData((prevUserData) => ({
                        ...prevUserData,
                        address: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="Ünvan  "
                  />
                </div>
                <div className="w-full flex items-center my-[32px] justify-end col-span-2">
                  <button
                    type="submit"
                    onClick={addAddress}
                    className="w-[295px] bg-[#FFD23F] rounded-[32px] flex items-center justify-center gap-[10px] p-[14px]"
                  >
                    Ünvan əlavə et
                  </button>
                </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
                <p className="text-[32px] mb-[16px]">Şifrəni dəyiş</p>
                <form className="flex flex-col gap-[16px] max-w-[50%]">
                <div className="w-full">
                  <label htmlFor="">
                  Cari şifrə 
                  </label>
                  <input
                    value={passwordData?.current}
                    onChange={(e) =>
                      setPasswordData((prevUserData) => ({
                        ...prevUserData,
                        current: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="********"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">
                  Şifrə
                  </label>
                  <input
                    value={passwordData?.password}
                    onChange={(e) =>
                      setPasswordData((prevUserData) => ({
                        ...prevUserData,
                        password: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="********"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="">
                  Şifrə yenidən
                  </label>
                  <input
                    value={passwordData?.password2}
                    onChange={(e) =>
                      setPasswordData((prevUserData) => ({
                        ...prevUserData,
                        password2: e.target.value,
                      }))
                    }
                    className="bg-[#EBEBEB] w-full border border-solid border-black/40 rounded-[16px] p-[16px] focus:outline-[#FFD23F]"
                    type="text"
                    placeholder="********"
                  />
                </div>
                <div className="w-full flex items-center my-[32px] justify-end col-span-2">
                  <button
                    type="submit"
                    onClick={changePassword}
                    className="w-[295px] bg-[#FFD23F] rounded-[32px] flex items-center justify-center gap-[10px] p-[14px]"
                  >
                    Şifrəni yenilə
                  </button>
                </div>
                </form>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
