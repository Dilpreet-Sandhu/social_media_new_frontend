import { useCheckImage } from "@/hooks/isImage";
import { LucideCameraOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostsList({ posts }: { posts: any[] }) {
  return (
    <>
      {posts.length > 0 ? (
        <div className="flex gap-1 px-16 py-2 flex-wrap">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center flex-col gap-2">
            <span className="w-[60px] h-[60px] flex items-center justify-center rounded-full border-black border-[2px]">
            <LucideCameraOff/>
            </span>
            <p className="text-[20px] font-semibold tracking-wide text-black/80">No posts</p>
            </div>
      )}
    </>
  );
}

function Post({ post }: { post: any }) {

    const isImage = useCheckImage(post?.url);

  return (
    <Link to={`/p/${post?._id}`} className="h-[300px] w-[300px]">
      {
        isImage ? (
          <img className="w-full object-cover h-full" src={post?.url} />
        ) : <video src={post?.url} className="w-full object-cover h-full"/>
      }
    </Link>
  );
}
