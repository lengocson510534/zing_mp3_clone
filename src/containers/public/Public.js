import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Player, SidebarLeft } from '../../components'
import SidebarRight from '../../components/SidebarRight'
import Scrollbars from 'react-custom-scrollbars-2'

const Public = () => {

    const [activeSidebarRight, setActiveSidebarRight] = useState(false)

    return (
        <div className='w-full h-screen flex flex-col bg-main-300 relative'>
            <div className='w-full h-full flex'>
                <div className='w-[240px] min-h-screen flex-none'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto flex-col flex mb-[90px]'>
                    <div className='h-[70px] px-[59px] flex-none flex items-center'>
                        <Header />
                    </div>
                    <div className='flex-auto w-full'>
                        <Scrollbars autoHide className='scrollbar' style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                <div className={`${activeSidebarRight ? 'flex' : 'hidden'} absolute z-[99] right-0 top-0 bottom-0 w-[330px] flex-none bg-main-300 animate-slide-left shadow-xl h-screen`}>
                    <SidebarRight />
                </div>
            </div>
            <div className='flex-none w-full h-[90px] bottom-0 fixed z-[100]'>
                <Player
                    setActiveSidebarRight={setActiveSidebarRight}
                />
            </div>
        </div>
    )
}

export default Public