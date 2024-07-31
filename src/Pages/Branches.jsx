import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const Branches = () => {
  const [branches, setBranches] = useState();
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
  useEffect(() => {
    getPublicStores();
  }, []);
  return (
    <div className="max-w-[1440px] mx-auto p-[16px] md:p-[50px]">
      <div>
        <h2 className="text-black/90 text-[32px]">Filiallarımız</h2>
      </div>
      <div className="mt-[16px] flex flex-col-reverse md:flex-row items-start gap-[24px] ">
        <div className="flex flex-col gap-[16px] w-full md:overflow-scroll md:max-h-[424px]">
          {branches?.map((item, index) => (
            <div className="border border-[#EAEAEA] p-[16px] rounded-[16px] flex flex-col gap-[8px]">
              <div className="flex items-start gap-[16px] justify-between">
                <div>
                  <h4 className="font-[500] text-[24px]">{item.title}</h4>
                  <p className="text-[14px] leading-[24px]">{item.address}</p>
                </div>
                <button className="py-[16px] px-[24px] rounded-[32px] bg-[#FFD23F]">
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
            

            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="w-full h-[313px] md:h-[420px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Branches;
