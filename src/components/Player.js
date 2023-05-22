import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import * as apis from '../apis'
import * as actions from '../store/actions'
import icons from '../utils/icons'
import { LoadingIconPlaySong } from './'

const { AiOutlineHeart, HiOutlineDotsHorizontal, CiRepeat, BiSkipNext, BiSkipPrevious, TfiControlShuffle, BsFillPlayFill, BsPause, TbRepeatOnce, RiPlayListLine, CiVolumeHigh, CiVolumeMute, GiMicrophone } = icons
var intervalId
const Player = ({ setActiveSidebarRight }) => {

    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [audio, setAudio] = useState(new Audio())
    const [curSecond, setCurSecond] = useState(0)
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const [isLoadingSource, setIsLoadingSource] = useState(false)
    const [volume, setVolume] = useState(100)
    // const [mute, setMute] = useState(false)

    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()

    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadingSource(true)
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            setIsLoadingSource(false)
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
                dispatch(actions.setCurSongData(res1.data.data))
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            }
            if (res2?.data?.err === -1110) {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                setCurSecond(0)
                thumbRef.current.style.cssText = `right: 100%`
            }
            else {
                console.log(res2?.data?.msg)
            }
        }
        fetchDetailSong()
    }, [curSongId])

    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.load()

        if (isPlaying && thumbRef.current) {
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSecond(Math.round(audio.currentTime))
            }, 200)
        }
    }, [audio])

    useEffect(() => {
        const handleEnded = () => {
            if (repeatMode) {
                repeatMode === 2 ? handleRepeatOne() : handleNextSong()
            }
            else if (isShuffle) {
                handleShuffle()
            }
            else {
                audio.pause()
                dispatch(actions.play(false))
            }
        }
        audio.addEventListener('ended', handleEnded)
        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audio, isShuffle, repeatMode])

    useEffect(() => {
        audio.volume = volume / 100
    }, [volume])

    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        }
        else {
            audio.play()
            dispatch(actions.play(true))
        }
    }

    const handleClickProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = percent * songInfo.duration / 100
        setCurSecond(Math.round(percent * songInfo.duration / 100))
    }

    const handleNextSong = () => {
        const currentSongIndex = songs?.findIndex((item) => item.encodeId === curSongId)
        dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
        dispatch(actions.play(true))
    }

    const handleRepeatOne = () => {
        audio.play()
    }

    const handlePrevSong = () => {
        const currentSongIndex = songs?.findIndex((item) => item.encodeId === curSongId)
        dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
        dispatch(actions.play(true))
    }

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
        dispatch(actions.play(true))
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
            <div className='w-[40%] flex-auto justify-center items-center text-center flex flex-col gap-4'>
                <div className='flex gap-8 items-center justify-center'>
                    <span
                        title='Bật phát ngẫu nhiên'
                        className={`${isShuffle ? 'text-main-highlight' : 'text-inherit'} cursor-pointer`}
                        onClick={() => setIsShuffle(prev => !prev)}
                    >
                        <TfiControlShuffle size={18} /></span>
                    <span
                        onClick={handlePrevSong}
                        className='cursor-pointer'
                    >
                        <BiSkipPrevious size={30} />
                    </span>
                    <span
                        className='w-[40px] h-[40px] border rounded-full flex items-center justify-center border-[#32323d] hover:text-main-highlight hover:border-main-highlight cursor-pointer'
                        onClick={handleTogglePlayMusic}
                    >
                        {isLoadingSource ? <LoadingIconPlaySong /> :
                            isPlaying ? <BsPause size={30} /> : <BsFillPlayFill size={30} className='ml-[3px]' />}
                    </span>
                    <span
                        title='Bài hát tiếp theo'
                        className='cursor-pointer'
                        onClick={handleNextSong}
                    >
                        <BiSkipNext size={32} />
                    </span>
                    <span
                        title='Bật phát lại tất cả'
                        className={`${repeatMode !== 0 ? 'text-main-highlight' : 'text-inherit'} cursor-pointer`}
                        onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
                    >
                        {repeatMode === 2 ?
                            <TbRepeatOnce size={20} /> :
                            <CiRepeat size={20} />
                        }
                    </span>
                </div>
                <div className='w-full flex items-center justify-center gap-3'>
                    <span className='text-xs font-medium'>
                        {moment.utc(curSecond * 1000).format('mm:ss')}
                    </span>
                    <div
                        ref={trackRef}
                        className='hover:h-[8px] hover:cursor-pointer w-[75%] rounded-l-full rounded-r-full h-[3px] relative bg-gray-c2'
                        onClick={handleClickProgressBar}
                    >
                        <div ref={thumbRef} className='absolute top-0 bottom-0 left-0  bg-main-highlight rounded-l-full rounded-r-full'></div>
                    </div>
                    <span className='text-xs font-medium'>
                        {moment.utc(songInfo?.duration * 1000).format('mm:ss')}
                    </span>
                </div>
            </div>
            <div
                className='w-[30%] flex-auto flex items-center justify-end gap-[20px]'
            >
                <div className='py-[6px] border-r border-[rgba(0,0,0,0.05)] flex items-center gap-[20px]'>
                    <span
                        className='border border-gray-32 text-gray-32 font-bold text-[9px] py-[2px] px-[3px] rounded-md hover:cursor-pointer'
                    >
                        MV
                    </span>
                    <span className='hover:cursor-pointer'>
                        <GiMicrophone size={18} />
                    </span>
                    <div
                        className='hover:cursor-pointer'
                        onClick={() => setVolume(prev => prev === 0 ? 50 : 0)}
                    >
                        {+volume > 0 ? <CiVolumeHigh size={20} /> :
                            <CiVolumeMute size={20} />}
                    </div>
                    <span className='w-[90px] flex items-center justify-center'>
                        <input
                            type="range"
                            step={1}
                            min={0}
                            max={100}
                            // defaultValue={volume}
                            value={volume}
                            className='input-volume mr-[20px] text-main-highlight'
                            onChange={(e) => setVolume(e.target.value)}
                        />
                    </span>
                </div>
                <div
                    title='Danh sách phát'
                    className='hover:cursor-pointer bg-main-300 px-2 py-2 rounded'
                    onClick={() => setActiveSidebarRight(prev => !prev)}
                >
                    <RiPlayListLine size={18} />
                </div>
            </div>
        </div>
    )
}

export default Player