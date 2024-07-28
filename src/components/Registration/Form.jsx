import React, { useState } from "react";
import rightarrow from "../../assets/rightarrow.svg";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [formData, setFormData] = useState();
  const navigate = useNavigate()
  async function registerUser(e) {
    e.preventDefault();
    const url =  `https://api.santral.az/v1/auth/signup`;
    

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/success")
      } else {
        console.error("Your request cannot be completed")
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  }
  return (
    <div className="p-[16px] md:p-[40px] w-full bg-[#fffefa] flex items-center justify-center">
      <div className="flex flex-col bg-white p-[24px] border border-solid border-[#EAEAEA] rounded-[16px]">
        <h2 className="font-bold text-[24px] md:text-[48px] text-center">Qeydiyyat</h2>
        <p className="my-[16px] text-[14px] md:text-[16px] text-center">
          Qeydiyyatdan keçmək üçün zəhmət olmasa məlumatlarınızı doldurun{" "}
        </p>
        <form onSubmit={(e)=>{registerUser(e)}} className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <div className="flex flex-col ">
            <label className="mb-[]" htmlFor="">
              Ad
            </label>
            <input
              value={formData?.firstname}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  firstname: e.target.value,
                }))
              }
              placeholder="Ad"
              type="text"
              className="p-[16px] min-w-[300px] focus:outline-none  my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="flex flex-col ">
            <label className="mb-[]" htmlFor="">
              Soyad
            </label>
            <input
            value={formData?.lastname}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                lastname: e.target.value,
              }))
            }
              placeholder="Soyad"
              type="text"
              className="p-[16px] min-w-[300px]  focus:outline-none my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="flex flex-col md:col-span-2 ">
            <label className="mb-[]" htmlFor="">
              E-mail
            </label>
            <input
            value={formData?.email}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                email: e.target.value,
              }))
            }
              placeholder="E-mail daxil edin"
              type="email"
              className="p-[16px] min-w-[300px] focus:outline-none  my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="flex flex-col md:col-span-2 ">
            <label className="mb-[]" htmlFor="">
              Mobil nömrə
            </label>
            <input
            value={formData?.phone}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                phone: e.target.value,
              }))
            }
              placeholder="Mobil nömrə daxil edin"
              type="tel"
              className="p-[16px] min-w-[300px]  focus:outline-none my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="flex flex-col ">
            <label className="mb-[]" htmlFor="">
              Şifrə
            </label>
            <input
            value={formData?.password}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                password: e.target.value,
              }))
            }
              placeholder="Şifrə"
              type="password"
              className="p-[16px] min-w-[300px] focus:outline-none  my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="flex flex-col ">
            <label className="mb-[]" htmlFor="">
              Şifrə təkrar
            </label>
            <input
            value={formData?.password2}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                password2: e.target.value,
              }))
            }
              placeholder="Şifrə təkrar"
              type="password"
              className="p-[16px] min-w-[300px] focus:outline-none  my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="md:col-span-2">
            <button className="w-full bg-[#FFD23F] p-[16px] rounded-[32px] flex items-center justify-center gap-[18px]">
              Qeydiyyatdan keç <img src={rightarrow} alt="rightarrow.svg" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
