import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import { routeNames } from './routeNames';

const AllRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeNames.LANDING_PAGE} element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path={routeNames.HOME} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AllRoutes;
