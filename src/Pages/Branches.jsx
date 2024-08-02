import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchDetails, setBranchDetails] = useState(null);

  async function getPublicStores() {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = "https://api.santral.az/v1/stores/published?lang=az";

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
      setBranches(data.data);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function getBranchDetails(branchId) {
    const accessToken = secureLocalStorage.getItem("access_token");
    const url = `https://api.santral.az/v1/stores/info/${branchId}?lang=az`;

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
      setBranchDetails(data.data);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  useEffect(() => {
    getPublicStores();
  }, []);

  const handleBranchClick = (branchId) => {
    setSelectedBranch(branchId);
    getBranchDetails(branchId);
  };

  const handleBackClick = () => {
    setSelectedBranch(null);
    setBranchDetails(null);
  };

  return (
    <div className="max-w-[1440px] mx-auto p-[16px] md:p-[50px]">
      {!selectedBranch ? (
        <>
          <div>
            <h2 className="text-black/90 text-[32px]">Filiallarımız</h2>
          </div>
          <div className="mt-[16px] flex flex-col-reverse md:flex-row items-start gap-[24px]">
            <div className="flex flex-col gap-[16px] w-full md:overflow-scroll md:max-h-[424px]">
              {branches?.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#EAEAEA] p-[16px] rounded-[16px] flex flex-col gap-[8px]"
                >
                  <div className="flex items-start gap-[16px] justify-between">
                    <div>
                      <h4 className="font-[500] text-[24px]">{item.title}</h4>
                      <p className="text-[14px] leading-[24px]">
                        {item.address}
                      </p>
                    </div>
                    <button
                      className="py-[16px] px-[24px] rounded-[32px] bg-[#FFD23F] border border-[#ffd23f] hover:bg-white duration-300 active:border-white"
                      onClick={() => handleBranchClick(item.id)}
                    >
                      Ətraflı
                    </button>
                  </div>
                  <div
                    className="pt-[8px] border-t border-[#EAEAEA]"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.9532990351986!2d49.81402397598864!3d40.365559858752164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307db7d72d5843%3A0xc31ecb0133827674!2sSantral%20Elektrik%20(Elmler%20filiali)!5e0!3m2!1sen!2saz!4v1721972847937!5m2!1sen!2saz"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[313px] md:h-[420px]"
              ></iframe>
            </div>
          </div>
        </>
      ) : (
        branchDetails && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <button
                className=" p-[8px] rounded-full bg-[#EFF1F1] duration-300 hover:bg-[#FFD23F] self-start"
                onClick={handleBackClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 20.6695C14.81 20.6695 14.62 20.5995 14.47 20.4495L7.95003 13.9295C6.89003 12.8695 6.89003 11.1295 7.95003 10.0695L14.47 3.54953C14.76 3.25953 15.24 3.25953 15.53 3.54953C15.82 3.83953 15.82 4.31953 15.53 4.60953L9.01003 11.1295C8.53003 11.6095 8.53003 12.3895 9.01003 12.8695L15.53 19.3895C15.82 19.6795 15.82 20.1595 15.53 20.4495C15.38 20.5895 15.19 20.6695 15 20.6695Z"
                    fill="#292D32"
                  />
                </svg>
              </button>
              <h2 className="text-black/90 text-[32px]">
                {branchDetails.title}
              </h2>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col gap-[16px] w-full">
                <div
                  dangerouslySetInnerHTML={{ __html: branchDetails.desc }}
                ></div>
                <p>
                  <span className="font-[500]">Ünvan: </span>
                  {branchDetails.address}
                </p>
              </div>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.9532990351986!2d${branchDetails.lng}!3d${branchDetails.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307db7d72d5843%3A0xc31ecb0133827674!2sSantral%20Elektrik%20(Elmler%20filiali)!5e0!3m2!1sen!2saz!4v1721972847937!5m2!1sen!2saz`}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[420px] rounded-[16px]"
              ></iframe>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Branches;
