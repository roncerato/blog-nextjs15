import { headers } from "next/headers"
import { AppLayoutProps } from "./AppLayout.props"
import { SidebarFooter } from "../SidebarFooter"
import { SidebarHeader } from "../SidebarHeader"
import { auth0 } from "@/lib/auth0"
import clientPromise from "@/lib/mongodb"
import { IDBPosts, IDBUser } from "@/types/db"

export const AppLayout = async ({ children }: AppLayoutProps) => {
    const headerList = await headers()
    const path = headerList.get("x-current-path")
    const isRoot = path === "/"
    const userSession = await auth0.getSession();
    const client = await clientPromise;
    const db = client.db("BlogStandart")
    const user = await db.collection<IDBUser>("users").findOne({
        auth0Id: userSession?.user.sub
    })

    const posts = await db.collection<IDBPosts>("posts").find({
        userId: user?._id
    }).sort({ created: -1 }).toArray()


    return (
        <main className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
            {
                !isRoot &&
                <aside className="flex flex-col text-white overflow-hidden">
                    <SidebarHeader availableTokens={Number(user?.availableTokens)} />
                    <main className="flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800">
                        {posts.map(post => (
                            <a
                                className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm`}
                                key={String(post._id)}
                                href={`/post/${post._id}`}>
                                {post.topic}
                            </a>
                        ))}
                    </main>
                    <SidebarFooter />
                </aside>
            }
            {children}
        </main>
    )
}
