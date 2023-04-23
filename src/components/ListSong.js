import React, { memo } from 'react'
import ListSongItem from './ListSongItem'
import icons from '../utils/icons'
import moment from 'moment'
import { useSelector } from 'react-redux'

const { BsDot, BiSortAlt2 } = icons

const ListSong = ({ totalDuration, total }) => {
    const { songs } = useSelector(state => state.music)

    return (
        <div className='w-full flex flex-col'>
            <div className='flex items-center text-xs font-medium text-gray-69 border-b border-[#C3CECE] py-[15px] px-[10px]'>
                <span className='w-[50%] flex items-center gap-[10px]'>
                    <span className='w-[16px] h-[16px] cursor-pointer border rounded-md border-gray-69 flex items-center justify-center'>
                        <BiSortAlt2 size={16} />
                    </span>
                    <span>BÀI HÁT</span>
                </span>
                <span className='flex items-center justify-start w-[40%]'>ALBUM</span>
                <span className='flex items-center justify-end w-[10%]'>THỜI GIAN</span>
            </div>
            <div className='flex flex-col'>
                {songs?.map(item => (
                    <ListSongItem songData={item} key={item.encodeId} streamingStatus={item.streamingStatus} />
                ))}
            </div>
            <span className='text-[13px] leading-[18/13] text-gray-69 mt-4 flex items-center gap-[8px] px-[10px]'>
                <span>{total} bài hát</span>
                <BsDot />
                <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
            </span>

        </div>
    )
}

export default memo(ListSong)