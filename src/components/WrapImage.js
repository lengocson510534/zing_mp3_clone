import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../utils/icons'

const { AiOutlineHeart, BsFillPlayFill, HiOutlineDotsHorizontal } = icons

const WrapImage = ({ path, title, sortDesc, link, artists }) => {
    const navigate = useNavigate()
    const imageRef = useRef()

    const [isHover, setIsHover] = useState(false)

    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList.add('scale-110')
    }

    const handleLeave = () => {
        setIsHover(false)
        imageRef.current.classList.remove('scale-110')
    }

    return (
        <div className='flex flex-col gap-[6px] flex-1'>
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className='overflow-hidden rounded-md shadow-xl relative cursor-pointer'
                onClick={() => {
                    navigate(link, { state: { playAlbum: false } })
                }}
            >
                <img
                    src={path}
                    alt="thumbnail"
                    className='object-cover rounded-md ease-linear duration-300'
                    ref={imageRef}
                />
                {isHover &&
                    <div className='absolute inset-0 bg-overlay flex items-center justify-center gap-[20px] text-white'>
                        <span className='w-[30px] h-[30px] rounded-full hover:bg-gray-220 flex items-center justify-center'>
                            <AiOutlineHeart size={20} />
                        </span>
                        <span
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(link, { state: { playAlbum: true } })
                            }}
                            className='w-[45px] h-[45px] rounded-full border border-white flex items-center justify-center'
                        >
                            <BsFillPlayFill size={30} className='ml-[3px]' />
                        </span>
                        <span className='w-[30px] h-[30px] rounded-full hover:bg-gray-220 flex items-center justify-center'>
                            <HiOutlineDotsHorizontal size={20} />
                        </span>
                    </div>
                }
            </div>

            {title &&
                <span
                    className='font-bold whitespace-nowrap text-[14px] mt-2 hover:text-main-highlight hover:cursor-pointer'
                    onClick={() => {
                        navigate(link)
                    }}
                >
                    {`${title?.slice(0, 20)}...`}
                </span>
            }
            {sortDesc &&
                <span className='text-gray-69 text-[14px] leading-5'>{sortDesc?.slice(0, 45)}...</span>
            }
            {artists &&
                <p>
                    {(artists?.slice(0, 3)).map(item => (
                        <span
                            key={item.id}
                            className='text-[14px] text-gray-69 mr-[2px] leading-4 tracking-wide hover:text-main-highlight hover:underline hover:cursor-pointer'
                            onClick={() => {
                                navigate(item.link)
                            }}
                        >
                            {item.name + ','}
                        </span>
                    ))}
                </p>}

        </div>
    )
}

export default WrapImage