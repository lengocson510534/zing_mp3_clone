import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { sidebarMenu } from '../utils/menu'

const notActiveStyle = 'text-[13px] text-[#32323D] font-bold py-2 px-[25px] flex items-center gap-[10px]'
const activeStyle = 'text-[13px] text-[#0f7070] font-bold py-2 px-[25px] flex items-center gap-[10px]'


const SidebarLeft = () => {
    return (
        <div className='flex flex-col bg-main-200 h-full'>
            <div className='w-full h-[70px] py-[15px] px-[25px] flex items-center justify-start'>
                <img src={logo} alt="logo" className='w-[120px] h-[40px]' />
            </div>
            <div className='flex flex-col'>
                {sidebarMenu.map((item, i) => (
                    <NavLink
                        to={item.path}
                        key={i}
                        className={({ isActive }) =>
                            isActive ? activeStyle : notActiveStyle
                        }
                    >
                        {item.icon}
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft