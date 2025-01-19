import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { IDBUser, IDBPosts } from "@/types/db";

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
        <div>
            <h1>
                Post Page
            </h1>
        </div>
    );
}