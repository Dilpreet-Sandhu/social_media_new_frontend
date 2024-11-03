import { useGetUserPosts } from "../../hooks/getUserPosts"
import Loading from "../../loaders/Loading";
import { useGetSavedPostQuery } from "../../redux/slices/apiSlice";
import PostsList from "./PostsList";


export default function Posts({userId,showPosts} : {userId : string,showPosts : string}) {

    const {data,loading} = useGetUserPosts(userId);

    const {data : savedPostsData} = useGetSavedPostQuery();

    console.log(data);
    

  return (
    <div className="w-full ">
      {
        loading ? <Loading/> : showPosts === "posts" ? <PostsList posts={data?.data}/>  : <PostsList posts={savedPostsData?.data?.posts}/>
      }

     
    </div>
  )
}
