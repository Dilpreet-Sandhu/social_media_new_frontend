//@ts-nocheck
import { lazy, Suspense, useEffect } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRotues from "./components/auth/protectedRoutes";
import { useAppSelector } from "./redux/store";
import AppLayout from "./layout/Applayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "./redux/slices/userSlice";
import Loading from "./loaders/Loading";
import Stories from "./pages/Stories";

const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const FullViewPost = lazy(() => import("./pages/Post"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const Reels = lazy(() => import("./pages/Reel"));
const Messages = lazy(() => import("./pages/Messages"))

function App() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/p/get", { withCredentials: true })
      .then(({ data }) => {
        dispatch(setUser(data.data));
      });
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<ProtectedRotues user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/:userId" element={<UserProfile />} />

          <Route path="/p/:postId" element={<FullViewPost />} />
          <Route path={"/explore"} element={<ExplorePage/>}/>
          <Route path="/reels" element={<Reels/>}/>
          <Route path="/messages/c/:chatId" element={<Messages/>}/>
          <Route path="/stories" element={<Stories/>}/>
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRotues redirect="/" user={!user}>
              <Auth />
            </ProtectedRotues>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
