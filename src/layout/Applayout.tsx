import { lazy, ReactNode, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setSmallSidebar } from "../redux/slices/miscSlice";
const SearchDialog = lazy(() => import("../components/home/SearchDialog"));


const AppLayout = () => (Component : () => ReactNode) => {
    return (props : any) => {

        const [searchDialogOpen,setSearchDialogOpen] = useState(false);
        const [messageDialogOpen,setMessageDialogOpen] = useState(false);

        const {smallSidebar} = useAppSelector(state => state.misc);
        const dispatch = useDispatch();


        function toggleSidebar() {
            dispatch(setSmallSidebar());
        }


        return <div className="w-full flex ">
           <div className="w-[260px]">
           <Sidebar  setMessageDialogOpen={setMessageDialogOpen} setSearchDialogOpen={setSearchDialogOpen} sidebar={smallSidebar} toggleSidebar={toggleSidebar}/>
           </div>
           {
            searchDialogOpen &&   <SearchDialog/>
           }
        
           <Component/>
        </div>
    }
}


export default AppLayout;