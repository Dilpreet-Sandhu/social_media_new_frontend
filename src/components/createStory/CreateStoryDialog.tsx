
import { X } from "lucide-react"
import { FileUpload } from "../ui/file-upload"
import { useDispatch } from "react-redux"
import { setCreateStory } from "@/redux/slices/miscSlice";
import { useState } from "react";
import { useUploadStoryMutation } from "@/redux/slices/apiSlice";
import { toast } from "react-toastify";
const CreateStoryDialog = () => {

    const [file,setFile] = useState<File>();

    const dispatch = useDispatch();
    const [uploadStory] = useUploadStoryMutation();

    function handleFileChange(files : File[]) {
        setFile(files[0]);
    }
    
    async function handleUploadStory() {

        const toastId = toast.loading("uploading story");
        try {
            if (!file) {
                toast("please provide the file");
                return;
            }

            const formData = new FormData();

            formData.append("file",file);

            const data = await uploadStory(formData);

            console.log(data);
            if (data?.data?.success) {
                toast.update(toastId,{
                    render : "story uploaded succesfully",
                    autoClose : 3000,
                    isLoading : false,
                    type : "success"
                })
            }

            
        } catch (error) {
            console.log("error while uploading story",error);
           
        }

    }

  return (
    <div className="w-full min-h-screen flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-20">
            <span onClick={() => dispatch(setCreateStory())} className="absolute top-[50px] right-5 cursor-pointer"><X color="white"/></span>
        <div className="w-[500px] h-[450px] px-4 rounded-md bg-white">
                <h1 className="text-[20px] text-black/90 font-semibold text-center mt-5">Upload Your Story</h1>
                <FileUpload onChange={handleFileChange}/>
                <button onClick={handleUploadStory} className="w-full h-[50px] mt-5 bg-blue-500 rounded-md text-white text-[15px] font-medium">Upload</button>
        </div>
      
    </div>
  )
}

export default CreateStoryDialog
