import { X } from "lucide-react"
import { ChangeEvent, useState } from "react"
import PostStepsIndicator from "../extra/PostStepsIndicator";
import { FileUpload } from "../ui/file-upload";
import { useDispatch } from "react-redux";
import { closeCreateChatDialog } from "@/redux/slices/miscSlice";
import InputAndLabelContainer from "../auth/Input";
import { useCreatePostMutation } from "@/redux/slices/apiSlice";


const CreatePost = () => {

  const dispatch = useDispatch();
  
  return (
    <div className="w-full fixed z-50 overflow-hidden min-h-screen flex items-center justify-center bg-black/50">

        <span onClick={() => dispatch(closeCreateChatDialog())} className="absolute top-5 cursor-pointer right-5">
            <X color="white"/>
        </span>


        <CreatePostDialog/>
      
    </div>
  )
}

const CreatePostDialog = () => {
  const [currentStep,setCurrentStep] = useState(1);
  const [file,setFile] = useState<File>();
  const [createPost] = useCreatePostMutation();
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  function handlePrevStep() {
    setCurrentStep(prev => {
      prev > 1 && prev--;
      return prev;
    })
  }

  function handleNextStep() {
    setCurrentStep(prev => {
      prev < 2 && prev++;
      return prev;
    })
  }


  async function handleCreatePost() {

     try {

      const formData = new FormData();

      const data = await createPost(formData);
      
     } catch (error) {
      console.log("error while creating post",error);
     }

  }

  console.log(title);

  function handleSetTitle(e : ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleSetDescription(e : ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }
  
  return (
    <div className="w-[600px] px-5 pt-4 h-[500px] flex flex-col gap-3 cursor-pointer bg-white rounded-md ">
    <PostStepsIndicator currentStep={currentStep}/>

    {currentStep == 1 ? <FileUpload onChange={(file) => setFile(file[0])}/> : null}
    {currentStep == 2 ? <SelectCredentials title={title} setTitle={handleSetTitle} description={description} setDescription={handleSetDescription}/> : null}
    

    <div className="w-full flex items-center gap-3 h-[50px]">

      <button onClick={handlePrevStep} className="w-[300px] h-full border-[2px] border-black/20 rounded-md shadow-muted-foreground">
        Prev
      </button>
      <button onClick={currentStep == 2 ? handleCreatePost : handleNextStep} className="w-[300px] h-full bg-blue-500 text-white rounded-md shadow-muted-foreground">
        {currentStep == 2 ? "Post" : "Next"}
      </button>
    
    </div>

    </div>
  )
}

function SelectCredentials({title,setTitle,description,setDescription} : {title : string,setTitle : (e : ChangeEvent<HTMLInputElement>) => void,description : string,setDescription : (e : ChangeEvent<HTMLInputElement>) => void}) {

  return (
    <div className="w-full flex flex-col items-center justify-center h-[320px]">

      <InputAndLabelContainer value={title} setValue={setTitle} width="550px" height="45px" label="Title" placeholder="Title" name="title"/>
      <InputAndLabelContainer value={description} setValue={setDescription} width="550px" height="45px" label="Description" placeholder="Description" name="title"/>

    </div>
  )
}

export default CreatePost
