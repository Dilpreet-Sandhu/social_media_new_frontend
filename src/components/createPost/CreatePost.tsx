import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import PostStepsIndicator from "../extra/PostStepsIndicator";
import { FileUpload } from "../ui/file-upload";
import { useDispatch } from "react-redux";
import {  closeCreatePostDialog } from "@/redux/slices/miscSlice";
import InputAndLabelContainer from "../auth/Input";
import { useCreatePostMutation } from "@/redux/slices/apiSlice";
import { toast } from "react-toastify";

const CreatePost = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full fixed z-50 overflow-hidden min-h-screen flex items-center justify-center bg-black/50">
      <span
        onClick={() => dispatch(closeCreatePostDialog())}
        className="absolute top-5 cursor-pointer right-5"
      >
        <X color="white" />
      </span>

      <CreatePostDialog />
    </div>
  );
};

const CreatePostDialog = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File>();
  const [createPost] = useCreatePostMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const dispatch = useDispatch();

  function handlePrevStep() {
    setCurrentStep((prev) => {
      prev > 1 && prev--;
      return prev;
    });
  }

  function handleNextStep() {
    setCurrentStep((prev) => {
      prev < 2 && prev++;
      return prev;
    });
  }

  async function handleCreatePost() {
    try {
      if (!file) {
        toast("please provide the file you want to upload");
        return;
      }
      let type = "";
      if (file.type.includes("image")) {
        type = "image";
      }else if (file.type.includes("video")) {
        type = "video";
      }

      const toastId = toast.loading("uploading",{theme : "colored",draggable : true});
      dispatch(closeCreatePostDialog());

      const formData = new FormData();
      formData.append("file",file);
      formData.append("title",title);
      formData.append("description",description);
      formData.append("tags",JSON.stringify(tags));
      formData.append("type",type);

      const data = await createPost(formData);

      console.log(data);

      if (data?.data?.success) {
        toast.update(toastId,{
          type : "success",
          autoClose : 3000,
          render : "post created succesfully",
          isLoading : false
        })
      }

    } catch (error) {
      console.log("error while creating post", error);
    }
  }

  function handleSetTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleSetDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }
  function handleSetTagValue(e: ChangeEvent<HTMLInputElement>) {
    setTagValue(e.target.value);
  }

  function handleAddTagToList() {

    setTags(prev => [...prev,tagValue]);

    setTagValue("");

  }
  

  function handleRemoveTagFromList(idx : number) {

    const dublicate = [...tags];
    dublicate.splice(idx,1);
    setTags(dublicate);

  }

  return (
    <div className="w-[600px] px-5 pt-4 h-[500px] flex flex-col gap-3  bg-white rounded-md ">
      <PostStepsIndicator currentStep={currentStep} />

      {currentStep == 1 ? (
        <FileUpload onChange={(file) => setFile(file[0])} />
      ) : null}
      {currentStep == 2 ? (
        <SelectCredentials
          title={title}
          setTitle={handleSetTitle}
          description={description}
          setDescription={handleSetDescription}
          tagValue={tagValue}
          setTagValue={handleSetTagValue}
          tags={tags}
          handleSetTags={handleAddTagToList}
          handleRemoveTag={handleRemoveTagFromList}
        />
      ) : null}

      <div className="w-full flex items-center gap-3 h-[50px]">
        <button
          onClick={handlePrevStep}
          className="w-[300px] h-full border-[2px] border-black/20 rounded-md shadow-muted-foreground"
        >
          Prev
        </button>
        <button
          onClick={currentStep == 2 ? handleCreatePost : handleNextStep}
          className="w-[300px] h-full bg-blue-500 text-white rounded-md shadow-muted-foreground"
        >
          {currentStep == 2 ? "Post" : "Next"}
        </button>
      </div>
    </div>
  );
};

function SelectCredentials({
  title,
  setTitle,
  description,
  setDescription,
  tagValue,
  setTagValue,
  tags,
  handleSetTags,
  handleRemoveTag
}: {
  title: string;
  setTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  description: string;
  setDescription: (e: ChangeEvent<HTMLInputElement>) => void;
  tagValue : string;
  setTagValue : (e : ChangeEvent<HTMLInputElement>) => void;
  tags : string[];
  handleSetTags : () => void;
  handleRemoveTag : (idx :number) => void;
}) {
  return (
    <div className="w-full flex flex-col items-center  h-[320px]">
      <InputAndLabelContainer
        value={title}
        setValue={setTitle}
        width="550px"
        height="40px"
        label="Title"
        placeholder="Title"
        name="title"
      />
      <InputAndLabelContainer
        value={description}
        setValue={setDescription}
        width="550px"
        height="40px"
        label="Description"
        placeholder="Description"
        name="title"
      />
      <div className="w-full flex items-center">
        <InputAndLabelContainer
          value={tagValue}
          setValue={setTagValue}
          width="470px"
          height="40px"
          label="tags"
          placeholder="tags"
          name="tags"
        />
        <button onClick={handleSetTags} className="w-[100px] rounded-md text-[14px] text-black/80 h-[40px] mt-6 flex items-center justify-center border-[2px] border-black/30">AddTag</button>
      </div>
      <div className="flex-1 w-full pt-1">
        <p className="text-[14px] text-black/80 font-semibold tracking-normal text-start">Selceted Tags</p>
        <div className="w-full flex gap-2 overflow-x-scroll no-scrollbar my-2 h-full">
          {
            tags.map((tag,idx) => (
              <div className="w-[130px] h-[40px] border-[2px] flex justify-between px-1 items-center rounded-md border-black/30" key={idx}>
                  <p className="text-[12px] font-medium ">{tag}</p>
                  <span onClick={() => handleRemoveTag(idx)} className="cursor-pointer"><X className="size-5"/></span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
