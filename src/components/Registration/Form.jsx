import React, { useState } from "react";
import rightarrow from "../../assets/rightarrow.svg";
const Form = () => {
  const [formData, setFormData] = useState();

  return (
    <div className="p-[40px] w-full bg-[#fffefa] flex items-center justify-center">
      <div className="flex flex-col bg-white p-[24px] border border-solid border-[#EAEAEA] rounded-[16px]">
        <h2 className="font-bold text-[48px] text-center">Qeydiyyat</h2>
        <p className="my-[16px]">
          Qeydiyyatdan keçmək üçün zəhmət olmasa məlumatlarınızı doldurun{" "}
        </p>
        <form className="grid grid-cols-2 gap-[24px]">
          <div className="flex flex-col ">
            <label className="mb-[]" htmlFor="">
              Ad
            </label>
            <input
              value={formData?.firstName}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  firstName: e.target.value,
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
            value={formData?.lastName}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                lastName: e.target.value,
              }))
            }
              placeholder="Soyad"
              type="text"
              className="p-[16px] min-w-[300px]  focus:outline-none my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="flex flex-col col-span-2 ">
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
          <div className="flex flex-col col-span-2 ">
            <label className="mb-[]" htmlFor="">
              Mobil nömrə
            </label>
            <input
            value={formData?.phoneNumber}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                phoneNumber: e.target.value,
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
              placeholder="Şifrə təkrar"
              type="password"
              className="p-[16px] min-w-[300px] focus:outline-none  my-[4px] bg-[#EBEBEB] border border-solid border-black/40 rounded-[16px]"
            />
          </div>
          <div className="col-span-2">
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
