import Progress from "@/components/story/Progress";
import { useGetMyStoriesQuery } from "@/redux/slices/apiSlice";
import { Avatar } from "@mui/material";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Stories = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetMyStoriesQuery();

  console.log(data);

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

  return (
    <div className="w-full h-screen bg-black/70">
      <h1 className="text-white text-[24px] font-semibold tracking-wide px-3 py-2">
        Instagram
      </h1>

      <span
        onClick={() => navigate(-1)}
        className="absolute top-10 right-10 cursor-pointer"
      >
        <X color="white" />
      </span>

      <StoriesElement stories={data?.data} />
    </div>
  );
};

const StoriesElement = ({ stories }: { stories: any[] }) => {
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        if (currentStory < stories.length ) {
          setCurrentStory((prev) => prev + 1);
        }
      },
       4000
    );
    console.log(currentStory > stories.length - 1);

    return () => clearTimeout(timeoutId);
  }, [stories, stories.length]);

 

  return (
    <div className="w-[400px] relative mx-auto h-[600px] bg-black/10 flex flex-col  rounded-md">
      <div className="w-full z-10 h-[50px] my-2 flex gap-2 items-center px-5">
        <Avatar src={stories?.length > 0 && stories[0].owner?.avatar} />

        <p className="text-[15px] text-white font-medium tracking-wide">
          {stories?.length > 0 && stories[0].owner.username}
        </p>
      </div>
      <Progress stories={stories} currentStep={currentStory}/>

      <div className="absolute flex items-center justify-center inset-0">
        { stories[currentStory]?.type == "image" ?  <img
          className="object-cover"
          src={stories[currentStory]?.contentUrl}
        /> : <video src={stories[currentStory]?.contentUrl}/>}
       
      </div>
    </div>
  );
};

export default Stories;
