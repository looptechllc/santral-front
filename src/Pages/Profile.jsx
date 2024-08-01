import React, { useEffect, useMemo, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import defaultProfile from "../assets/profile.png";
import edit from "../assets/locationedit.png";

const Profile = () => {
  const [userData, setUserData] = useState({
    photo: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const [orders, setOrders] = useState();
  const [addresses, setAddresses] = useState();
  const [addressData, setAddressData] = useState();
  const [passwordData, setPasswordData] = useState();
  const [profilePhoto,setProfilePhoto] = useState();


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
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  async function updateProfileinfo(e) {
    e.preventDefault();
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/auth/profile`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("user info updated successfully");
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }
  async function updateProfilePicture() {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/file/upload/photo`;

    const formData = new FormData();
    formData.append('photo', profilePhoto.photo);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          photo: data.data.public,
        }));
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      toast.error("Error:", error);
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
  useEffect(()=>{
updateProfilePicture()
  },[
    profilePhoto
  ])

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
        console.log("address added successfully");
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
        alert("password changed successfully");
      } else {
        console.error("Your request cannot be completed");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }
  useEffect(() => {
    console.log(passwordData);
  }, [passwordData]);

  const profilePic = userData?.photo
    ? `https://cdn.santral.az//images/${userData?.photo}`
    : null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(profilePhoto)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto((prevUserData) => ({
          ...prevUserData,
          photo: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[95%]  py-[24px] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-[24px]">
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
              <form
                onSubmit={(e) => e.preventDefault()}
                className="grid grid-cols-2 gap-x-[24px] gap-y-[16px] w-full"
              >
                <div className="  col-span-2 flex items-center justify-center ">
                  <div className="relative">
                    <input
                      type="image"
                      src={ profilePic || defaultProfile}
                      alt="profile picture"
                      className="w-[147px] h-[147px] rounded-full"
                    />
                    <div className="absolute bottom-0 right-0  col-span-2 flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profileImageUpload"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("profileImageUpload").click()
                        }
                        className="bg-[#FFD23F]  border border-solid border-[#FFD23F] active:border-white hover:bg-white duration-300 rounded-full p-[14px]"
                      >
                        <svg
                          width="31"
                          height="31"
                          viewBox="0 0 31 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.2488 29.2786H8.87589C5.30298 29.2786 3.03162 27.1477 2.82746 23.5875L2.16391 13.0602C2.06183 11.4651 2.61053 9.93385 3.70793 8.77266C4.79256 7.61146 6.32381 6.94792 7.9061 6.94792C8.31444 6.94792 8.71001 6.70547 8.90142 6.32266L9.82016 4.49792C10.573 3.00495 12.4616 1.84375 14.1077 1.84375H17.0298C18.6759 1.84375 20.5517 3.00495 21.3045 4.48516L22.2233 6.34818C22.4147 6.70547 22.7975 6.94792 23.2186 6.94792C24.8009 6.94792 26.3321 7.61146 27.4168 8.77266C28.5142 9.94661 29.0629 11.4651 28.9608 13.0602L28.2972 23.6003C28.0676 27.2115 25.86 29.2786 22.2488 29.2786ZM14.1077 3.75781C13.1634 3.75781 11.9639 4.49792 11.5301 5.35286L10.6113 7.19036C10.0754 8.22396 9.04178 8.86198 7.9061 8.86198C6.83423 8.86198 5.83891 9.29583 5.09881 10.0742C4.37147 10.8526 4.00141 11.8734 4.07798 12.9326L4.74152 23.4727C4.89464 26.0503 6.28553 27.3646 8.87589 27.3646H22.2488C24.8264 27.3646 26.2173 26.0503 26.3832 23.4727L27.0467 12.9326C27.1105 11.8734 26.7532 10.8526 26.0259 10.0742C25.2858 9.29583 24.2905 8.86198 23.2186 8.86198C22.0829 8.86198 21.0493 8.22396 20.5134 7.21589L19.5819 5.35286C19.1608 4.51068 17.9613 3.77057 17.017 3.77057H14.1077V3.75781Z"
                            fill="black"
                            fill-opacity="0.87"
                          />
                          <path
                            d="M17.4766 11.4141H13.6484C13.1253 11.4141 12.6914 10.9802 12.6914 10.457C12.6914 9.93385 13.1253 9.5 13.6484 9.5H17.4766C17.9997 9.5 18.4336 9.93385 18.4336 10.457C18.4336 10.9802 17.9997 11.4141 17.4766 11.4141Z"
                            fill="black"
                            fill-opacity="0.87"
                          />
                          <path
                            d="M15.5624 24.1771C12.7424 24.1771 10.4583 21.893 10.4583 19.0729C10.4583 16.2529 12.7424 13.9688 15.5624 13.9688C18.3825 13.9688 20.6666 16.2529 20.6666 19.0729C20.6666 21.893 18.3825 24.1771 15.5624 24.1771ZM15.5624 15.8828C13.8015 15.8828 12.3723 17.312 12.3723 19.0729C12.3723 20.8339 13.8015 22.263 15.5624 22.263C17.3234 22.263 18.7525 20.8339 18.7525 19.0729C18.7525 17.312 17.3234 15.8828 15.5624 15.8828Z"
                            fill="black"
                            fill-opacity="0.87"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label htmlFor="">
                    Ad <span className="text-[#F44336]">*</span>
                  </label>
                  <input
                    value={userData.firstname}
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
                    value={userData.lastname}
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
                    value={userData.phone}
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
                    value={userData.email}
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
                    onClick={updateProfileinfo}
                    className="w-[295px] bg-[#FFD23F]  border border-solid border-[#FFD23F] active:border-white hover:bg-white duration-300 rounded-[32px] flex items-center justify-center gap-[10px] p-[14px]"
                  >
                    Yadda saxla
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
                {addresses?.data?.map((item, index) => (
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
                    <label htmlFor="">Ad</label>
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
                    <label htmlFor="">Soyad</label>
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
                    <label htmlFor="">Mobil nömrə</label>
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
                    <label htmlFor="">Şəhər</label>
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
                      <option value="" disabled selected>
                        Şəhər
                      </option>
                      {Object.keys(addresses?.cities).map((item, index) => (
                        <option key={index} value={item}>{addresses?.cities[item]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full col-span-2">
                    <label htmlFor="">Ünvan</label>
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
                      className="w-[295px] bg-[#FFD23F]  border border-solid border-[#FFD23F] active:border-white hover:bg-white duration-300 rounded-[32px] flex items-center justify-center gap-[10px] p-[14px]"
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
              <form className="flex flex-col gap-[16px] md:max-w-[50%]">
                <div className="w-full">
                  <label htmlFor="">Cari şifrə</label>
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
                  <label htmlFor="">Şifrə</label>
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
                  <label htmlFor="">Şifrə yenidən</label>
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
                    className="w-[295px] bg-[#FFD23F]  border border-solid border-[#FFD23F] active:border-white hover:bg-white duration-300 rounded-[32px] flex items-center justify-center gap-[10px] p-[14px]"
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
