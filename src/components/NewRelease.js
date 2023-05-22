import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SongItem from './SongItem'


const NewRelease = () => {
  const { newRelease } = useSelector(state => state.app)
  const [isActive, setIsActive] = useState(0)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (isActive === 0) {
      setSongs(newRelease?.items?.all?.slice(0, 12))
    }
    else if (isActive === 1) {
      setSongs(newRelease?.items?.vPop?.slice(0, 12))
    }
    else {
      setSongs(newRelease?.items?.others?.slice(0, 12))
    }
  }, [isActive, newRelease])

  return (
    <div className='mt-14'>
      <h3 className='text-[20px] font-bold leading-[1.5]'>
        {newRelease?.title}
      </h3>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-[15px] my-5'>
          <button
            className={`${isActive === 0 ? 'bg-main-highlight text-white' : 'bg-transparent'} text-xs rounded-[100px] py-1 px-6 border border-gray-c2 border-solid`}
            onClick={() => setIsActive(0)}
          >
            TẤT CẢ
          </button>
          <button
            className={`${isActive === 1 ? 'bg-main-highlight text-white' : 'bg-transparent'} text-xs rounded-[100px] py-1 px-6 border border-gray-c2 border-solid`}
            onClick={() => setIsActive(1)}
          >
            VIỆT NAM
          </button>
          <button
            className={`${isActive === 2 ? 'bg-main-highlight text-white' : 'bg-transparent'} text-xs rounded-[100px] py-1 px-6 border border-gray-c2 border-solid`}
            onClick={() => setIsActive(2)}
          >
            QUỐC TẾ
          </button>
        </div>
        <span className='text-xs font-medium text-gray-69 uppercase leading-[1.5] cursor-pointer'>
          TẤT CẢ
        </span>
      </div>
      <div className='flex flex-wrap w-full gap-x-[10px]'>
        {songs?.map(item => (
          <div className='w-[30%] flex-auto' key={item.encodeId}>
            <SongItem
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artists}
              releaseDate={item.releaseDate}
              sid={item.encodeId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewRelease