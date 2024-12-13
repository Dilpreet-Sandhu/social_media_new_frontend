import { NEW_MESSAGE_ALERT } from "@/constants/constants";
import { getOrSaveToLocalStorage } from "@/lib/utils";
import { useGetUserChatsQuery } from "@/redux/slices/apiSlice";
import { removeMessageAlert, setNewMessageAlert } from "@/redux/slices/chatslice";
import { openCreateChatDialog } from "@/redux/slices/miscSlice";
import { useAppSelector } from "@/redux/store";
import { getSocket } from "@/socket/Socket";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import { ArrowDown, FilePen } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ChatList = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="w-[400px] ">
      <div className="w-[400px] h-screen pl-10 fixed border-[2px] border-r-black   rounded-md">
        <div className="w-full flex items-center justify-between pr-4">
          <h1 className="text-[20px] mt-5 text-zinc-600 flex gap-2 items-center cursor-pointer font-extrabold">
            {user?.username} <ArrowDown />
          </h1>

          <CreateChatButton />
        </div>

        <div className="text-black my-5 font-bold text-[20px]">
          <p>Messages</p>
        </div>

        <Chats />
      </div>
    </div>
  );
};

const Chats = () => {
  const { data } = useGetUserChatsQuery();
 

  const params = useParams();
  const dispatch = useDispatch();
  const {newMessageAlert} = useAppSelector(state => state.chat);
  const socket: any = getSocket();

  const newMessageAlertHandler = useCallback(
    (data: { chatId: string }) => {
      if (params.chatId !== data.chatId) return;

      dispatch(setNewMessageAlert(data.chatId));
    },
    [socket]
  );


  useEffect(() => {
      const messageAlert = newMessageAlert as any[];
    getOrSaveToLocalStorage({
      key : NEW_MESSAGE_ALERT,
      value : messageAlert 
    })

  },[newMessageAlert])

  useEffect(() => {
    socket.on(NEW_MESSAGE_ALERT, newMessageAlertHandler);

    return () => {
      socket.off(NEW_MESSAGE_ALERT, newMessageAlertHandler);
    };
  }, [newMessageAlertHandler]);

  

  return (
    <div className="flex flex-col z-30  gap-2 w-full h-full overflow-y-scroll no-scrollbar pr-4">
      {data?.data?.map((chat: any, idx: number) => (
        <Chat key={idx} chat={chat} />
      ))}
    </div>
  );
};

const Chat = ({ chat }: { chat: any }) => {

  const navigate = useNavigate();
  const {newMessageAlert} = useAppSelector(state => state.chat);
  const dispatch = useDispatch();

  const newMessage : any = newMessageAlert.find((item : any) => item?.chatId == chat?._id);

  return (
    <div
      onClick={() => {
        navigate(`/messages/c/${chat?._id}`);
        dispatch(removeMessageAlert(chat?._id))
      }}
      className="w-full  cursor-pointer h-[70px] flex  gap-2 px-2 bg-black/10 rounded-md"
    >
      <div className="h-full flex items-center">
        {chat?.groupChat ? (
          <AvatarGroup spacing={24}>
            {chat?.avatar.map((avatar: string, idx: number) => (
              <Avatar key={idx} alt={chat?.name} src={avatar} />
            ))}
          </AvatarGroup>
        ) : (
          <Avatar src={chat?.avatar[0]} />
        )}
      </div>
      <div>
        <p className="text-black text-[15px] mt-4 font-normal">
          {chat?.groupChat ? chat?.name : chat?.members[0]?.username}
        </p>
        {
          (newMessage && chat?._id !== newMessage.chatId) && (
            <p className="text-black text-[12px]  font-bold">
            {newMessage?.count} new Message
          </p>
          )
        }
      
      </div>
    </div>
  );
};

const CreateChatButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(openCreateChatDialog())}
      className="mt-5 mr-2"
    >
      <span>
        <Tooltip title="create chat">
          <FilePen />
        </Tooltip>
      </span>
    </button>
  );
};

export default ChatList;
