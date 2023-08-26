import './App.css'
import { AppContextProvider } from './page/Context';
import { 
      createBrowserRouter,
      createRoutesFromElements,
      Route,
      RouterProvider, 
 } from "react-router-dom";

import Layout, {loader as layoutLoader} from './components/Layout'
import Home, {loader as homeLoader} from './page/Home';    
import Shop, {loader as shopLoader} from './page/Shop';

import Featured, {loader as featuredLoader} from './page/Featured';
import Recommended, {loader as recommendedLoader} from './page/Recommended';
import Login from './page/Login';
import NotFound from './page/NotFound';

import FeaturedDetail, { loader as detailLoader } from './page/FeaturedDetail';

import SearchItem, {loader as searchLoader} from './page/SearchItem';
import AuthRequired from './components/AuthRequired';
import Error from './components/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/" 
      element={<Layout />} 
      loader={layoutLoader}
      errorElement={<Error />}
    >
      <Route element={<AuthRequired />}>
        <Route 
          index 
          element={<Home />} 
          loader={homeLoader}
        />
        <Route 
          path="search" 
          element={<SearchItem />}
          loader={searchLoader} 
        />
        <Route 
          path="search/:id" 
          element={<FeaturedDetail />}
          loader={detailLoader} 
        />
        <Route 
          path="shop" 
          element={<Shop />}
          loader={shopLoader} 
        />
        <Route 
          path="shop/:id" 
          element={<FeaturedDetail />}
          loader={detailLoader} 
        />
        <Route 
          path="featured" 
          element={<Featured />}
          loader={featuredLoader} 
        />
        <Route 
          path="featured/:id" 
          element={<FeaturedDetail />}
          loader={detailLoader} 
        />
        <Route 
          path="recommended" 
          element={<Recommended />}
          loader={recommendedLoader} 
        />
        <Route 
          path="recommended/:id" 
          element={<FeaturedDetail />}
          loader={detailLoader} 
        />
      </Route>
      <Route
        path="login"
        element={<Login />}
      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  )
}

export default App

