import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store"
import { Avatar } from "@mui/material";


const UserAvatar = () => {

    const {user} = useAppSelector((state) => state.user);
    const {smallSidebar} = useAppSelector(state => state.misc);

  return (
    <Link  to={`/${user?._id.trim()}`} className={`w-[220px] ${smallSidebar ? "" : "pl-2"} cursor-pointer items-center gap-2 text-[#5b5d63] flex my-2 rounded-md  h-[50px] hover:bg-black/10`}>
    <Avatar sx={{width :"36px",height : "36px"}} src={user?.avatar}/>
    {
      !smallSidebar && <p className="text-[16px]">Profile</p>
    }
    
  </Link>
  )
}

export default UserAvatar
