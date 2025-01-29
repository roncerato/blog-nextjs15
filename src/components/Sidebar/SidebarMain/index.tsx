"use client";
import { ISidebarMainProps } from "./SidebarMain.props";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDataContext } from "@/context/DataContext";
import PostsListItem from "@/components/PostsListItem";

export default function SidebarMain({ posts: initialPosts }: ISidebarMainProps) {

    const { posts, setPosts } = useDataContext()
    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts, setPosts])
    const pathname = usePathname();
    const postId = useMemo(() => {
        return pathname?.match(/^\/post\/(?!new$)([a-zA-Z0-9]+)/)?.[1] || null;
    }, [pathname]);

    return (
        <main className="px-2 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800 scrollbar-custom">
            <ul>
                {posts && posts.map(post => (
                    <PostsListItem key={String(post._id)} postId={postId} post={post} />
                ))}
            </ul>
        </main>
    );
}
