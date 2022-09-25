import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import HomeWithID from '../pages/HomeWithID';
import { routeNames } from './routeNames';


const AllRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeNames.LANDING_PAGE} element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path={routeNames.HOME} element={<Home />} />
          <Route path={routeNames.HOME_WITH_ID} element={<HomeWithID />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes;
