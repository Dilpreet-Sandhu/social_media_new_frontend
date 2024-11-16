import { NEW_MESSAGE } from "@/constants/constants";
import { useAppSelector } from "@/redux/store";
import { getSocket } from "@/socket/Socket";
import { FormEvent, useState } from "react";

const SendMessage = ({chatId,members} : {chatId ?: string,members : any[]}) => {
  const socket : any = getSocket();

  //get user ids
  const {user} = useAppSelector(state => state.user);
  const newMembers = members?.map((member) => member._id);
  newMembers?.push(user?._id);

  const [message,setMessage] = useState("");

  async function handleSubmit(e : FormEvent<HTMLFormElement>) {
      e.preventDefault();


       if (!message.trim()) return;

       socket.emit(NEW_MESSAGE,{chatId,members : newMembers,message});


       setMessage("");
 

  }

  return (
    <div className="w-full pb-5 pt-2 px-5 h-[70px]">
      <form onSubmit={handleSubmit}>
        <div className="w-full h-[50px] flex rounded-full border-black/40 border-[2px]">
          <input value={message} onChange={(e) => setMessage(e.target.value)} name="message"
            className="flex-1 pl-6 outline-none border-none bg-transparent"
            placeholder="type a message...."
          />
          <div className="w-[70px] flex items-center justify-center h-full">
            <button className="text-blue-500 cursor-pointer text-[16px] font-medium">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
