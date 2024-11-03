import { Avatar } from "@mui/material";
import axios from "axios";
import { CircleX } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts";


const SearchDialog = () => {

    const [searchValue,setSearchValue] = useState("");
    const [debouncedSearchValue,setDebouncedSearchValue] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [users,setUsers] = useState([]);


    const debouncedValue = useDebounceCallback(setDebouncedSearchValue,500);


    useEffect(() => {


        if (debouncedSearchValue) {

            async function searchUser() {
                try {
    
                    const {data} = await axios.get(`http://localhost:4000/api/users/get/n/users?name=${debouncedSearchValue}`);
    
                    setUsers(data?.data);
                    
                } catch (error : any) {
                    console.log('error while searching user: ',error);
                    setError(error);
                }
            }
            
            searchUser();
        }

    },[debouncedSearchValue]);



  return (
    <div className="w-[300px] h-full ml-[80px] rounded-md bg-white shadow-xl fixed ">

        <h1 className="text-black/90 font-semibold pt-5 pl-5 text-[24px]">Search</h1>

    <div className="w-full px-2 pt-5 h-[100px] border-b-[2px] border-black/5">

        <div className="w-full h-[40px] relative">
        <input value={searchValue} onChange={(e) => {
            setSearchValue(e.target.value);
            debouncedValue(e.target.value);
        }} className="bg-[#f0f0f0] w-full h-full pl-3 outline-none text-[14px] placeholder:text-[13px] rounded-lg" placeholder="Search"/>
        <span className="absolute right-2 top-2 cursor-pointer">
            <CircleX/>
        </span>
        </div>
    </div>

    <div className="w-full px-2 h-full ">
        {
            users.map((user,idx) => (
                <SearchedUser key={idx} user={user}/>
            ))
        }

    </div>
      
    </div>
  )
}


const SearchedUser = ({user} : {user : any}) => {


    return (
        <div className="w-full h-[100px] flex items-center">

            <Avatar src={user?.avatar}/>

            <p>{user?.username}</p>

        </div>
    )
}

export default SearchDialog;
