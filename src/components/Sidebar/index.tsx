import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBUser, IDBPosts } from "@/types/db";
import { ISidebarProps } from "./Sidebar.props";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import SidebarMain from "./SidebarMain";

export default async function Sidebar({ }: ISidebarProps) {
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
        <aside className="flex flex-col text-white overflow-hidden">
            <SidebarHeader availableTokens={user?.availableTokens} />
            <SidebarMain />
            <SidebarFooter />
        </aside>
    )
}