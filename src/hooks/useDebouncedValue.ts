import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";


export function useDebouncedValue() {

    
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
                    setLoading(true);
    
                    const {data} = await axios.get(`http://localhost:4000/api/users/get/n/users?name=${debouncedSearchValue}`);
    
                    setUsers(data?.data);

                    setLoading(false);
                    
                } catch (error : any) {
                    console.log('error while searching user: ',error);
                    setError(error);
                    setLoading(false);
                }
            }
            
            searchUser();
        }

    },[debouncedSearchValue]);


    return {searchValue,setSearchValue,debouncedValue,users,loading,error}

}