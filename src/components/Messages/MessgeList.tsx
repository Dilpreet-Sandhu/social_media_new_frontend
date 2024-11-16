import { NEW_MESSAGE } from "@/constants/constants";
import { useGetMessagesQuery } from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";
import { getSocket } from "@/socket/Socket";
import { Avatar } from "@mui/material";
import moment from "moment";
import { Ref, useCallback, useEffect, useRef, useState } from "react";


const MessgeList = ({chatId} : {chatId ?: string}) => {

    const {data : oldMessages,isLoading,isFetching,refetch} = useGetMessagesQuery(chatId);
    const [messageArr,setMessageArr] = useState<any[]>([]);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
   
    const socket :any = getSocket();
    const {user} = useAppSelector(state => state.user);
    
    const newMessageHandler = useCallback((data : {chatId : string,message : any}) => {
      
      if (data?.chatId !== chatId) return;
      

      
      setMessageArr((prev) => [...prev,data?.message]);
      
    },[socket,chatId]);


    useEffect(() => {

      setMessageArr([]);
      refetch();

    },[chatId])
    
    useEffect(() => {

      
      socket.on(NEW_MESSAGE,newMessageHandler);

      socket.on((err : any) => console.log(err));
      
      
      return () => {
        socket.off(NEW_MESSAGE,newMessageHandler);
      }
      
    },[socket,chatId]);

    useEffect(() => {

      setMessageArr(oldMessages?.data);
    },[chatId,isFetching]);


    useEffect(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({behavior : "smooth"});
      }
    },[messageArr]);

    
  return (
    <div className="w-full h-full flex  gap-3 px-2 z-40 py-2 justify-end flex-col ">
      {
        messageArr?.map((message : any,idx : number) => (
          <div ref={idx == messageArr.length - 1 ? lastMessageRef : null  } key={idx} className={`px-6 py-3 rounded-md ${message?.sender?._id == user?._id ? "self-end flex-row-reverse" : "self-start"} bg-black/5 gap-5 justify-between relative flex`}>

            <div>
              <Avatar sx={{width : "30px",height : '30px'}} src={message?.sender?.avatar}/>
            </div>

            <div >
              {message.content}
            </div>

            <p className={`absolute bottom-1 text-[8px] ${message?.sender?._id == user?._id ? "left-2" : "right-2"}`}>{moment(message?.createdAt).fromNow()}</p>
          </div>
        ))
      }

      
    </div>
  )
}

export default MessgeList;
