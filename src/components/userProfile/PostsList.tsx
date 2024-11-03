import { Link } from "react-router-dom"


export default function PostsList({posts} : {posts : any[]}) {
  return (
    <div className="grid px-20 gap-10 py-10 grid-cols-3">
        {
            posts.map((post) => (
                    <Post post={post}/>
            ))
        }
    </div>
  )
}


function Post({post} : {post : any}) {

    return (
        <Link to={`/post/${post?._id}`} className="h-[400px] w-[380px]">
            <img className="w-full object-cover h-full" src={post?.url}/>
        </Link>
    )

}