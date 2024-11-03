//@ts-nocheck
import { lazy, Suspense, useEffect } from 'react';

import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRotues from './components/auth/protectedRoutes';
import { useAppSelector } from './redux/store';
import AppLayout from './layout/Applayout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from './redux/slices/userSlice';
import Loading from './loaders/Loading';
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const FullViewPost = lazy(() => import("./pages/Post"));

function App() {

  const {user} = useAppSelector(state => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const background = location.state && location.state.background;


  useEffect(() => {
    axios.get("http://localhost:4000/api/users/p/get",{withCredentials : true}).then(({data}) => {
      dispatch(setUser(data.data))
    });
  },[dispatch])
 


  return (

    
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route element={<ProtectedRotues  user={user}/>}>
            <Route path='/' element={<Home/>}/>
            <Route path="/:userId" element={<UserProfile/>}/>
            {
              background && (
                <Route path="/p/:postId" element={<FullViewPost/>}/>
              )
            }
          </Route>
          <Route  path='/login' element={
            <ProtectedRotues redirect='/' user={!user}>
              <Auth/>
            </ProtectedRotues>
          }/>
        </Routes>
      </Suspense>

  )
}

export default App
