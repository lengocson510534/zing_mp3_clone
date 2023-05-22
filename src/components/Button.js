import React, { memo } from 'react'

const Button = ({ text, style }) => {
    return (
        <button
            type='button'
            className={style ? style : 'bg-transparent text-xs border border-gray-c2 rounded-[100px] py-1 px-6'}
        >
            {text}
        </button>
    )
}

export default memo(Button)