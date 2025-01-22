import { auth0 } from "@/lib/auth0";
import { ISidebarMainProps } from "./SidebarMain.props";
import clientPromise from "@/lib/mongodb";
import { IDBPosts, IDBUser } from "@/types/db";

export default async function SidebarMain({ }: ISidebarMainProps) {
    const userSession = await auth0.getSession();
    const client = await clientPromise;
    const db = client.db("BlogStandart")
    const user = await db.collection<IDBUser>("users").findOne({
        auth0Id: userSession?.user.sub
    })

    const posts = await db.collection<IDBPosts>("posts")
        .find({ userId: user?._id })
        .sort({ created: -1 })
        .limit(5)
        .toArray()


    return (
        <main className="px-2 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800 scrollbar-custom">
            {posts.map(post => (
                <a
                    className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm`}
                    key={String(post._id)}
                    href={`/post/${post._id}`}>
                    {post.topic}
                </a>
            ))}
        </main>
    )
}

