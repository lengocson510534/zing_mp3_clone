import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import icons from '../utils/icons'
import * as actions from '../store/actions'

const { CiMusicNote1 } = icons

const ListSongItem = ({ songData, streamingStatus }) => {
    const dispatch = useDispatch()

    return (
        <div
            className='flex items-center gap-2 py-[10px] border-b border-[#C3CECE] hover:bg-main-200 px-[10px] rounded'
            onClick={() => {
                if (streamingStatus === 1) {
                    dispatch(actions.setCurSongId(songData?.encodeId))
                    dispatch(actions.play(true))
                }
            }}
        >
            <div className='flex items-center gap-[10px] w-[50%]'>
                <span>
                    <CiMusicNote1 />
                </span>
                <img
                    src={songData?.thumbnail} alt="thumbnail"
                    className='w-10 h-10 rounded-md object-cover'
                />
                <span className='w-full'>
                    <span className={`${streamingStatus === 2 ? 'text-[#878B90]' : 'text-inherit'} text-sm leading-[1.3] font-medium flex items-center gap-3`}>
                        {songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)}...` : songData?.title}
                        <span className={`${streamingStatus === 2 ? 'block' : 'hidden'} font-medium bg-[#f8e71c] text-[10px] px-[4px] py-[2px] rounded-md`}>
                            VIP
                        </span>
                    </span>
                    <br />
                    <span className={`${streamingStatus === 2 ? 'text-[#878B90]' : 'text-gray-69'} cursor-pointer text-xs leading-[1.33] hover:text-main-highlight hover:underline `}>
                        {songData?.artistsNames}
                    </span>
                </span>
            </div>
            <div className={`${streamingStatus === 2 ? 'text-[#878B90]' : 'text-gray-69'} flex justify-start items-center w-[40%] text-xs leading-[1.5]`}>
                {songData?.album?.title?.length > 45 ? `${songData?.album?.title?.slice(0, 30)}...` : songData?.album?.title}
            </div>
            <div className=' flex justify-end items-center w-[10%] text-xs text-gray-69 leading-[1.5]'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(ListSongItem)