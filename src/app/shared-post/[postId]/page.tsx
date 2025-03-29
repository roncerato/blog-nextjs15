import PostBody from "@/components/PostBody";
import clientPromise from "@/lib/mongodb";
import { IDBPost } from "@/types/db";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";


export default async function SharedPost({ params }: { params: Promise<{ postId: string }> }) {
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
  return (
    <PostBody post={post}/>
  );
}