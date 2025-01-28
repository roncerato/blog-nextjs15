"use client"
import { ISidebarMainProps } from "./SidebarMain.props";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMain({ posts }: ISidebarMainProps) {

    const pathname = usePathname()

    const postId = pathname?.match(/^\/post\/(?!new$)([a-zA-Z0-9]+)/)?.[1] || null;

    return (
        <main className="px-2 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800 scrollbar-custom">
            {posts.map(post => (
                <Link
                    className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${postId === post._id ? "bg-white/20 border-white" : ""}`}
                    key={String(post._id)}
                    href={`/post/${post._id}`}>
                    {post.topic}
                </Link>
            ))}
        </main>
    )
}

