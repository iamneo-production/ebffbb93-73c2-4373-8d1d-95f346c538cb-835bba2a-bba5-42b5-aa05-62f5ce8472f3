import './App.css';
import { Box } from '@mui/material';
import defaultAvatar from './data/images/male-avatar.png'
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Workers from './components/Workers';
import Orders from './components/Orders';
import Footer from './components/Footer';
import store from './store/store';
import CartLoading from './components/CartLoading';
import CountUp from './components/CountUp';

const Home = React.lazy(() => import('./components/Home'))
const Login = React.lazy(() => import('./components/Login'))
const Signin = React.lazy(() => import('./components/Signin'))
const Products = React.lazy(() => import('./components/Products'))
const AdminLogin = React.lazy(() => import('./components/AdminLogin'))


function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!['/', '/log-in', '/sign-up', '/admin-login'].includes(location.pathname) && !store.getState().store.isLogin) {
      navigate('/')
    }
  }, [location.pathname, navigate])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar defaultAvatar={defaultAvatar} />
      <Box sx={{ width: '100%', height: `calc(100vh - ${ ['/', '/sign-up', '/log-in'].includes(location.pathname) ? '128px' : '64px' })`, mt: '64px' }}>
        <Routes>
          {/* Home page */}
          <Route path='/' element={
            <Suspense fallback={<CartLoading />}>
              <Home defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {/* Sign page */}
          <Route path='/sign-up' element={
            <Suspense fallback={<CartLoading />}>
              <Signin navigate={navigate} defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {/* login page */}
          <Route path='/log-in' element={
            <Suspense fallback={<CartLoading />}>
              <Login navigate={navigate} defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {/* Admin login */}
          <Route path='/admin-login' element={
            <Suspense fallback={<CartLoading /> }>
              <AdminLogin navigate={navigate} defaultAvatar={defaultAvatar} />
            </Suspense>
          } />

          {
            store.getState().store.isLogin && 
            <>
              {/* products page */}
              <Route path='/products' element={
                <Suspense fallback={<CartLoading />}>
                  <Products />
                </Suspense>
              } />

              {/* dashboard page */}
              <Route path='/dashboard' element={
                <Suspense fallback={<CartLoading />}>
                  <Dashboard />
                </Suspense>
              } />

              {/* orders page */}
              <Route path='/orders' element={
                <Suspense fallback={<CartLoading />}>
                  <Orders />
                </Suspense>
              } />

              {/* users page */}
              <Route path='/users' element={
                <Suspense fallback={<CartLoading />}>
                  <Users defaultAvatar={defaultAvatar} />
                </Suspense>
              } />

              {/* workers page */}
              <Route path='/workers' element={
                <Suspense fallback={<CartLoading />}>
                  <Workers defaultAvatar={defaultAvatar} />
                </Suspense>
              } />
            </>
          }
        </Routes>
      </Box>
      { ['/', '/sign-up', '/log-in'].includes(location.pathname) && <Footer /> }
    </Box>
  );
}

export default App;
