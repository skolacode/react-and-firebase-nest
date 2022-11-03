import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import HomeWithID from '../pages/HomeWithID';
import { routeNames } from './routeNames';
import { Login } from '../pages/Login';


const AllRoutes = () => {

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path={routeNames.LANDING_PAGE} element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path={routeNames.HOME} element={<Home />} />
          <Route path={routeNames.HOME_WITH_ID} element={<HomeWithID />} />
          <Route path={routeNames.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes;
