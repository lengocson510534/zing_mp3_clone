import React from 'react'
import icons from '../utils/icons'
import Search from './Search'


const { HiArrowRight, HiArrowLeft, FaUser } = icons

const Header = () => {
    return (
        <div className='flex justify-between w-full'>
            <div className='flex items-center gap-6 w-full'>
                <div className='flex items-center gap-[24px] text-[#A1AAAD]'>
                    <HiArrowLeft size={20} />
                    <HiArrowRight size={20} />
                </div>
                <div className='w-1/2'>
                    <Search />
                </div>
            </div>
            <div className='w-[40px] flex items-center justify-center rounded-full bg-[#CED5E3] text-white cursor-pointer hover:bg-gray-400 hover:text-gray-200'>
                <FaUser />
            </div>
        </div>
    )
}

export default Header