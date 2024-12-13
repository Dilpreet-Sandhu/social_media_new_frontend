import { lazy, ReactNode } from "react";
import Sidebar from "../components/home/Sidebar";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setSmallSidebar } from "../redux/slices/miscSlice";
import ChatList from "@/components/Messages/ChatList";
import CreatePost from "@/components/createPost/CreatePost";
import CreateStoryDialog from "@/components/createStory/CreateStoryDialog";

const NotificationDialog = lazy(() => import("@/components/Notification/NotificationDialog"));
const SearchDialog = lazy(() => import("../components/home/SearchDialog"));
const CreateChatDialog = lazy(() => import("@/components/Messages/CreateChatDialog"));

const AppLayout = () => (Component: () => ReactNode) => {
  return (props: any) => {
  
    console.log(props);

    const { smallSidebar,createChat ,sidebarItem,createPost,createStory} = useAppSelector((state) => state.misc);
    const dispatch = useDispatch();



    function toggleSidebar() {
      dispatch(setSmallSidebar());
    }

 
   

    return (
      <div className="w-full flex ">
        <div className={`${smallSidebar ? "w-[80px]" : "w-[256px]"}`}>
          <Sidebar
            sidebar={smallSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
        {sidebarItem == "search" ? <SearchDialog /> : null}
        {sidebarItem == "message" ? <ChatList /> : null}
        {createChat ? <CreateChatDialog/> : null}
        {sidebarItem == "notification" ? <NotificationDialog/> : null}
        {createPost && <CreatePost/> }
        {createStory && <CreateStoryDialog/>}
        <Component />
      </div>
    );
  };
};

export default AppLayout;
