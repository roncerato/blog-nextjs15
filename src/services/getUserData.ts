import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBPost, IDBUser } from "@/types/db";


export async function getUserData() {
    const userSession = await auth0.getSession();
    const client = await clientPromise;
    const db = client.db("BlogStandart")
    const user = await db.collection<IDBUser>("users").findOne({
        auth0Id: userSession?.user.sub
    })

    const posts = await db.collection<IDBPost>("posts")
        .find({ userId: user?._id })
        .sort({ createdAt: -1 })
        // .limit(5)
        .toArray()

    return {
        posts: posts.map((post) => ({
            ...post,
            _id: post._id.toString(),
            userId: post.userId.toString(),
        })),
        availableTokens: user?.availableTokens
    }

}
