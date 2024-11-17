import { useGetCommentsOnPostQuery } from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store"
import { X } from "lucide-react";
import { useEffect } from "react";
import CreateCommentButton from "./CreateCommentButton";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setReelCommentSectionOpen } from "@/redux/slices/miscSlice";
import {motion} from 'framer-motion';


const ReelCommentsDialog = () => {

  const {reelId} = useAppSelector(state => state.misc);

  const {data,isLoading,error,refetch} = useGetCommentsOnPostQuery({postId : reelId});
  const dispatch = useDispatch();

  console.log(data?.data);

  useEffect(() => {
    refetch();
  },[reelId])

  if (isLoading) return <div>loading...</div>;



  return (
    <motion.div initial={{scale : 0}} whileInView={{scale : 1}} className="w-[400px] absolute right-[100px] h-[600px] flex flex-col top-7 bg-black/20 rounded-xl">
      <div className="w-full border-b-[2px] flex items-center justify-between">
      <p className="text-[25px] px-4 py-3 text-black/90 ">Comments</p>
      <span onClick={() => dispatch(setReelCommentSectionOpen())} className="px-4 py-3 cursor-pointer"><X className="text-black/60"/></span>
      </div>
      <div className="flex-1 flex flex-col">

        <div className="flex-1 ">
          {
            data?.data?.length <= 0 ? <div className="w-full h-full flex items-center justify-center text-[20px]">No Comments</div> : data?.data?.map((comment : any) => (
              <CommentItem comment={comment}/>
            ))
          }
        </div>

        <CreateCommentButton/>
        
      </div>
    </motion.div>
  )
}

const CommentItem = ({comment} : {comment  : any}) => {

  return (
    <div className="w-full my-2 px-5 h-[40px] flex gap-2 items-center">
      <Avatar src={comment?.commentedBy?.avatar}/>
      <p>{comment?.content}</p>
    </div>
  )

}

export default ReelCommentsDialog
