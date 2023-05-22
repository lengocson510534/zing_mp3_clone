import './App.css';
import { useSelector } from 'react-redux';
import { Album, Home, Login, Public, WeekRank, ZingChart } from './containers/public'
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import { useEffect } from 'react';
import * as actions from './store/actions'
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHome())
  }, [])

  const data = useSelector(state => state.app.homeData)
  console.log(data)

  return (
    <div className="App">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
          <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
          <Route path={path.WEEKRANK__TITLE_PID} element={<WeekRank />} />
          <Route path={path.ZING_CHART} element={<ZingChart />} />


          <Route path={path.STAR} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
