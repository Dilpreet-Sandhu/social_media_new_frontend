import AppLayout from "@/layout/Applayout";
import { useGetExploreFeedQuery } from "@/redux/slices/apiSlice";
import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ExplorePage = () => {

    const {data} = useGetExploreFeedQuery();

  return (
    <div className="w-full px-24 flex items-center justify-center  py-5 h-screen">
        <div className="w-full h-full grid grid-cols-3 gap-2 p-4">

            {
                data?.data?.map((post : any,idx : number) => (
                    <ExplorePost key={idx} post={post} idx={idx}/>
                ))
            }

        </div>
    </div>
  )
}


const ExplorePost = ({post,idx} : {post : any,idx :number}) => {

    const isImage = post?.url.split(".").at(-1) === "png"  ? true : false;


    return (
        <Link to={`/p/${post?._id}`} className={`aspect-square group ${(idx % 5 == 0 && idx !== 0) && "row-span-2 col-span-1"} relative `}>
            {
                isImage ? <img  src={post?.url} className="object-cover w-full h-full"/> : <video autoPlay={true} className="w-full h-full object-cover" src={post?.url}/>
            }

            <div className="absolute inset-0 opacity-0 hover:opacity-100 flex gap-4 items-center justify-center bg-black/50">
                <p className="text-[20px] text-white flex items-center gap-1">
                    <span><Heart/></span>
                    {post?.likesCount}
                    </p>
                <p className="text-[20px] text-white flex items-center gap-1">
                    <span><MessageCircle/></span>
                    {post?.commentCount}
                    </p>
            </div>
           
        </Link>
    )
}

export default AppLayout()(ExplorePage);
