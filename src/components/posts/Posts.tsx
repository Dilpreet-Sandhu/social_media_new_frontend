
import { useAddCommentMutation, useGetCommentsOnPostQuery, useGetLikedPostIdsQuery, useGetSavedPostIdsQuery, useGetUserFeedQuery, useLikePostMutation, useSavePostMutation } from "../../redux/slices/apiSlice";

import { MouseEvent, useEffect, useMemo, useState } from "react";
import Post from "./Post";




const FeedPosts = ({location} : {location : any}) => {
  const { data: userFeed, isLoading, isError } = useGetUserFeedQuery();



  if (isLoading) return <div>loading posts..</div>;

  if (isError) return <div>error while loading posts</div>;

  return (
    <div className="w-full h-full flex items-center gap-4 flex-col">
      {
        userFeed?.data.length > 0 ? userFeed?.data?.map((post : any,idx : number) => <UserPost location={location} key={idx} post={post} />) : <div>no posts</div>
      }
      
    </div>
  );
};

export default FeedPosts;

const UserPost = ({ post,location }: { post: any,location : any }) => {

  // state variables
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked,setIsLiked] = useState(false); 
  const [isSaved,setIsSaved] = useState(false);
  const [showComments,setShowComments] = useState(false); 
  const [isPhoto,setIsPhoto] = useState(false);


  // rtk query queries
  const {data : likedposts} = useGetLikedPostIdsQuery();
  const {data : savedIds} = useGetSavedPostIdsQuery();
  const {data : comments} = useGetCommentsOnPostQuery({postId : post?._id});
  const [likePost] = useLikePostMutation();
  const [savePost] = useSavePostMutation();
  const [addCommentToPostApi] = useAddCommentMutation();


  const alreadyLiked = useMemo(() => likedposts?.data.includes(post?._id),[likedposts]);
  const alreadySaved = useMemo(() => savedIds?.data.includes(post?._id),[savedIds]);

  useEffect(() => {
    setIsLiked(alreadyLiked);
    setIsSaved(alreadySaved);
  },[alreadyLiked,alreadySaved]);

  useEffect(() => {

    if (comments?.data?.length > 0) {
      setShowComments(true);
    }
    
  },[comments])

  useEffect(() => {

    const arrayOfUrl = post?.url.split(".");

    const lastelement = arrayOfUrl?.at(-1);

    if (lastelement == "png" || lastelement == "jpg" || lastelement == "jpeg") {
      setIsPhoto(true);
    }

  },[])


  function handlePause(e: MouseEvent<HTMLVideoElement>) {

    setIsPaused(prev => !prev);

    if (isPaused) {
      e.currentTarget.play();
    } else {
      e.currentTarget.pause();
    }

  }


  async function handleLike() {

    setIsLiked(prev => !prev);

    try {
      await likePost({postId : post?._id});

    
      
    } catch (error) {
      console.log("error while liking post",error);
      setIsLiked(prev => !prev);
    }

  }

  

  async function handleSave() {

    setIsSaved(prev => !prev);


    try {

      const data = await savePost({postId : post?._id});

      console.log(data);

      
    } catch (error) {
      console.log("error while saving post: ",error);
      
    }

  }


  async function addComment(comment : string) {

    try {

       await addCommentToPostApi({postId : post?._id,comment,type : "post"});

      
    } catch (error) {
      console.log("error while adding comment: ",error);
    }

  }



  return (
   <Post comments={comments?.data} location={location} isPhoto={isPhoto} isSaved={isSaved} handleSave={handleSave} addComment={addComment} isLiked={isLiked} post={post} showComments={showComments} handleLikePost={handleLike} isPaused={isPaused} handlePause={handlePause}/>
  );
};
