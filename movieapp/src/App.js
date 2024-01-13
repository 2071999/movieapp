import WCBoard from "./Pages/WCBoard/WCBoard";
import './App.scss';
import Registration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import Layout from './Pages/Layout/Layout';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import NowPlayingMv from "./Pages/NowPlayingMv/NowPlayingMv";
import PopularMv from './Pages/PopularMv/PopularMv';
import TopRatingMv from "./Pages/TopRatingMv/TopRatingMv";
import SearchMv from './Pages/SearchMv/SearchMv';
import NowPlayingMvDetail from "./Pages/NowPlayingMvDetail/NowPlayingMvDetail";
import PopularMvDetail from './Pages/PopularMvDetail/PopularMvDetail';
import TopRatingMvDetail from "./Pages/TopRatingMvDetail/TopRatingMvDetail";
import OuterMvDetail from "./Pages/OuterMvDetail/OuterMvDetail";
import SearchMvDetail from "./Pages/SearchMvDetail/SearchMvDetail";
import AddFavMv from "./Pages/AddFavMv/AddFavMv";
import MvDetailPage from "./Pages/MvDetailPage/MvDetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path='/wcBoard' element={<WCBoard/>} />
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/outerMvDetail/:id' element={<OuterMvDetail/>} />
        
          <Route path='/' exact element={<Layout/>} >
            <Route index element={<Home/>} />
            <Route path='/nowPlaying' element={<NowPlayingMv/>} />
            <Route path='/popular' element={<PopularMv/>} />
            <Route path='/topRated' element={<TopRatingMv/>} />
            <Route path='/addFav' element={<AddFavMv/>} />
            {/* <Route path='/nowPlayingDetail/:id' element={<NowPlayingMvDetail/>} />
            <Route path='/popularDetail/:id' element={<PopularMvDetail/>} />
            <Route path='/topRatedDetail/:id' element={<TopRatingMvDetail/>} /> */}
            <Route path='/mvDetailPage/:id' element={<MvDetailPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>        
    </div>
  );
}

export default App;
