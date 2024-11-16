import { useInfiniteScrollBottom } from "6pp";
import { useInfiniteScrollCustom } from "@/hooks/useInfiniteScrollCustom";
import { useGetFeedReelsQuery } from "@/redux/slices/apiSlice";
import axios from "axios";
import { useEffect, useRef, useState, forwardRef } from "react";

const Reels = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [reels, setReels] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement | null>();

  const fetchReels = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/post/get/feed/reels?page=${page}`
    );

    console.log(data);

    setReels((prev) => [...prev, data?.data?.reels]);
    setPage((prev) => prev + 1);

    if (data?.data?.reels?.length === 0) setHasMore(false);
  };

  const lastReelRef = useInfiniteScrollCustom({
    fetchMore: fetchReels,
    hasMore,
  });

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    const reelsElement = document.getElementById("reels-div");

    reelsElement?.addEventListener("wheel", (e) => {
      containerRef.current?.scrollBy({
        top: e.deltaY * 0.1,
        behavior: "smooth",
      });
    });
  });

  return (
    <div
      id="reels-div"
      className="w-full h-full overflow-y-scroll  scroll-slow snap-y snap-mandatory mt-[100px] mb-[50px] ml-[350px]"
    >
      {reels.map((reel: any, idx: number) => {



        return (
          <ReelComponent
            key={reel?._id}
            idx={idx}
            ref={lastReelRef}
            length={reels.length}
            reel={reel}
          />
        );
      })}
    </div>
  );
};

const ReelComponent = forwardRef<any, any>(({ reel, idx, length }, ref) => {
  return (
    <div
      className={`w-[350px] re snap-start h-[600px] relative my-10 rounded-md ${
        idx == length - 1 ? ref : null
      } bg-black`}
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
        onEnded={(e) => e.currentTarget.pause()}
        src={reel?.url}
      />
    </div>
  );
});

export default Reels;
