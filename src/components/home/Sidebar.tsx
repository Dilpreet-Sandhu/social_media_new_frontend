import {
  closeSmallSidebar,
  setCreatePost,
  setSidebarItemHome,
  setSidebarItemMessage,
  setSidebarItemNotification,
  setSidebarItemSearch
} from "@/redux/slices/miscSlice";
import { useAppSelector } from "@/redux/store";
import {
  Compass,
  Heart,
  Home,
  InstagramIcon,
  LogOut,
  MessageCircleReply,
  PlusCircle,
  Search,
  VideoIcon
} from "lucide-react";
import { useDispatch } from "react-redux";
import SidebarItem from "../extra/SidebarItem";
import UserAvatar from "../extra/UserAvatar";
import { useLogoutMutation } from "@/redux/slices/apiSlice";
import { useNavigate } from "react-router-dom";
import { removeUser } from "@/redux/slices/userSlice";




const Sidebar = ({
  sidebar,
  toggleSidebar,

}: {
  sidebar: boolean;
  toggleSidebar: () => void;
  setSearchDialogOpen?: any;
  setMessageDialogOpen?: any;
}) => {
  const dispatch = useDispatch();
  const {smallSidebar,sidebarItem} = useAppSelector(state => state.misc);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  function handleSearchDialog() {

    
    if (sidebarItem == "search") {
      dispatch(setSidebarItemHome());
    }
    
    if (smallSidebar) {
      dispatch(setSidebarItemSearch());
      return;
    }
    toggleSidebar();

    dispatch(setSidebarItemSearch());
  }

  function handleMessageDialog() {
    if (!sidebar) {
      toggleSidebar();
    }
    dispatch(setSidebarItemMessage());
  }

  function openNotificaitonDialog() {
    if (smallSidebar) {
    dispatch(setSidebarItemNotification());
      return;
    }
    
    dispatch(setSidebarItemNotification());
    toggleSidebar();
  }

  function handleExploreClick() {
    dispatch(closeSmallSidebar());
    dispatch(setSidebarItemHome())
  }

  async function handleLogOut() {
    try {

      await logout();
      dispatch(removeUser())
      navigate('/login')
      
    } catch (error) {
      console.log("error while logging out",error);
    }
  }

  function handleCreatePost() {
    dispatch(setCreatePost());
  }

  return (
    <div
      className={`max-h-screen ${
        sidebar ? "w-[80px]" : "w-[260px]"
      }  top-0 bottom-0 z-10  fixed border-r-[2px] duration-500 bg-white transition-all border-gray-200`}
    >
      <div className="w-full h-16 flex gap-2 items-center pl-5 border-b-[2px] bg-gray-50  border-gray-200">
        <InstagramIcon />
        {!sidebar && (
          <p className="text-[18px]  font-semibold tracking-wide ">Instagram</p>
        )}
      </div>

      {!sidebar && (
        <p className="text-[10px] mb-2 font-medium pt-5 text-black/40 pl-10">
          MAIN
        </p>
      )}

      <div className="w-full pl-7 flex flex-col h-[500px] ">
        <SidebarItem
          onClick={() => {
            dispatch(closeSmallSidebar());
            dispatch(setSidebarItemHome())

          }}
          smallSidebar={sidebar}
          label="Home"
          path="/"
          icon={<Home />}
        />
        <SidebarItem
          smallSidebar={sidebar}
          label="Search"
          onClick={handleSearchDialog}
          icon={<Search />}
        />
        <SidebarItem
          smallSidebar={sidebar}
          onClick={handleExploreClick}
          label="Explore"
          path="/explore"
          icon={<Compass />}
        />
        <SidebarItem
          smallSidebar={sidebar}
          label="Reels"
          path="/reels"
          icon={<VideoIcon />}
        />
        <SidebarItem
          smallSidebar={sidebar}
          label="Messages"
          onClick={handleMessageDialog}
          icon={<MessageCircleReply />}
        />
        <SidebarItem
          smallSidebar={sidebar}
          label="Create"
          onClick={handleCreatePost}
          icon={<PlusCircle />}
        />
        <SidebarItem
          smallSidebar={sidebar}
          label="Notifications"
          onClick={openNotificaitonDialog}
          icon={<Heart />}
        />
        <UserAvatar />
      </div>
      <div className="w-full pt-5 mb-2 h-[122px] ">
        {!sidebar && (
          <p className="text-[10px] mb-2 font-medium pt-5 text-black/40 pl-10">
            MORE
          </p>
        )}

        <div className="pl-7">
          <SidebarItem
            smallSidebar={sidebar}
            onClick={handleLogOut}
            label="Logout"
            icon={<LogOut />}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
