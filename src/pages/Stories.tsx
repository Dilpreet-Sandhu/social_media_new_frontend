//@ts-nocheck
import AddNewStory from "@/components/createStory/AddNewStory";
import Progress from "@/components/story/Progress";
import { useGetMyStoriesQuery } from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";
import { Avatar } from "@mui/material";
import { ArrowLeftCircle, ArrowRightCircle, PlusCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Stories = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isError, isLoading } = useGetMyStoriesQuery({
    userId: params?.userId,
  });
  const [currentStory, setCurrentStory] = useState(0);
  const { users } = useAppSelector((state) => state.storyids);

  const currentIdx = useMemo(
    () => users?.findIndex((user) => user?._id == params.userId),
    [params?.userId]
  );

 

  if (isError)
    return (
      <div className="w-full h-screen bg-black/70 text-white flex items-center justify-center">
        there seems to be a error
      </div>
    );

  if (isLoading)
    return (
      <div className="w-full h-screen bg-black/50 text-white text-[30px]">
        loading...
      </div>
    );

  function handleStoryBack() {
    if (!users || !currentIdx) return;

    if (currentIdx === 0) {
      return;
    }

    const prevUserId = users[currentIdx - 1]._id;
    navigate(`/stories/${prevUserId}`);
    setCurrentStory(0);
  }

  function handleStoryNext() {
    if (currentIdx < users.length - 1) {
      const nextId = users[currentIdx + 1]._id;
      navigate(`/stories/${nextId}`);
      setCurrentStory(0);

    }else {
      console.log("end of stories");
    }
  }

  return (
    <div className="w-full h-screen bg-black/70">
      <h1 onClick={() => navigate('/')}  className="text-white text-[24px] cursor-pointer font-semibold tracking-wide px-3 py-2">
        Instagram
      </h1>

      <span
        onClick={() => navigate("/")}
        className="absolute top-10 right-10 cursor-pointer"
      >
        <X color="white" />
      </span>

      <span
        onClick={(e) => {
          handleStoryBack();
        }}
        className="absolute w-10 cursor-pointer h-10 left-20 top-[350px]"
      >
        <ArrowLeftCircle />
      </span>
      <span
        onClick={handleStoryNext}
        className="absolute w-10 cursor-pointer h-10 right-20 top-[350px]"
      >
        <ArrowRightCircle />
      </span>

      {
        currentIdx !== 0 ?(

      <div className="w-[300px] absolute ml-[200px] h-[500px] top-[100px] bg-black/10 flex items-center justify-center flex-col   rounded-md">
              <Avatar sx={{width : "70px",height : "70px"}} src={users[currentIdx - 1]?.avatar}/>
              <p className="text-white text-[20px] font-medium">{users[currentIdx - 1]?.username}</p>
      </div>
        ) : (
         <AddNewStory/>
        )
      }

      {currentIdx < users?.length -1  &&  (

      <div className="w-[300px] absolute right-[200px] h-[500px] top-[100px] bg-black/10 flex flex-col items-center justify-center  rounded-md">
          <Avatar sx={{width : "70px",height : "70px"}} src={users[currentIdx + 1]?.avatar}/>
          <p className="text-white text-[20px] font-medium">{users[currentIdx + 1]?.username}</p>
      </div>
      )}


      <StoriesElement storyData={data?.data} currentStory={currentStory} setCurrentStory={setCurrentStory} currentUserIdx={currentIdx}/>
    </div>
  );
};

const StoriesElement = ({ storyData,currentStory,setCurrentStory,currentUserIdx }: { storyData: any,currentStory : any,setCurrentStory : any,currentUserIdx}) => {
  
  const { users } = useAppSelector((state) => state.storyids);
  const navigate = useNavigate();
  const stories = storyData?.stories;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentStory < stories.length - 1) {
        setCurrentStory((prev) => prev + 1);
      }
    }, stories[currentStory]?.duration);

    return () => clearTimeout(timeoutId);
  }, [stories, stories.length,currentStory]);

  // useEffect(() => {

  //   let timeOutId : number;
  //   if (currentStory === stories.length - 1) {
  //     timeOutId = setTimeout(() => {

      

  //         navigate(-1);
  //     },stories[currentStory]?.duration);
  //   }

  //   return () => clearTimeout(timeOutId);

  // },[currentStory]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[400px] relative mx-auto h-[600px] bg-black/10 flex flex-col  rounded-md"
    >
      <div className="w-full z-10 h-[50px] my-2 flex gap-2 items-center px-5">
        <Avatar src={stories?.length > 0 && storyData.user?.avatar} />

        <p className="text-[15px] text-white font-medium tracking-wide">
          {stories?.length > 0 && storyData.user?.username}
        </p>
      </div>
      <Progress currentUserIdx={currentUserIdx} stories={stories} currentStep={currentStory} />

      <div className="absolute flex items-center justify-center inset-0">
        {stories[currentStory]?.type == "image" ? (
          <img
            className="object-cover"
            src={stories[currentStory]?.contentUrl}
          />
        ) : (
          <video autoPlay src={stories[currentStory]?.contentUrl} />
        )}
      </div>
    </div>
  );
};

export default Stories;
