import icons from "./icons"

const { MdOutlineLibraryMusic, TbChartArcs, HiOutlineChartPie, MdOutlineEventNote } = icons

export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Thư Viện',
        icon: <MdOutlineLibraryMusic size={20} />
    },
    {
        path: '',
        text: 'Khám Phá',
        icon: <TbChartArcs size={20} />
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <HiOutlineChartPie size={20} />
    },
    {
        path: 'follow',
        text: 'Theo Dõi',
        icon: <MdOutlineEventNote size={20} />
    }
]