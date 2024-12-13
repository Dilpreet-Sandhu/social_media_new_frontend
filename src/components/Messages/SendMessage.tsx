import { NEW_MESSAGE } from "@/constants/constants";
import { useSendFileMutation } from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";
import { getSocket } from "@/socket/Socket";
import { motion } from 'framer-motion';
import { Image, Paperclip, Video } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const SendMessage = ({chatId,members} : {chatId ?: string,members : any[]}) => {
  const socket : any = getSocket();

  //get user ids
  const {user} = useAppSelector(state => state.user);
  const newMembers = members?.map((member) => member._id);
  newMembers?.push(user?._id);
  const [openFileDialog,setOpenFileDialog] = useState(false);

  const [message,setMessage] = useState("");

  async function handleSubmit(e : FormEvent<HTMLFormElement>) {
      e.preventDefault();


       if (!message.trim()) return;

       socket.emit(NEW_MESSAGE,{chatId,members : newMembers,message});


       setMessage("");
 

  }

  function handleFileDialog() {
    setOpenFileDialog(prev => !prev);
  }

  return (
    <div className="w-full pb-5 pt-2 px-5 h-[70px]">
      <form onSubmit={handleSubmit}>
        <div className="w-full h-[50px] flex rounded-full border-black/40 border-[2px]">
        <div className="h-full w-[60px] flex items-center justify-center">
          <span onClick={() => handleFileDialog()} className="cursor-pointer"><Paperclip/></span>
        </div>
          <input value={message} onChange={(e) => setMessage(e.target.value)} name="message"
            className="flex-1 pl-2 outline-none border-none bg-transparent"
            placeholder="type a message...."
          />
          <div className="w-[70px] flex items-center justify-center h-full">
            <button className="text-blue-500 cursor-pointer text-[16px] font-medium">
              Send
            </button>
          </div>
        </div>
      </form>
      {openFileDialog && <SelectFileDialog chatId={chatId} handleFileDialog={handleFileDialog}/>}
    </div>
  );
};


const SelectFileDialog = ({chatId,handleFileDialog} : {chatId : any,handleFileDialog : () => void}) => {

  const [sendFile] = useSendFileMutation();


  const handleOnChange = async (e : ChangeEvent<HTMLInputElement> ,key : string) => {


    e.preventDefault();
    const files  = e.target.files && Array.from(e.target.files);


    handleFileDialog();
    const toastId = toast.loading(`sending ${key}`,{type : "default",isLoading : true});
    try {

   

      const formData = new FormData();
      formData.append("chatId",chatId);
     files?.forEach((file) => {
      formData.append("file",file);
     })

       await sendFile(formData);

     toast.update(toastId,{
      render : `${key} sent sucesfully`,
      type : "success",
      isLoading : false,
      autoClose : 3000
     })


      
    } catch (error) {
      console.log("error while sending file",error);
      toast.update(toastId, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000, // Close after 3 seconds
      });
    }finally {

    }


  }


  return (
  <motion.div
    initial={{bottom : 0,left : 0}}
    whileInView={{bottom : "70px",left : "20px"}}
    
   className="absolute bottom-[70px] left-[20px] w-[160px] h-[200px] bg-black/20 rounded-md">
    <form>
    <SelectFile handleChange={handleOnChange} type="image" icon={<Image/>} text={"Select Image"}/>
    <SelectFile handleChange={handleOnChange} type="video" icon={<Video/>} text={"Select Video"}/>
    </form>


  </motion.div>
  )
}


const SelectFile = ({icon,text,type,handleChange} : {icon : any,text : string,type : string,handleChange : (e : ChangeEvent<HTMLInputElement>,key : string) => void}) => {


  return (
    <div className="w-full flex items-center border-b-[1px] hover:bg-black/10 border-black/20 gap-2 py-3">

  
      <label htmlFor={`${type}`} className="pl-2 w-full flex items-center gap-2 cursor-pointer">
        {icon}
      <p className="text-[14px] font-medium text-black/80 text-nowrap">{text}</p>
        </label>
       <input id={`${type}`} onChange={(e) => handleChange(e,"image")} type={"file"} accept={`${type}/*`} className="hidden"/> 
    </div>
  )
}

export default SendMessage;
