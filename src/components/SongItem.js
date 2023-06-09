import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({ thumbnail, title, artists, releaseDate, sid, order, percent, styled, avatarSize, styledArtist }) => {
  const dispatch = useDispatch()

  return (
    <div className={`w-full flex-auto items-center flex gap-[20px] rounded-md ${order ? 'justify-between text-white bg-[rgba(168,148,181,0.1)] hover:bg-[#ffffff4d] py-[10px] px-[15px]' : styled || `text-inherit p-[10px] hover:bg-main-200`}`}>
      <div className='flex items-center gap-[15px]'>
        {order &&
          <span
            className={`font-roboto text-transparent text-[32px] font-black ${order === 1 ? 'is-number-1' : order === 2 ? 'is-number-2' : 'is-number-3'}`}
          >
            {order}
          </span>}
        <img
          onClick={() => {
            dispatch(actions.setCurSongId(sid))
            dispatch(actions.play(true))
            dispatch(actions.setRecent({ thumbnail, title, sid, artists }))
          }}
          src={thumbnail} alt="thumbnail"
          className={`${avatarSize === 'sm' ? 'w-10 h-10' : 'w-[60px] h-[60px]'}  object-cover rounded-md cursor-pointer`}
        />
        <div className='flex flex-col mt-[3px] overflow-hidden'>
          <span
            className='font-medium leading-5 text-[14px] truncate'
          >
            {`${title?.length > 25 ? title?.slice(0, 25) + '...' : title}`}
          </span>
          <span className='flex items-center gap-[3px] whitespace-nowrap'>
            {artists?.map((item, index) => (
              <span
                key={item.id}
                className={`text-xs hover:text-main-highlight hover:underline hover:cursor-pointer tracking-wide leading-5 ${order ? 'text-[#a592b3]' : styledArtist || 'text-gray-69'} `}>
                {item.name}
                {index < artists.length - 1 ? ',' : ''}
              </span>
            ))
            }
          </span>
          {releaseDate &&
            <span className='text-gray-69 text-xs'>
              {moment(releaseDate * 1000).fromNow()}
            </span>
          }
        </div>
      </div>
      {percent && <span className='font-bold text-right flex items-center justify-end'>{`${percent}%`}</span>}
    </div>
  )
}

export default memo(SongItem)