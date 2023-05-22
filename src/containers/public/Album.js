import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import moment from 'moment'
import icons from '../../utils/icons'
import * as apis from '../../apis'
import { ListSong } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'


const { BsFillPlayFill, AiOutlineHeart, HiOutlineDotsHorizontal, iconPlaying } = icons

const Album = () => {

  const { pid } = useParams()
  const dispatch = useDispatch()
  const location = useLocation()

  const [playlistData, setPlaylistData] = useState(null)
  const [loading, setLoading] = useState(true)

  const { isPlaying } = useSelector(state => state.music)

  useEffect(() => {
    const fetchDetailAlbum = async () => {
      const response = await apis.apiGetDetailPlaylist(pid)
      setLoading(false)
      if (response.data.err === 0) {
        setPlaylistData(response.data?.data)
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
      }
      console.log(response)
    }
    fetchDetailAlbum()
  }, [pid])

  useEffect(() => {
    if (location.state?.playAlbum) {
      console.log("vao day 11")
      const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
      dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId))
      dispatch(actions.play(true))
    }
  }, [playlistData])

  return (
    <Scrollbars style={{ width: '100%', height: '100%' }}>
      {loading ? <Loading /> :
        <div className='flex gap-8 w-full px-[59px] pt-8 pb-10'>
          <div className='flex-none w-[25%] flex flex-col items-center text-center'>
            <div className='relative w-full overflow-hidden rounded-md cursor-pointer'>
              <img
                src={playlistData?.thumbnailM}
                alt="thumbnail"
                className='rounded-md shadow-2xl hover:scale-110 ease-linear duration-500'
              />
              {isPlaying &&
                <div className='absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] flex items-center justify-center border border-white w-[45px] h-[45px] rounded-full'>
                  <img src={iconPlaying} alt="icon" className='w-5' />
                </div>
              }
            </div>

            <h3 className='text-[20px] font-bold leading-[1.5] mt-3'>
              {playlistData?.title}
            </h3>
            <span className='text-gray-69 text-xs mt-1'>
              Cập nhật: {moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}
            </span>
            <span className='text-gray-69 text-xs mt-1'>
              {playlistData?.artistsNames}
            </span>
            <span className='text-gray-69 text-xs mt-1'>
              {`${Math.round(playlistData?.like / 1000)}K người yêu thích`}
            </span>
            <button className='flex items-center justify-center gap-[5px] px-6 py-[9px] bg-main-highlight text-white rounded-full my-4'>
              <BsFillPlayFill size={20} />
              <span className='text-sm'>PHÁT NGẪU NHIÊN</span>
            </button>
            <div className='flex items-center justify-center gap-[10px]'>
              <span className='w-[35px] h-[35px] cursor-pointer rounded-full bg-main-200 flex items-center justify-center hover:bg-gray-300'>
                <AiOutlineHeart />
              </span>
              <span className='w-[35px] h-[35px] cursor-pointer rounded-full bg-main-200 flex items-center justify-center hover:bg-gray-300'>
                <HiOutlineDotsHorizontal />
              </span>
            </div>
          </div>
          <div className='flex-auto'>
            <span className='text-sm text-gray-69 mb-[10px]'>
              Lời tựa <span className='text-gray-32'>{playlistData?.sortDescription}</span>
            </span>
            <ListSong
              total={playlistData?.song.total}
              totalDuration={playlistData?.song.totalDuration}
            />
          </div>
        </div>
      }
    </Scrollbars>
  )
}

const Loading = () => {
  return (
    <div className=' animate-pulse flex gap-8 w-full px-[59px] pt-8 pb-10'>
      <div className='flex-none w-[25%] flex flex-col items-center text-center'>
        <div className='w-[250px] h-[250px] relative bg-[#E5E2E5] overflow-hidden rounded-md cursor-pointer'>
        </div>
        <h3 className='w-[80%] h-[20px] rounded-full bg-[#E5E2E5] mt-3'>
        </h3>
        <span className='bg-[#E5E2E5] w-[80%] rounded-full h-[10px] text-xs mt-1'>
        </span>
        <span className='bg-[#E5E2E5] w-[80%] h-[10px] mt-1'>
        </span>
        <span className='bg-[#E5E2E5] w-[80%] h-[10px] mt-1'>

        </span>
        <button className='flex items-center justify-center gap-[5px] px-6 py-[9px] bg-[#E5E2E5] text-white rounded-full w-[30%] my-4'>

        </button>
        <div className='flex items-center justify-center gap-[10px]'>
          <span className='w-[35px] h-[35px] cursor-pointer rounded-full bg-main-200 flex items-center justify-center hover:bg-gray-300'>
          </span>
          <span className='w-[35px] h-[35px] cursor-pointer rounded-full bg-main-200 flex items-center justify-center hover:bg-gray-300'>
          </span>
        </div>
      </div>
      <div className='flex-auto'>
        <p className='text-sm w-[80%] bg-[#E5E2E5] mb-[10px] h-[20px]'>
        </p>
        <div className='w-full flex flex-col gap-[10px]'>
          <div className='w-[100%]'>
            <p className='h-[20px] w-full bg-[#E5E2E5] mb-[10px]'>
            </p>
          </div>
          <div className='flex w-full gap-[10px]'>
            <p className='w-[40px] h-[40px] flex-none bg-[#E5E2E5]'>
            </p>
            <p className='flex flex-col gap-[4px] w-full'>
              <p className='h-[17px]  bg-[#E5E2E5] w-[300px]'>
              </p>
              <p className='h-[15px]  bg-[#E5E2E5] w-[100px]'>
              </p>
            </p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[250px]'></p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[100px]'></p>
          </div>
          <div className='flex w-full gap-[10px]'>
            <p className='w-[40px] h-[40px] flex-none bg-[#E5E2E5]'>
            </p>
            <p className='flex flex-col gap-[4px] w-full'>
              <p className='h-[17px]  bg-[#E5E2E5] w-[300px]'>
              </p>
              <p className='h-[15px]  bg-[#E5E2E5] w-[100px]'>
              </p>
            </p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[250px]'></p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[100px]'></p>
          </div>
          <div className='flex w-full gap-[10px]'>
            <p className='w-[40px] h-[40px] flex-none bg-[#E5E2E5]'>
            </p>
            <p className='flex flex-col gap-[4px] w-full'>
              <p className='h-[17px]  bg-[#E5E2E5] w-[300px]'>
              </p>
              <p className='h-[15px]  bg-[#E5E2E5] w-[100px]'>
              </p>
            </p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[250px]'></p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[100px]'></p>
          </div>
          <div className='flex w-full gap-[10px]'>
            <p className='w-[40px] h-[40px] flex-none bg-[#E5E2E5]'>
            </p>
            <p className='flex flex-col gap-[4px] w-full'>
              <p className='h-[17px]  bg-[#E5E2E5] w-[300px]'>
              </p>
              <p className='h-[15px]  bg-[#E5E2E5] w-[100px]'>
              </p>
            </p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[250px]'></p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[100px]'></p>
          </div>
          <div className='flex w-full gap-[10px]'>
            <p className='w-[40px] h-[40px] flex-none bg-[#E5E2E5]'>
            </p>
            <p className='flex flex-col gap-[4px] w-full'>
              <p className='h-[17px]  bg-[#E5E2E5] w-[300px]'>
              </p>
              <p className='h-[15px]  bg-[#E5E2E5] w-[100px]'>
              </p>
            </p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[250px]'></p>
            <p className='h-[20px]  bg-[#E5E2E5] w-[100px]'></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Album