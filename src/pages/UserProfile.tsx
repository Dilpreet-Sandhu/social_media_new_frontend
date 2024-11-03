

import { useParams } from 'react-router-dom';
import AppLayout from '../layout/Applayout'
import { useGetUserById } from '../hooks/getuserbyid';
import Profile from '../components/userProfile/Profile';
import Loading from '../loaders/Loading';
import { useState } from 'react';
import { BatteryWarning, Bookmark, Grid } from 'lucide-react';
import Posts from '../components/userProfile/Posts';

const UserProfile = () => {


    const {userId} = useParams();

    const [showPosts,setShowPosts] = useState("posts");
     

    const {user,loading,isError} = useGetUserById(userId as string);


    console.log(user);

    if (loading) return <Loading/>

    if (isError) return <div><BatteryWarning/> some error occured</div>


  return (
    <div className='flex-1 flex flex-col overflow-x-hidden'>

    <Profile user={user}/>

    <div className={`w-full px-24 gap-7 flex justify-center`}>

        <span  onClick={() => setShowPosts("posts")} style={{color : showPosts == "posts" ? "black" :"#3f3f46"}} className={`flex gap-2  h-[40px] cursor-pointer   text-zinc-700 text-[13px] items-center`}>
            <Grid className='w-[20px] h-[20px]'/>
            <p>POSTS</p>
        </span>

        <span onClick={() => setShowPosts("savedPosts")} style={{color : showPosts == "savedPosts" ? "black" :"#3f3f46"}} className={`flex gap-2  text-[13px] h-[40px] cursor-pointer text-zinc-700 items-center`}>
            <Bookmark className='w-[20px] h-[20px]'/>
            <p>SAVED POSTS</p>
        </span>

    </div>

    <Posts showPosts={showPosts} userId={user?._id}/>
      
    </div>
  )
}

export default AppLayout()(UserProfile);
