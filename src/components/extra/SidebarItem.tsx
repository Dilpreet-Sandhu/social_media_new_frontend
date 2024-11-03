
import { Link } from 'react-router-dom';

interface sidebarItemProps {
  icon : any;
  label :string;
  path ?: string;
  onClick? : () => void;
  smallSidebar : boolean;
  searchDailog ?: boolean;
}

const SidebarItem = ({icon,label,path,onClick,smallSidebar,searchDailog} : sidebarItemProps) => {
  return (
    
    <Link onClick={() => onClick && onClick() } to={path || ""} className={` ${smallSidebar ? "w-[50px] hover:bg-transparent pl-0" : "w-[220px] pl-2"} ${searchDailog && "shadow-lg"} cursor-pointer items-center gap-3 text-[#5b5d63] flex my-2 rounded-md  h-[50px] hover:bg-black/10`}>
    {icon}
    {
      !smallSidebar && <p className="text-[16px]">{label}</p>
    }
    
  </Link>
  )
}

export default SidebarItem
