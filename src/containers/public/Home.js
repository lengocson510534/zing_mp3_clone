import React from 'react'
import { useSelector } from 'react-redux'
import { Slider, Section, NewRelease, ChartSection } from '../../components'
import { Link } from 'react-router-dom'

const Home = () => {

  const { chill, artistFavorite, artistTrending, top100, albumhot, weekChart, seasonTheme } = useSelector(state => state.app)

  return (
    <div className='overflow-y-auto px-[59px] pb-10'>
      <Slider />
      <NewRelease />
      {Object.values(seasonTheme).length > 0 && <Section data={seasonTheme} />}
      {chill && <Section data={chill} />}
      <Section data={artistFavorite} />
      <Section data={artistTrending} />
      <ChartSection />
      <div className='flex items-center gap-7 mt-12'>
        {weekChart?.map(item => (
          <Link to={item?.link?.split('.')[0]}
            key={item.link}
          >
            <img src={item.cover} alt="img"
              className='w-full object-cover rounded-md'
            />
          </Link>
        ))}
      </div>
      <Section data={top100} isMode={2} />
      <Section data={albumhot} isMode={2} />
    </div>
  )
}

export default Home