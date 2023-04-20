import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as apis from '../apis'
import * as actions from '../store/actions'
import icons from '../utils/icons'

const { AiOutlineHeart, HiOutlineDotsHorizontal, CiRepeat, BiSkipNext, BiSkipPrevious, TfiControlShuffle, BsFillPlayFill, BsPause } = icons

const Player = ({ setActiveSidebarRight, activeSidebarRight }) => {

    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [source, setSource] = useState(null)

    console.log(isPlaying)
    const audioEl = new Audio(source)
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                setSource(res2.data.data['128'])
            }
            console.log('res1', res1)
            console.log('res2', res2)
        }
        fetchDetailSong()
    }, [curSongId])

    // useEffect(() => {
    //     audioEl.play()
    // }, [audioEl])

    const handleTogglePlayMusic = () => {
        dispatch(actions.play(!isPlaying))
    }

    return (
        <div className='bg-main-400 h-full px-5 flex items-center'>
            <div className='flex items-center gap-3 w-[30%] flex-auto'>
                <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-[4px]' />
                <div>
                    <span className='text-sm text-[#32323d] font-medium'>
                        {songInfo?.title}
                    </span>
                    <br />
                    <span className='text-xs text-[#696969]'>
                        {songInfo?.artistsNames}
                    </span>
                </div>
                <div className='flex gap-[20px] ml-[32px] text-[#32323d]'>
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <HiOutlineDotsHorizontal size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto items-center text-center flex flex-col'>
                <div className='flex gap-8 items-center justify-center'>
                    <span title='Bật phát ngẫu nhiên' className='cursor-pointer'><TfiControlShuffle size={18} /></span>
                    <span className='cursor-pointer'><BiSkipPrevious size={30} /></span>
                    <span
                        className='w-[40px] h-[40px] border rounded-full flex items-center justify-center border-[#32323d] hover:text-main-highlight hover:border-main-highlight cursor-pointer'
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? <BsPause size={30} /> : <BsFillPlayFill size={30} />}
                    </span>
                    <span className='cursor-pointer'><BiSkipNext size={32} /></span>
                    <span title='Bật phát lại tất cả' className='cursor-pointer'><CiRepeat size={20} /></span>
                </div>
                <div>
                    progress bar
                </div>
            </div>
            <div
                className='w-[30%] flex-auto'
                onClick={() => setActiveSidebarRight(!activeSidebarRight)}>
                open
            </div>
        </div>
    )
}

export default Player