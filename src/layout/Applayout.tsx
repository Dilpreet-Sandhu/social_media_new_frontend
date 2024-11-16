import { lazy, ReactNode, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setSmallSidebar } from "../redux/slices/miscSlice";
import { useLocation } from "react-router-dom";
import ChatList from "@/components/Messages/ChatList";

const NotificationDialog = lazy(() => import("@/components/Notification/NotificationDialog"));
const SearchDialog = lazy(() => import("../components/home/SearchDialog"));
const CreateChatDialog = lazy(() => import("@/components/Messages/CreateChatDialog"));

const AppLayout = () => (Component: () => ReactNode) => {
  return (props: any) => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    const location = useLocation();
    const { smallSidebar,createChat ,sidebarItem} = useAppSelector((state) => state.misc);
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
        {sidebarItem == "search" && <SearchDialog />}
        {sidebarItem == "message" && <ChatList />}
        {createChat && <CreateChatDialog/>}
        {sidebarItem == "notification" && <NotificationDialog/>}
        <Component />
      </div>
    );
  };
};

export default AppLayout;
