import { MouseEvent, ReactNode } from "react";
import { useParams } from "react-router-dom"
import { useGetSinglePostQuery } from "../redux/slices/apiSlice";
import PostInfo from "../components/singlePost/PostInfo";


const FullViewPost = () => {

   const params = useParams();
   const postId = params.postId;
  
    const {data,isLoading,isError} = useGetSinglePostQuery({postId : postId || ""});

 

    function handlePlay(e : MouseEvent<HTMLVideoElement>) {

      if (e.currentTarget.played) {
        e.currentTarget.play();
      }
      else {
        e.currentTarget.pause();
      }

    }


  return (
    <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
 // To close modal on background click
  >
    <div
      className="bg-white  rounded-lg h-[660px] max-w-[900px] flex w-full"
// Prevents modal content click from closing modal
    >

      <div className="w-1/2 flex items-center justify-center h-full border-r-[3px] border-zinc-200">

        <video autoPlay onClick={handlePlay} src={data?.data?.post?.url}/>

      </div>

      <PostInfo post={data?.data?.post} comments={data?.data?.comments}/>
      
    </div>
  </div>
  )
}

export default FullViewPost;
