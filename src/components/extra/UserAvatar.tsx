import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store"
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import {  closeSmallSidebar, setSidebarItemHome } from "@/redux/slices/miscSlice";


const UserAvatar = () => {

    const {user} = useAppSelector((state) => state.user);
    const {smallSidebar} = useAppSelector(state => state.misc);
    const dispatch = useDispatch();

  return (
    <Link onClick={() => {
      dispatch(closeSmallSidebar());
      dispatch(setSidebarItemHome())
    }}  to={`/${user?._id.trim()}`} className={` ${smallSidebar ? "w-[60px]" : "pl-2 w-[220px] hover:bg-black/10"} cursor-pointer items-center gap-2 text-[#5b5d63] flex my-2 rounded-md  h-[50px] `}>
    <Avatar sx={{width :"36px",height : "36px"}} src={user?.avatar}/>
    {
      !smallSidebar && <p className="text-[16px]">Profile</p>
    }
    
  </Link>
  )
}

export default UserAvatar
