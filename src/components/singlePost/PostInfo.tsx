import { useAddCommentMutation, useGetLikedPostIdsQuery, useLikePostMutation } from "@/redux/slices/apiSlice";
import { Avatar } from "@mui/material";
import {
  Bookmark,
  Heart,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Share2Icon,
} from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

const PostInfo = ({ post, comments,handleAddComment }: { post: any; comments: any,handleAddComment : (comment : any) => void }) => {
  const [comment, setComment] = useState("");
  const {data : likedposts,isFetching,isLoading} = useGetLikedPostIdsQuery();
  const [createComment] = useAddCommentMutation();
  const [like,setLike] = useState(false);
  const [likesCount,setLikesCount] = useState(0);
  const [likePost] = useLikePostMutation();
  const [loading,setLoading] = useState(false);

  
  
  const alreadyLiked = useMemo(() => likedposts?.data.includes(post?._id),[likedposts]);
  useEffect(() => {
    setLike(alreadyLiked);
  },[alreadyLiked]);

  useEffect(() => {
      setLikesCount(post?.likesCount);
  },[isFetching]);

  


  async function handleLike() {

    setLike(prev => !prev);

    try {
      if(alreadyLiked) {
        setLikesCount(prev => prev--);
      }else {
        setLikesCount(prev => prev++);
      }
      const data = await likePost({postId : post?._id});

        console.log(data);
    } catch (error) {
      console.log("error while liking post",error);
      setLike(prev => !prev);
    }

  }

 

  async function addComment() {

    try {

      setLoading(true);

      const data = await createComment({postId : post?._id,comment,type : "post"});

      handleAddComment(data?.data?.data);

      setComment("");

      setLoading(false);
      
    } catch (error) {
      console.log('error while adding comment',error);
      setLoading(false);
    }finally {
      setLoading(false);
    }

  }

  return (
    <div className="w-1/2 h-full">
      {/* user info */}
      <div className="w-full flex justify-between items-center border-b-[3px] border-zinc-200 px-5 h-[60px]">
        <div className="flex items-center gap-3">
          <Avatar src={post?.owner?.avatar} />

          <p className="text-[16px] font-medium tracking-wide">
            {post?.owner?.username}
          </p>
        </div>

        <div className="">
          <MoreHorizontal />
        </div>
      </div>

      {/* commnets */}
      <div className="w-full h-[480px] ">
        {comments?.map((comment: any, idx: number) => {
          
          const commentTime = moment().from(comment?.createdAt);

          return <Comment key={idx} comment={comment} commentTime={commentTime} />;
        })}
      </div>

      <div className="w-full border-t-[3px] border-zinc-200 h-[120px]">
        {/* likes,comments save */}
        <div className="flex py-2 items-center justify-between px-4">
          <div className="flex gap-3 items-center">
            <Heart style={{fill : like ? "red" : "transparent",borderColor : like ? "red" : "transparent"}} onClick={handleLike} className="cursor-pointer hover:text-gray-500" />
            <MessageCircle className="cursor-pointer hover:text-gray-500" />
            <Share2Icon className="cursor-pointer hover:text-gray-500" />
          </div>

          <div>
            <Bookmark className="cursor-pointer hover:text-gray-500" />
          </div>
        </div>

        <div className="w-full px-4 ">
          <p className="text-[14px] font-medium text-black/80">
            {likesCount} likes
          </p>
          <p></p>
        </div>

        <div className="">
          <form onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }} className="w-full h-[50px]  border-t-[3px] flex  border-zinc-200">

          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="outline-none border-none px-3 text-black/70 placeholder:text-[14px] placeholder:text-black/40 w-[400px] h-full bg-none"
            placeholder="Add a comment..."
          />

          <button 
          disabled={loading}
            className={`w-[100px] h-full flex items-center justify-center  ${
              comment.length > 0 ? "text-blue-800 font-bold" : "text-blue-400"
            }`}
          >
            {loading ? <Loader2/> : "Post" }
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;

const Comment = ({
  comment,
  commentTime,
}: {
  comment: any;
  commentTime: any;
}) => {
  return (
    <div className="w-full h-[50px] px-4  my-1 flex items-center justify-between">
      <div className="flex  gap-2">
        <Avatar src={comment?.commentedBy?.avatar} />
        <div className="py-1 flex flex-col justify-between">
          <p className="text-[14px] text-black/70 font-medium">
            {comment?.commentedBy?.username}
          </p>
          <p className="text-[11px] font-normal tracking-tight">{commentTime}</p>
        </div>
        <div className="py-1">
            <p className="text-[14px] text-black font-medium">{comment?.content}</p>
        </div>
      </div>
      <div>
        <Heart className="size-5"/>
      </div>
    </div>
  );
};
