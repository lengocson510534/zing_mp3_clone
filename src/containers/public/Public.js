import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Player, SidebarLeft } from '../../components'
import SidebarRight from '../../components/SidebarRight'

const Public = () => {

    const [activeSidebarRight, setActiveSidebarRight] = useState(false)

    return (
        <div className='w-full h-screen flex flex-col bg-main-300 relative'>
            <div className='w-full h-full flex'>
                <div className='w-[240px] min-h-screen flex-none'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto'>
                    <div className='h-[70px] px-[59px] flex items-center mb-8'>
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className={`${activeSidebarRight ? 'flex' : 'hidden'} w-[330px] flex-none bg-main-300 animate-slide-left shadow-xl`}>
                    <SidebarRight />
                </div>
            </div>
            <div className='flex-none w-full h-[90px] bottom-0 fixed z-[100]'>
                <Player
                    activeSidebarRight={activeSidebarRight}
                    setActiveSidebarRight={setActiveSidebarRight}
                />
            </div>
        </div>
    )
}

export default Public