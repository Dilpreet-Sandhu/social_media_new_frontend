import { Avatar } from "@mui/material";
import {
  Bookmark,
  HeartIcon,
  MessageCircle,
  MoreHorizontal,
  Play,
  Share2Icon,
} from "lucide-react";
import { MouseEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "../auth/Input";
import Button from "../Button";

const Post = ({
  post,
  isPaused,
  handlePause,
  isLiked,
  handleLikePost,
  showComments,
  isPhoto,
  handleSave,
  isSaved,
  addComment,
  comments,
  location
}: {
  post: any;
  isLiked: boolean;
  isPaused: boolean;
  showComments: boolean;
  isPhoto: boolean;
  location : any;
  handlePause: (e: MouseEvent<HTMLVideoElement>) => void;
  handleLikePost: () => Promise<any>;
  handleSave: () => Promise<any>;
  isSaved: boolean;
  addComment: (comment: string) => void;
  comments: any[];
}) => {
  const [comment, setComment] = useState("");



  return (
    <>
      <div className="w-[460px] h-[700px] flex flex-col  rounded-md ">
        {/* post header */}
        <div className="w-full h-[50px] mt-2 justify-between px-4 items-center flex">
          <Link to={`/${post?.owner._id}`} className="flex items-center  py-3 gap-2">
            <Avatar
              sx={{ width: "40px", height: "40px" }}
              src={post?.owner?.avatar}
            />

            <p className="text-black/90 font-medium tracking-wide">
              {post?.owner?.username}
            </p>
          </Link>

          <div>
            <MoreHorizontal className="cursor-pointer" />
          </div>
        </div>

        {/* post */}
        <div className="w-full h-[440px] border-[3px] rounded-md border-gray-100 flex items-center justify-center relative">
          {isPhoto ? (
            <img className="w-full h-full object-cover" src={post?.url} />
          ) : (
            <>
              <video
                onClick={(e) => handlePause(e)}
                className="w-full h-full object-cover"
                autoPlay={true}
                src={post?.url}
              />

              {isPaused && (
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <Play className="w-20 h-20 text-white/30" />
                </div>
              )}
            </>
          )}
        </div>

        {/* bottom section */}
        <div className="w-full h-[100px]">
          <div className="w-full flex justify-between px-3 items-center h-[50px]">
            <div className="flex  gap-4">
              <HeartIcon
                onClick={handleLikePost}
                style={{
                  fill: isLiked ? "red" : "",
                  stroke: isLiked ? "red" : "GrayText",
                }}
                className={`cursor-pointer`}
              />

              <MessageCircle className="cursor-pointer stroke-gray-600" />

              <Share2Icon className="cursor-pointer stroke-gray-600" />
            </div>

            <div>
              <Bookmark
                onClick={handleSave}
                style={{
                  fill: isSaved ? "black" : "",
                }}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="px-4  text-black/80 font-medium text-[13px]">
            <p>{post?.likesCount} likes</p>

            <h1 className="text-black/90 mt-2 text-[15px] font-semibold my-1">
              {post?.title}
            </h1>
            <p className="text-black/60 mt-1 text-[13px] font-medium ">
              {post?.description}
            </p>
          </div>

          {comments?.length > 0 && (
            <div className={`px-4 text-[14px] text-black/80 mt-4 w-full`}>
              {!showComments ? (
                <></>
              ) : (
                <Link state={{background :location}} to={`/p/${post?._id}`} className="cursor-pointer">
                  view all {comments?.length} comments
                </Link>
              )}
            </div>
          )}
          <div className="w-full flex items-center justify-center px-4">
            <Input
              value={comment}
              setValue={(e) => setComment(e.target.value)}
              placeholder="comment"
              name="comment"
              width="340px"
            />
            <Button
              type="button"
              text="post"
              width="100px"
              height="40px"
              onClick={() => {
                addComment(comment);
                setComment("");
              }}
              buttonType="bgfilled"
            />
          </div>
        </div>
      </div>
      <div className="bg-black/70 w-[460px] h-[1px]" />
    </>
  );
};

export default Post;
