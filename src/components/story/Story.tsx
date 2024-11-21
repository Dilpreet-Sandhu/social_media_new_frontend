import { setCreateStory } from "@/redux/slices/miscSlice"
import { useAppSelector } from "@/redux/store"
import { Avatar } from "@mui/material"
import { PlusCircle } from "lucide-react"
import { useDispatch } from "react-redux"


const Story = () => {
  return (
    <div className="w-full flex items-center no-scrollbar overflow-x-scroll overflow-y-hidden h-full ml-20">
        <div className="flex flex-col items-center justify-center">
        <CreateMyStory/>
        </div>
    </div>
  )
}


const CreateMyStory = () => {

    const {user} = useAppSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <>
        <div onClick={() => dispatch(setCreateStory())} className="w-[53px] border-[2px] relative flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 h-[53px] cursor-pointer rounded-full">
            <Avatar sx={{width : '45px',height : "45px"}} src={user?.avatar}/>
            <span className="absolute bottom-[2px] right-[2px]  z-10">
            <PlusCircle fill="white" />
            </span>
        </div>
        <p className="text-[14px] font-medium text-black/60">Your story</p>
        </>
    )

}

export default Story
