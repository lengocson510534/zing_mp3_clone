import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArrSlider } from '../utils/fn'

import * as actions from '../store/actions'


const Slider = () => {

    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 2

        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1)
            for (let i = 0; i < sliderEls.length; i++) {
                // delete className css
                sliderEls[i].classList.remove('animate-slide-right', 'order-last', 'z-20')
                sliderEls[i].classList.remove('animate-slide-left', 'order-first', 'z-10')
                sliderEls[i].classList.remove('animate-slide-left2', 'order-2', 'z-10')

                if (list.some(item => item === i)) {
                    sliderEls[i].style.cssText = `display: block`
                }
                else {
                    sliderEls[i].style.cssText = 'display: none'
                }
            }
            list.forEach(item => {
                if (item === max) {
                    sliderEls[item]?.classList.add('animate-slide-right', 'order-last', 'z-20')
                } else if (item === min) {
                    sliderEls[item]?.classList.add('animate-slide-left', 'order-first', 'z-10')
                } else {
                    sliderEls[item]?.classList.add('animate-slide-left2', 'order-2', 'z-10')
                }
            })

            min = (min === sliderEls.length - 1) ? 0 : min + 1
            max = (max === sliderEls.length - 1) ? 0 : max + 1

        }, 3000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))
        }
        else if (item?.type === 4) {
            console.log(item)
        }
    }

    return (
        <div className='flex gap-8 w-full overflow-hidden pt-8'>
            {banner?.map((item, index) => (
                <img
                    src={item.banner}
                    alt="img"
                    key={item.encodeId}
                    onClick={() => handleClickBanner(item)}
                    className={`slider-item w-[30%] cursor-pointer object-cover flex-1 rounded-lg ${index <= 2 ? 'block' : 'hidden'}`}
                />
            ))}
        </div>
    )
}

export default Slider