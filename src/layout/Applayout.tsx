import { lazy, ReactNode, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setSmallSidebar } from "../redux/slices/miscSlice";
import { useLocation } from "react-router-dom";
import ChatList from "@/components/Messages/ChatList";
import CreateChatDialog from "@/components/Messages/CreateChatDialog";
const SearchDialog = lazy(() => import("../components/home/SearchDialog"));

const AppLayout = () => (Component: () => ReactNode) => {
  return (props: any) => {
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    const location = useLocation();
    const { smallSidebar,createChat ,messageDialog} = useAppSelector((state) => state.misc);
    const dispatch = useDispatch();



    function toggleSidebar() {
      dispatch(setSmallSidebar());
    }

    console.log(messageDialog);
   

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
        {searchDialogOpen && <SearchDialog />}
        {messageDialog && <ChatList />}
        {createChat && <CreateChatDialog/>}
        <Component />
      </div>
    );
  };
};

export default AppLayout;
