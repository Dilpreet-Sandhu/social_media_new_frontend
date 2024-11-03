import { useLocation } from "react-router-dom";
import FeedPosts from "../components/posts/Posts";
import AppLayout from "../layout/Applayout";

const Home = () => {

  const location = useLocation();
  

  return (
    <div className="w-full px-20 flex min-h-screen">

    <div className="w-[790px] h-full flex flex-col">

      <div className="w-full h-[100px] ">

        {/* stories */}

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
