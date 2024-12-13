
import { useGetFeedReelsQuery, useGetLikedPostIdsQuery, useLikePostMutation } from "@/redux/slices/apiSlice";
import { setReelCommentSectionOpen, setReelId } from "@/redux/slices/miscSlice";
import { useAppSelector } from "@/redux/store";
import { Avatar } from "@mui/material";
import { Heart, MessageCircle, Share } from "lucide-react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import ReelButton from "./ReelButton";
import ReelCommentsDialog from "./ReelComments";

const Reels = () => {
  const [page, setPage] = useState(1);
  const [reels, setReels] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement | null>();

  const {isReelCommentsOpen} = useAppSelector(state => state.misc);
  const {data,isFetching,isSuccess} = useGetFeedReelsQuery({page});
  const hasMore = isSuccess && page < (data?.data?.totalPages);


  const {ref : lastReelRef,inView} = useInView({
    threshold : 1.0,
    triggerOnce : false
  });


  useEffect(() => {
    if (isSuccess && data?.data?.reels && data?.data?.currentPage <= data?.data?.totalPages) {
      setReels(prev => [...prev,...data?.data?.reels]);
    }
  },[data,isSuccess]);


  useEffect(() => {

    if (inView && hasMore && !isFetching) {
      setPage((prev : number) => prev +1);
    }

  },[inView,hasMore,isFetching])
 

  useEffect(() => {
    const reelsElement = document.getElementById("reels-div");

    reelsElement?.addEventListener(
      "wheel",
      (e) => {
        containerRef.current?.scrollBy({
          top: e.deltaY * 0.05,
          behavior: "smooth",
        });
      },
      { passive: true }
    );
  });



  return (
    <>
    <div
      id="reels-div"
      className="w-full h-full overflow-y-scroll  scroll-slow snap-y snap-mandatory mt-[100px] mb-[50px] ml-[350px]"
    >
      {reels.map((reel: any, idx: number) => {

        const lastReel = idx == reels.length -1 ? lastReelRef : null;

        return (
          <ReelComponent
            key={reel?._id}
            idx={idx}
            ref={lastReel}
            length={reels.length}
            reel={reel}
          />
        );
      })}
    </div>
    {isReelCommentsOpen && <ReelCommentsDialog/>}
     
    </>
  );
};

const ReelComponent = forwardRef<any, any>(({ reel }, ref) => {

   
  const dispatch = useDispatch();


  return (
    <>
    <div
      className={`w-[350px]  snap-start h-[600px] relative my-10 rounded-md bg-black`}
      ref={ref}
    >
      <video
        onClick={(e) => {
          if (e.currentTarget.paused) {
            e.currentTarget.play();
          } else {
            e.currentTarget.pause();
          }
        }}
        className="w-full  rounded-md  h-full"
        autoPlay
        onPlaying={() => {
          dispatch(setReelId(reel?._id))
        }}
        onEnded={(e) => e.currentTarget.pause()}
        src={reel?.url}
      />
      <ReelButtons reelId={reel?._id}/>
      <ReelCreatorInfo user={reel?.owner}/>
    </div>
    </>
  );
});

const ReelButtons = ({reelId} : {reelId : string}) => {

  const [likePost] = useLikePostMutation();

  const {data : likedposts} = useGetLikedPostIdsQuery();
  const [like,setLike] = useState(false);
  const alreadyLiked = useMemo(() => likedposts?.data.includes(reelId),[likedposts]);
  useEffect(() => {
    setLike(alreadyLiked);
  },[alreadyLiked]);
  const dispatch = useDispatch();

  async function handleLikePost() {

    try {

      setLike(prev => !prev);
     await likePost({postId : reelId});
      
    } catch (error) {
      console.log("error while liking post",error);
      setLike(prev => !prev);
    }

  }

  function handleReelCommnet() {
    dispatch(setReelCommentSectionOpen());
    
  }
 


  return (
    <div className="absolute bottom-0 flex flex-col gap-2 items-center justify-end py-20  right-0 top-0  w-[70px]">

      <ReelButton alreadyLiked={like} onClick={handleLikePost} Reelicon={Heart} label="like"/>
      <ReelButton onClick={handleReelCommnet} Reelicon={MessageCircle} label="comment"/>
      <ReelButton Reelicon={Share} label="share"/>

    </div>
  )

}

const ReelCreatorInfo = ({user} : {user :any}) => {

  

  return (
    <div className="absolute bottom-0 flex items-center gap-2 px-5 h-[100px] left-0 right-0">

    <Avatar src={user?.avatar}/>
    <div>
      <p className="text-white">
        {user?.username}
      </p>
    </div>

    </div>
  )
}

export default Reels;
