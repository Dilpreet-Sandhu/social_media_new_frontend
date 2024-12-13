import MessgeList from "@/components/Messages/MessgeList";
import SendMessage from "@/components/Messages/SendMessage";
import AppLayout from "@/layout/Applayout"
import { useGetChatDetailsQuery } from "@/redux/slices/apiSlice";
import { Avatar, AvatarGroup } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Messages = () => {

    const searchParams = useParams();

    const chatId = searchParams?.chatId;

    const {data} = useGetChatDetailsQuery(chatId,{skip : !chatId});



  return (
    <div className="w-full  relative ml-[120px] min-h-screen  flex flex-col">

      {
          data?.data?.groupChat ? <GroupUserInfo chat={data?.data}/> :  <UserInfo users={data?.data?.members} />
      }
     
      <div className="flex-1 mt-[60px] px-4">
          <MessgeList chatId={chatId}/>
      </div>

     <SendMessage chatId={chatId} members={data?.data?.members}/>

      
      
    </div>
  )
}

const UserInfo = ({users} : {users : any[]}) => {

  const navigate = useNavigate();

  return (
    <div className="w-full h-[60px] z-20 border-b-[2px] ">
    <div className= "w-full h-[60px] flex items-center bg-white border-black/20 pl-3 fixed top-0 ">
      {
        users?.map((user) => (
          <div key={user?._id} onClick={() => navigate(`/${user?._id}`)} className="py-1 flex items-center cursor-pointer gap-3">
            <Avatar src={user?.avatar}/>
            <p className="text-[16px] font-normal text-black/70">{user?.username}</p>
          </div>
        ))
      }
    </div>
    </div>
  )

}

const GroupUserInfo = ({chat} : {chat : any}) => {


  return (
    <div className="w-full h-[60px] z-20 border-b-[2px] border-black/20">
      <div className="w-full h-[60px] gap-2 flex items-center pl-3 fixed top-0">

      <AvatarGroup spacing={"small"} max={4}>
      {
        chat?.members?.map((user : any,idx :number) => (
          <Avatar key={idx} src={user?.avatar}/>
        ))
      }
      </AvatarGroup>
      <p>{chat?.name}</p>
      </div>

    </div>
  )
}

export default AppLayout()(Messages);
