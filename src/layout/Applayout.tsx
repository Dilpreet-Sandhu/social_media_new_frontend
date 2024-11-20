import { lazy, ReactNode, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setSmallSidebar } from "../redux/slices/miscSlice";
import { useLocation } from "react-router-dom";
import ChatList from "@/components/Messages/ChatList";
import CreatePost from "@/components/createPost/CreatePost";

const NotificationDialog = lazy(() => import("@/components/Notification/NotificationDialog"));
const SearchDialog = lazy(() => import("../components/home/SearchDialog"));
const CreateChatDialog = lazy(() => import("@/components/Messages/CreateChatDialog"));

const AppLayout = () => (Component: () => ReactNode) => {
  return (props: any) => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    const location = useLocation();
    const { smallSidebar,createChat ,sidebarItem,createPost} = useAppSelector((state) => state.misc);
    const dispatch = useDispatch();



    function toggleSidebar() {
      dispatch(setSmallSidebar());
    }

 
   

    return (
      <div className="w-full flex ">
        <div className={`${smallSidebar ? "w-[80px]" : "w-[256px]"}`}>
          <Sidebar
            setMessageDialogOpen={setMessageDialogOpen}
            setSearchDialogOpen={setSearchDialogOpen}
            sidebar={smallSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
        {sidebarItem == "search" ? <SearchDialog /> : null}
        {sidebarItem == "message" ? <ChatList /> : null}
        {createChat ? <CreateChatDialog/> : null}
        {sidebarItem == "notification" ? <NotificationDialog/> : null}
        {createPost && <CreatePost/> }
        <Component />
      </div>
    );
  };
};

export default AppLayout;
