import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useGetSinglePostQuery } from "../redux/slices/apiSlice";
import PostInfo from "../components/singlePost/PostInfo";
import {  X } from "lucide-react";


const FullViewPost = () => {

   const params = useParams();
   const postId = params.postId;
   const navigate = useNavigate();
  
    const {data,isFetching} = useGetSinglePostQuery({postId : postId || ""});

    const [comments,setComments] = useState<any[]>([]);

    function addNewComment(comment : any) {

        if (comment) {
          setComments(prev => [...prev,comment]);
        }

    }

    function handlePlay(e : MouseEvent<HTMLVideoElement>) {

      if (e.currentTarget.played) {
        e.currentTarget.play();
      }
      else {
        e.currentTarget.pause();
      }

    }

    const isImage = data?.data?.post?.url.split(".").at(-1) == "png" ? true : false;

    useEffect(() => {
      setComments(data?.data?.comments);
    },[isFetching])


  return (
    <div  onClick={() => navigate(-1)}
    className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
 // To close modal on background click
  >

    <div className="absolute top-5 right-5">
      <span onClick={() => navigate(-1)}  className="w-[30px] h-[30px] cursor-pointer rounded-full border-[2px] border-black flex items-center justify-center">
      <X/>
      </span>
    </div>

    <div  onClick={(e) => e.stopPropagation()}
      className="bg-white absolute z-20 rounded-lg h-[660px] max-w-[900px] flex w-full"
// Prevents modal content click from closing modal
    >

      <div className="w-1/2 flex items-center justify-center h-full border-r-[3px] border-zinc-200">
        {
       
        isImage ? <img src={data?.data?.post?.url}/> : (
          <video autoPlay onClick={handlePlay} src={data?.data?.post?.url}/>
        )
        }

      </div>

      <PostInfo post={data?.data?.post} comments={comments} handleAddComment={addNewComment}/>
      
    </div>
  </div>
  )
}

export default FullViewPost;
