import { NEW_STORY_USER } from "@/constants/constants"
import { useCheckHasStoriesQuery, useGetFollowingStoriesQuery } from "@/redux/slices/apiSlice"
import { setCreateStory } from "@/redux/slices/miscSlice"
import { addIds } from "@/redux/slices/storyUserids"
import { useAppSelector } from "@/redux/store"
import { getSocket } from "@/socket/Socket"
import { Avatar } from "@mui/material"
import { PlusCircle } from "lucide-react"
import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"


const Story = () => {

  const {data,isFetching,isLoading} = useGetFollowingStoriesQuery();
  const {user} = useAppSelector(state => state.user);
  const socket : any = getSocket();
  const dispatch = useDispatch();
   useEffect(() => {

    let mutatedUsers : any[] = [];

    if (!isFetching) {

      mutatedUsers = [...data?.data];
    }
    mutatedUsers.unshift({
      _id : user?._id,
      username : user?.username,
      avatar : user?.avatar
    })

    dispatch(addIds(mutatedUsers));


   },[isLoading,isFetching]) ;

   const newStoryHandler = useCallback((data : any) => {

    console.log(data);

   },[socket]);




   useEffect(() => {

    socket.on(NEW_STORY_USER,newStoryHandler);


    return () => socket.off(NEW_STORY_USER,newStoryHandler)

   },[socket])

  

  return (
    <div className="w-full flex items-center no-scrollbar overflow-x-scroll overflow-y-hidden gap-3 h-full ml-20">
        <div className="flex flex-col items-center justify-center">
        <CreateMyStory/>
        </div>
        {
            data?.data.map((user : any) => (
              <div className="flex flex-col items-center justify-center">
                <UserStory key={user?._id} user={user}/>
              </div>
            ))
        }
    </div>
  )
}


const CreateMyStory = () => {

    const {user} = useAppSelector(state => state.user);
    const dispatch = useDispatch();
    const {data} = useCheckHasStoriesQuery();

     console.log(data?.data);

    return (
        <>
        <Link to={`${data?.data?.stories ? `/stories/${user?._id}` : "/"}`} onClick={() => {
          if (!data?.data?.stories) {
            dispatch(setCreateStory());
          }
        }}  className="w-[53px] border-[2px] relative flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 h-[53px] cursor-pointer rounded-full">
            <Avatar sx={{width : '45px',height : "45px"}} src={user?.avatar}/>
            <span className="absolute bottom-[2px] right-[2px]  z-10">
              {
                 !data?.data?.stories  && <PlusCircle fill="white" />

              
              }
           
            </span>
        </Link>
        <p className="text-[14px] font-medium text-black/60">Your story</p>
        </>
    )

}


const UserStory = ({user} : {user : any}) => {
 

  return (
    <>
    <Link to={`/stories/${user?._id}`} className="w-[53px] border-[2px] relative flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 h-[53px] cursor-pointer rounded-full">
        <Avatar sx={{width : '45px',height : "45px"}} src={user?.avatar}/>
       
    </Link>
    <p className="text-[14px] font-medium text-black/60">{user?.username}</p>
    </>
  )
}

export default Story
