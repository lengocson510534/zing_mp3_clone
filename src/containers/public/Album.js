import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import icons from '../../utils/icons'
import * as apis from '../../apis'
import { ListSong } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import * as actions from '../../store/actions'
import { useDispatch } from 'react-redux'

const { BsFillPlayFill, AiOutlineHeart, HiOutlineDotsHorizontal } = icons

const Album = () => {

    const { pid } = useParams()
    const [playlistData, setPlaylistData] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDetailAlbum = async () => {
            const response = await apis.apiGetDetailPlaylist(pid)
            if (response.data.err === 0) {
                setPlaylistData(response.data?.data)
                dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
            }
            console.log(response)
        }
        fetchDetailAlbum()
    }, [pid])

    return (
        <Scrollbars style={{ width: '100%', height: '80%' }}>
            <div className='flex gap-8 w-full px-[59px] mb-[150px]'>
                <div className='flex-none w-[25%] flex flex-col items-center text-center'>
                    <img
                        src={playlistData?.thumbnailM}
                        alt="thumbnail"
                        className='rounded-md shadow-2xl'
                    />
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
        </Scrollbars>
    )
}

export default Album