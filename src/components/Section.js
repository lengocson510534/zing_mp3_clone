import React, { memo } from 'react'
import WrapImage from './WrapImage'

const Section = ({ data, isMode }) => {

    return (
        <div className='mt-14 flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold leading-[1.5]'>{data?.title}</h3>
                <span className='text-xs font-medium text-gray-69 uppercase leading-[1.5] cursor-pointer'>Tất cả</span>
            </div>
            <div className='flex justify-between gap-[28px]'>
                {data?.items !== undefined && isMode !== 2 ? (data?.items?.slice(0, 5)).map(item => (
                    <WrapImage
                        key={item.encodeId}
                        path={item.thumbnailM}
                        sortDesc={item.sortDescription}
                        link={item.link?.split('.')[0]}
                    />
                )) :
                    data.items !== undefined && (data?.items?.slice(0, 5)).map(item => (
                        <WrapImage
                            key={item.encodeId}
                            path={item.thumbnailM}
                            title={item.title}
                            link={item.link?.split('.')[0]}
                            artists={item.artists}
                        />
                    ))}
            </div>
        </div>
    )
}

export default memo(Section)