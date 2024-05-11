import React from 'react'
import logo from '../../assets/logo.svg'
import phoneCall from '../../assets/iconCall.svg'
import facebook from '../../assets/iconFacebook.svg'
import instagram from '../../assets/iconInstagram.svg'
import whatsapp from '../../assets/iconWhatsapp.svg'
// import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='border-t-[1px] border-solid border-[#ffd23f] pt-5 px-5 flex flex-col lg:flex-row items-start justify-between'>
        <div className='w-full'>
        <img className='w-64' src={logo} alt="logo.svg" />
        <p>2000-ci ildən bu yana “Santral Elektrik” QSC şirkəti belə uğurlu iqtisadi siyasətdən bəhrələnərək müştərilərə müasir tələblərə cavab verən müxtəlif çeşidli məhsullar və sərfəli xidmətlər təklif edir.</p>
        </div>
       <div className='w-full flex items-center justify-center'>
       <div className='flex flex-col items-start  justify-center'>
            <h2 className='font-medium text-xl'>Şirkət</h2>
            <a>Haqqımızda</a>
            <a>Dükanlar</a>
            <a>Partnyorlar</a>
        </div>
       </div>
        <div className="w-full flex items-center justify-center">
        <div className='flex flex-col items-start  justify-center'>
            <h2 className="font-medium text-xl">Əlaqə</h2>
            <p className='hover:text-[#ffd23f] duration-300 text-xl flex items-center'><img className='w-6' src={phoneCall} alt="phoneCall.svg" /> 1410</p>
            <p className='hover:text-[#ffd23f] duration-300 text-xl flex items-center'><img className='w-6' src={phoneCall} alt="phoneCall.svg" /> 0123104314</p>
            <p>sales@santral.az</p>
        </div>
        </div>
        <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-start w-full justify-center">
        <h2 className="font-medium text-xl">Bizə Çatın</h2>
           <div className="flex gap-[5px]">
           <a href="" className='bg-[#ffd23f] px-4 p-3 rounded-md flex items-center justify-center'><img className='w-4' src={facebook} alt="facebook.svg" /></a>
            <a href="" className='bg-[#ffd23f]  p-3 rounded-md flex items-center justify-center'><img className='w-8' src={instagram} alt="facebook.svg" /></a>
            <a href="" className='bg-[#ffd23f]  p-3 rounded-md flex items-center justify-center'><img className='w-8' src={instagram} alt="facebook.svg" /></a>
            
           </div>
           <a href="">Ziya bunydaov pr., 2071 <br /> AZ 1029, Azərbaycan, Bakı</a>
        </div>
        </div>
    </div>
  )
}

export default Footer