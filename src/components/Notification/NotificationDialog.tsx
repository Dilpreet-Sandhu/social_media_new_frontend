import { useDeleteNotificationMutation, useGetUserNotifsQuery, useSendFollowRequestMutation } from "@/redux/slices/apiSlice"
import { useAppSelector } from "@/redux/store";
import { Avatar } from "@mui/material";
import {X} from 'lucide-react';
import { useEffect, useState } from "react";
import {motion} from 'framer-motion';

const NotificationDialog = () => {

  const {data,isFetching,isError} = useGetUserNotifsQuery();

  const [notifications,setNotifications] = useState<any[]>([]);

  useEffect(() => {

    if (!isError || !isFetching) {
      setNotifications(data?.data)
    }

  },[isFetching]);


  function deleteNotif(id : string) {

    let copy = [...notifications];

    copy = copy.filter((item) => item?._id.toString() !== id.toString());

    setNotifications(copy);

  } 



  return (
    <motion.div
      initial={{width : "0px"}}
      whileInView={{width : "400px"}}
     className="w-[400px] fixed ml-[80px] h-full z-40 flex flex-col bg-white shadow-lg overflow-y-scroll">

      <div className="px-5 py-7">
        <h1 className="text-[24px] font-bold text-black/60">Notifications</h1>
      </div>

    <Notifications handleDeleteNotif={deleteNotif} notifications={notifications}/>

      
    </motion.div>
  )
}


const Notifications = ({notifications,handleDeleteNotif} : {notifications : any[],handleDeleteNotif : (id : string) => void})  => {


  return (
    <div className="w-full h-full flex flex-col px-4">
        {
          notifications?.map((notif,idx) => {

            if (notif?.type == "follow") {
              return <FollowNotif handleDeleteNotification={handleDeleteNotif} key={idx} notif={notif}/>
            }else if (notif?.type == "like") {
              return <LikeNotif handleDeleteNotification={handleDeleteNotif} key={idx} notif={notif}/>
            }
})
        }
    </div>
  )

}

const FollowNotif = ({notif,handleDeleteNotification} : {notif : any,handleDeleteNotification : (id :string) => void }) => {

  const {user} = useAppSelector(state => state.user);

  const isFollowing = user?.followers.find(id => id.toString() === notif?.sender?._id.toString());

  const [following,setFollowing] = useState(!!isFollowing);
  const [sendFollowRequest] = useSendFollowRequestMutation();
  const [deleteNotif] = useDeleteNotificationMutation();
 

  async function handleFollowRequest() {

    try {

       await sendFollowRequest(notif?.sender?._id);

   
      setFollowing(true);
      
    } catch (error) {
      console.log("error while sending follow request",error);
    }

  }

  async function handleDeleteNotif() {

    try {

      handleDeleteNotification(notif?._id);
      await deleteNotif(notif?._id);

    
      
    } catch (error) {
      console.log("error while deleting notif",error);
    }
  }

  

  return (
    <div className="w-full h-[60px]  px-2 hover:bg-gray-100 rounded-md flex items-center justify-between">

      <div className="flex w-3/4 items-center gap-2">
        <Avatar src={notif?.sender?.avatar}/>
        <p className="text-[12px] text-black/90 font-medium">{notif?.title}</p>
      </div>


      <div className="flex items-center gap-2">
        <button onClick={handleFollowRequest} className={`px-4 py-1 ${following ? "bg-gray-300 text-black/60" : "bg-blue-400 text-white"} rounded-md`}>{following ? "following" : "Follow"}</button>
        <span onClick={handleDeleteNotif}><X className="w-5 cursor-pointer h-5"/></span>
      </div>
      
    </div>
  )
}


const LikeNotif = ({notif,handleDeleteNotification} : {notif : any,handleDeleteNotification : (id : string) => void}) => {


  const [deleteNotif] = useDeleteNotificationMutation();

  async function handleDeleteNotif() {

    try {

      handleDeleteNotification(notif?._id);
      const data = await deleteNotif(notif?._id);

      console.log(data);
      
    } catch (error) {
      console.log("error while deleting notif",error);
    }
  }

  return (
    <div className="w-full h-[60px]  px-2 hover:bg-gray-100 rounded-md flex items-center justify-between  gap-2">

     <div className="flex gap-1 items-center">
      <Avatar src={notif?.sender?.avatar}/>
      <p>
      {notif?.sender?.username} liked your post
      </p>
 
     </div>

     <div>
      <span onClick={handleDeleteNotif}><X className="w-5 h-5"/></span>
     </div>

      
    </div>
  )
}


export default NotificationDialog
