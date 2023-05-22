import React, { memo, useState, useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import icons from '../utils/icons'
import { useSelector } from 'react-redux'
import { SongItem } from './index'
import { isEqual } from 'lodash'
import { Link } from 'react-router-dom'
import path from '../utils/path'


const { BsFillPlayFill } = icons
const ChartSection = () => {

  const chartRef = useRef()
  const { chart, rank } = useSelector(state => state.app)
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState(null)
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0
  })
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRadio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: 'gray', drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] }
      },
      x: {
        ticks: { color: '#948E96' },
        grid: { color: 'transparent' }
      }
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
            return
          }
          const counters = []
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0).map(item => item.counter),
              encodeId: Object.keys(chart?.items)[i]
            })
          }
          const result = counters.find(item => item.data.some(n => n === +tooltip.body[0]?.lines[0]?.replace('.', '')))
          setSelected(result?.encodeId)
          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          }
          if (!isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
        }
      }
    },
    hover: {
      mode: 'dataset',
      intersect: false,
    }
  }

  useEffect(() => {
    const labels = chart?.times?.filter(item => + item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
    const datasets = []
    if (Object.values(chart).length > 0) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => + item.hour % 2 === 0)?.map(item => item.counter),
          borderColor: i === 0 ? '#4A90E2' : i === 1 ? '#36A694' : '#C24656',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: i === 0 ? '#4A90E2' : i === 1 ? '#36A694' : '#C24656',
          pointHoverRadius: 7,
          pointBorderColor: 'white',
          pointHoverBorderWidth: 2
        })
      }
    }
    setData({ labels, datasets })
  }, [chart])

  return (
    <div className='mt-14 bg-purple-42 p-[20px] rounded'>
      <div className='flex items-center gap-4 mb-[20px]'>
        <Link to={path.ZING_CHART}>
          <h3 className='text-[28px] font-bold text-gradient cursor-pointer'>#zingchart</h3>
        </Link>
        <span className='w-[23px] h-[23px] rounded-full bg-white flex items-center justify-center cursor-pointer'>
          <BsFillPlayFill size={18} className='ml-[2px]' />
        </span>
      </div>
      <div className='text-white flex h-full'>
        <div className='w-full flex-4 flex flex-col gap-3'>
          {rank?.filter((item, index) => index < 3)?.map((item, index) => (
            <SongItem
              thumbnail={item.thumbnail}
              title={item.title}
              artists={item.artists}
              sid={item.encodeId}
              order={index + 1}
              percent={Math.round(+item.score * 100 / +chart?.totalScore)}
            />
          ))}
          <Link to={path.ZING_CHART} className='w-fit mx-auto mt-[5px] text-sm py-[5px] px-[25px] border rounded-full border-solid border-white hover:bg-[rgba(168,148,181,0.1)]'>
            Xem thêm
          </Link>
        </div>
        <div className='flex-6 pl-[14px] relative'>
          {Object.values(chart).length > 0 && data?.labels && <Line ref={chartRef} data={data} options={options} />}
          <div style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}>
            <SongItem
              thumbnail={rank?.find(item => item.encodeId === selected)?.thumbnail}
              title={rank?.find(item => item.encodeId === selected)?.title}
              artists={rank?.find(item => item.encodeId === selected)?.artists}
              sid={rank?.find(item => item.encodeId === selected)?.encodeId}
              styled={'bg-white text-gray-32 p-[10px]'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartSection)