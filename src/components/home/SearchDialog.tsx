import UserProfileLoader from "@/loaders/userProfileLoaders";
import { closeSmallSidebar, setSidebarItemHome } from "@/redux/slices/miscSlice";
import { Avatar } from "@mui/material";
import axios from "axios";
import { motion } from 'framer-motion';
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounceCallback } from "usehooks-ts";


const SearchDialog = () => {

    const [searchValue,setSearchValue] = useState("");
    const [debouncedSearchValue,setDebouncedSearchValue] = useState("");
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);



    const debouncedValue = useDebounceCallback(setDebouncedSearchValue,500);


    useEffect(() => {


        if (debouncedSearchValue) {

            async function searchUser() {
                try {
                    setLoading(true);
    
                    const {data} = await axios.get(`http://localhost:4000/api/users/get/n/users?name=${debouncedSearchValue}`);
    
                    setUsers(data?.data);

                    setLoading(false);
                    
                } catch (error : any) {
                    console.log('error while searching user: ',error);
                    setLoading(false);
                }
            }
            
            searchUser();
        }

    },[debouncedSearchValue]);


  


  return (
    <motion.div initial={{width : "0"}} whileInView={{width : "300px"}}  className="w-[300px] h-full ml-[80px] z-10 rounded-md bg-white shadow-xl fixed ">

        <h1 className="text-black/90 font-semibold pt-5 pl-5 text-[24px]">Search</h1>

    <div className="w-full px-2 pt-5 h-[100px] border-b-[2px] border-black/5">

        <div className="w-full h-[40px] relative">
        <input value={searchValue} onChange={(e) => {
            setSearchValue(e.target.value);
            debouncedValue(e.target.value);
        }} className="bg-[#f0f0f0] w-full h-full pl-3 outline-none text-[14px] placeholder:text-[13px] rounded-lg" placeholder="Search"/>
        <span onClick={() => setSearchValue("")} className="absolute right-2 top-2 cursor-pointer">
            <CircleX/>
        </span>
        </div>
    </div>

    <div className="w-full px-2 h-full ">
        {
            users.map((otherUser : any,idx) => {

                // const mutuals = otherUser.followers.map((follower : any) => {

                //     if (user?.following.includes(follower?._id)) {
                //         return otherUser?.follower?.username;
                //     }

                // })



                return loading ? <UserProfileLoader key={idx}/> : <SearchedUser  key={idx} user={otherUser}/>
})
        }

    </div>
      
    </motion.div>
  )
}


const SearchedUser = ({user} : {user : any,mutuals? : any}) => {

    const dispatch = useDispatch();


    return (
        <Link onClick={() => {

            dispatch(closeSmallSidebar());
            dispatch(setSidebarItemHome());
            }} to={`/${user?._id}`} className="w-full cursor-pointer pl-2 h-[50px] my-2 hover:bg-black/10 rounded-md gap-2 flex items-start">



            <Avatar sx={{width:"45px",height:"45px",alignSelf : "center"}} src={user?.avatar}/>


            <div>

            <p className="text-[14px] font-medium mt-1">{user?.username}</p>

            <p className="text-[13px] font-medium mb-1 text-black/70">{user?.followers?.length} followers</p>
            </div>

        </Link>
    )
}

export default SearchDialog;
