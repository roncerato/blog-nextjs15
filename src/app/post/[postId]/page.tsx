import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { IDBUser, IDBPosts } from "@/types/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

export default async function Post({ params }: {params: Promise<{ postId: string }>}) {
    const { postId } = await params
    const userSession = await auth0.getSession();
    const client = await clientPromise;
    const db = client.db("BlogStandart")
    const user = await db.collection<IDBUser>("users").findOne({
        auth0Id: userSession?.user.sub
    })
    const post = await db.collection<IDBPosts>("posts").findOne({
        _id: new ObjectId(postId),
        userId: user?._id
    })
    if (!post) {
        redirect("/post/new");
      }
    return (
        <div className="overflow-auto h-full post-body">
        <div className="max-w-screen-sm mx-auto">
  
          <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
            SEO title & meta description
          </div>
  
          <div className="p-4 my-2 border border-stone-200 rounded-md">
            <div className="text-blue-600 text-2xl font-bold">{post.title}</div>
            <div className="mt-2">{post.metaDescription}</div>
          </div>
          <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
            Keywords
          </div>
          <div className="flex flex-wrap pt-2 gap-1">
            {post.keywords.split(",").map((keyword, i) => (
              <div key={i} className="p-2 rounded-full bg-slate-800 text-white flex">
                <FontAwesomeIcon icon={faHashtag} width={10}/> {keyword}
              </div>
            ))}
          </div>
          <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
            Blog post
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.postContent || "" }} />
          
        </div>
      </div>
    );
}