import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import icons from '../utils/icons'
import SongItem from './SongItem'
import { apiGetDetailPlaylist } from '../apis'
import Scrollbars from 'react-custom-scrollbars-2'

const { HiOutlineDotsHorizontal } = icons

const SidebarRight = () => {
    const [isRecent, setIsRecent] = useState(false)
    const [playlist, setPlaylist] = useState()
    const [titlePlaylist, setTitlePlaylist] = useState(null)
    const { curSongData, curAlbumId, isPlaying } = useSelector(state => state.music)

    const navigate = useNavigate()

    const handleClickPlaylist = () => {
        const albumPath = curSongData?.album?.link.split('.')[0]
        navigate(albumPath)
    }

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apiGetDetailPlaylist(curAlbumId)
            if (response.data?.err === 0) {
                setPlaylist(response.data.data?.song?.items)
                setTitlePlaylist(response.data.data?.title)
            }
        }
        if (curAlbumId && isPlaying) fetchDetailPlaylist()
    }, [curAlbumId, isPlaying])

    return (
        <div className='text-xs w-full overflow-hidden shadow-menu-right'>
            <div className='h-[70px] py-[14px] px-2 flex items-center justify-between'>
                <div className='flex items-center justify-between p-[3px] rounded-full bg-grey-4d'>
                    <span
                        className={`py-[5px] rounded-full cursor-pointer px-[16px] font-medium ${!isRecent && 'bg-[#E7ECEC] shadow-btn text-main-highlight'}`}
                        onClick={() => isRecent === true && setIsRecent(false)}
                    >
                        Danh sách phát
                    </span>
                    <span
                        className={`py-[5px] rounded-full cursor-pointer px-[16px] font-medium ${isRecent && 'bg-[#E7ECEC] shadow-btn text-main-highlight'}`}
                        onClick={() => isRecent === false && setIsRecent(true)}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <div className='p-2 bg-grey-4d rounded-full flex items-center justify-center hover:bg-[#D4DCDC] cursor-pointer'>
                    <HiOutlineDotsHorizontal size={16} />
                </div>
            </div>
            <div className='px-2 w-full h-full pb-[100px]'>
                <Scrollbars autoHide className='scrollbar' style={{ width: '100%', height: '100%' }}>
                    <SongItem
                        thumbnail={curSongData?.thumbnail}
                        title={curSongData?.title}
                        artists={curSongData?.artists}
                        sid={curSongData?.encodeId}
                        styled={"h-[56px] text-white p-[8px] bg-main-highlight"}
                        avatarSize='sm'
                        styledArtist='text-[#ffffff99] hover:text-[#ffffff99]'
                    />
                    <div className='pt-[15px] px-2 pb-[5px]'>
                        <h3 className='text-sm font-bold'>Tiếp theo</h3>
                        <span className='text-[#14141466] text-sm'>Từ playlist</span>
                        <span
                            className='text-main-highlight text-sm font-medium ml-[5px] cursor-pointer'
                            onClick={handleClickPlaylist}
                        >
                            {titlePlaylist !== null && titlePlaylist}
                        </span>
                    </div>
                    <div>
                        {playlist?.map(item => (
                            <SongItem
                                key={item?.encodeId}
                                thumbnail={item?.thumbnail}
                                title={item?.title}
                                artists={item?.artists}
                                sid={item?.encodeId}
                                avatarSize='sm'
                            />
                        ))}
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
}

export default SidebarRight