import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import profilePic from '../assets/profile.png'
const Profile = () => {
  const [userData, setUserData] = useState();
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
    const url = `https://api.santral.az//v1/orders/info?token=${accessToken}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  useEffect(() => {
    getUserInfo();
    getAllOrders();
  }, []);

  const tabs = [
    "Şəxsi məlumatlar",
    "Sifarişlərim",
    "Mənim ünvanlarım",
    "Şifrəni yenilə",
  ];
  const [activeTab, setActiveTab] = useState(0);
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
          {activeTab === 0 && (
            <div className="w-full">
              <h2 className="text-[32px]">Şəxsi məlumatlar</h2>
              <form className="grid grid-cols-2 gap-x-[24px] gap-y-[16px] w-full">
                <div className="col-span-2 flex items-center justify-center">
                  <input
                    type="image"
                    src={userData?.photo??profilePic}
                    alt="profile picture"
                  />
                </div>
                <div className="w-full">
                    <label htmlFor="">Ad <span className="text-[#F44336]">*</span></label>
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
                    <label htmlFor="">Soyad <span className="text-[#F44336]">*</span></label>
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
                    <label htmlFor="">Mobil nömrə <span className="text-[#F44336]">*</span></label>
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
                    <label htmlFor="">E-mail <span className="text-[#F44336]">*</span></label>
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
                <button type="submit" className="w-[295px] bg-[#FFD23F] rounded-[32px] flex items-center justify-center gap-[10px] p-[14px]">
                    Yadda saxla{" "}
                    
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
