import React from 'react'
import icons from '../utils/icons'

const { FiSearch } = icons

const Search = () => {
    return (
        <div className='bg-[#DDE3E3] rounded-[20px] w-full flex items-center overflow-hidden'>
            <span className='h-10 pl-4 py-2 cursor-pointer flex items-center justify-center text-[#757575]'>
                <FiSearch size={20} />
            </span>
            <input
                type="text"
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                className='px-4 py-2 rounded-[20px] outline-none w-full h-10 text-sm text-[#282828]'
            />
        </div>
    )
}

export default Search