import { useLocation } from "react-router-dom";
import FeedPosts from "../components/posts/Posts";
import AppLayout from "../layout/Applayout";
import { useAppSelector } from "@/redux/store";
import Story from "@/components/story/Story";

const Home = () => {

  const location = useLocation();
  const {smallSidebar} = useAppSelector(state => state.misc);

  return (
    <div className={`w-full ${smallSidebar && "ml-[256px]"} px-20 flex min-h-screen`}>

    <div className="w-[790px] h-full flex flex-col">

      <div className="w-full  h-[100px] ">

        <Story/>

      </div>
      <div className="flex-1 py-10">

        <FeedPosts location={location}/>

      </div>

    </div>

    <div className="flex-1 ">

    </div>
     
    </div>
  )
}

export default AppLayout()(Home);
