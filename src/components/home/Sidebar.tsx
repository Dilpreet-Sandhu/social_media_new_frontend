import {
  Compass,
  Heart,
  Home,
  InstagramIcon,
  MessageCircleReply,
  Search,
  Settings,
  VideoIcon,
} from "lucide-react";
import { useState } from "react";
import SidebarItem from "../extra/SidebarItem";
import UserAvatar from "../extra/UserAvatar";

interface sidebarItems {
  path?: string;
  text: string;
  icon: any;
  changeHandler?: any;
  searchDialogOpen : boolean;
  setSearchDialogOpen : any;
  setMessageDialogOpen  :any;
}

const Sidebar = ({sidebar,toggleSidebar,setMessageDialogOpen,setSearchDialogOpen} : {sidebar : boolean,toggleSidebar : () => void;setSearchDialogOpen : any;
  setMessageDialogOpen  :any;}) => {



  function handleSearchDialog() {
      toggleSidebar();
      setSearchDialogOpen((prev : boolean) => !prev);
  }
  
  function handleMessageDialog() {
      setMessageDialogOpen((prev : boolean) => !prev);
  }

  
  return (
    <div className={`max-h-screen ${ sidebar ? "w-[80px]" : "w-[260px]" }  top-0 bottom-0  fixed border-r-[2px] duration-500 transition-all border-gray-200`}>
      <div className="w-full h-16 flex gap-2 items-center pl-5 border-b-[2px] bg-gray-50  border-gray-200">
        <InstagramIcon />
        {
          !sidebar &&   <p className="text-[18px]  font-semibold tracking-wide ">Instagram</p>
        }
      
      </div>

        {
          !sidebar &&    <p className="text-[10px] mb-2 font-medium pt-5 text-black/40 pl-10">MAIN</p>
        }
   

      <div className="w-full pl-7 flex flex-col h-[500px] ">

       
        <SidebarItem smallSidebar={sidebar} label="Home" path="/" icon={<Home/>}/>
        <SidebarItem smallSidebar={sidebar} label="Search" onClick={handleSearchDialog}  icon={<Search/>}/>
        <SidebarItem smallSidebar={sidebar} label="Explore" path="/explore"  icon={<Compass/>}/>
        <SidebarItem smallSidebar={sidebar} label="Reels" path="/reels"  icon={<VideoIcon/>}/>
        <SidebarItem smallSidebar={sidebar} label="Messages" onClick={handleMessageDialog}  icon={<MessageCircleReply/>}/>
        <SidebarItem smallSidebar={sidebar} label="Notifications" path="/notifications"  icon={<Heart/>}/>
        <UserAvatar/>
  

      </div>
      <div className="w-full pt-5 mb-2 h-[122px] ">

        {
          !sidebar && <p className="text-[10px] mb-2 font-medium pt-5 text-black/40 pl-10">SETTING</p>
        }

      
      <div className="pl-7">

        <SidebarItem smallSidebar={sidebar} label="Settings" path="/settings" icon={<Settings/>}/>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
