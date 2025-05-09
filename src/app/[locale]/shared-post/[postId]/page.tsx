import { Icons } from "@/assets/Icons";
import PostBody from "@/components/PostBody";
import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBPost } from "@/types/db";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";


export default async function SharedPost({ params }: { params: Promise<{ postId: string }> }) {
  const session = await auth0.getSession()
  const isSessionNull = session === null
  const { postId } = await params
  const client = await clientPromise;
  const db = client.db("BlogStandart")

  const post = await db.collection<IDBPost>("posts").findOne({
    _id: new ObjectId(postId),
    isShared: true
  })
  if (!post) {
    redirect("/post/new");
  }
  const showDownloadBtn = false
  return (
    <>
      {isSessionNull && <div className={`absolute top-0 left-0 p-4 grid w-full backdrop-blur z-40 bg-white/65`}>
        <div className={`col-start-1 col-end-2 row-start-1 row-end-2 justify-self-center `}>
          <Icons.Logo className="w-20" />
        </div>
      </div>}
      <PostBody post={post} showDownloadBtn={showDownloadBtn} />
    </>
  );
}