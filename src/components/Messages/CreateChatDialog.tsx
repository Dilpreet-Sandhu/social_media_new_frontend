import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useCreateChatMutation } from "@/redux/slices/apiSlice";
import { closeCreateChatDialog } from "@/redux/slices/miscSlice";
import { Avatar } from "@mui/material";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";



const CreateChatDialog = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {searchValue,setSearchValue,debouncedValue,users} = useDebouncedValue();
    const [createNewChat] = useCreateChatMutation();
    const [userToChatWith,setUserToChatWith] = useState<any[]>([]);


    const handleSelectUser = (user : any) => {

      if (userToChatWith.length >= 1) return;

      setUserToChatWith(prev => [...prev,user])


    }

    async function handleCreateChat() {

      if (userToChatWith.length > 1) return;

      try {

        const res = await createNewChat(userToChatWith[0]?._id);

        navigate(`/messages/c/${res.data?.data?._id}`);
        dispatch(closeCreateChatDialog());
        
        
      } catch (error) {
        console.log('error while creating new chat',error);
      }


    }

  return (
    <div onClick={() => dispatch(closeCreateChatDialog())} className="w-full fixed h-full flex items-center justify-center bg-black/80 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">

        <div onClick={(e) => e.stopPropagation()} className="w-[500px] flex flex-col h-[500px] bg-white rounded-lg">

           <div className="w-full py-3 flex items-center border-b-[2px] border-black/10 px-4">
                <h1 className="flex-1 flex justify-between text-black/90 text-[17px] font-semibold">
                    New Message
                </h1>
                <button onClick={() => closeCreateChatDialog()}>
                    <span>
                    <X/>       
                    </span>
                </button>
           </div>

          <div className="flex-1 flex flex-col">
            <div className="w-full px-4 flex flex-col  pt-2 border-b-[2px] border-black/10 h-[105px]">
            <div className="w-full flex  items-center">

              <h1 className="text-black/70">To:</h1>
              <input value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value);
                debouncedValue(e.target.value);
              }} className="bg-transparent outline-none border-none px-2 h-[40px]  flex-1"/>


              </div>
              <div className="w-full">

                {
                  userToChatWith.length > 0 && (
                    <div className="w-full h-[50px] flex items-center rounded-md justify-between px-2 gap-2 hover:bg-black/30 bg-black/10">
                      <div className="flex gap-2 items-center">
                        <Avatar src={userToChatWith[0]?.avatar as string}/>
                        <p>{userToChatWith[0].username}</p>
                      </div>
                      <div onClick={() => setUserToChatWith([])} className="cursor-pointer ">
                        <X/>
                      </div>

                    </div>
                  )
                }


              </div>
            </div>

            <div className="flex-1 overflow-y-scroll no-scrollbar max-h-[300px] px-4 py-2">

                {
                  users?.map((user : any) => (
                      <User handleClick={handleSelectUser} user={user}/>
                  ))
                }


            </div>
           



          </div>

          <div className="w-full px-4">
              <button onClick={() => handleCreateChat()} disabled={userToChatWith.length === 0} className="w-full disabled:opacity-50 h-[45px] rounded-md mb-2 bg-[#0093f5] text-white">
                Chat
              </button>
          </div>


        </div>
       
    </div>
  )
}


const User = ({user,handleClick} : {user : any,handleClick : any}) => {

  return (
    <div onClick={() => handleClick(user)} className="w-full h-[50px] px-2 rounded-md cursor-pointer py-2 flex gap-2 hover:bg-black/20 items-center">

      <Avatar src={user?.avatar}/>

      <p>{user?.username}</p>

    </div>
  )
}

export default CreateChatDialog
