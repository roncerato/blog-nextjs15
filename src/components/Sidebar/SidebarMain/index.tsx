"use client";
import { ISidebarMainProps } from "./SidebarMain.props";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDataContext } from "@/context/DataContext";
import PostsListItem from "@/components/PostsListItem";

export default function SidebarMain({ }: ISidebarMainProps) {

    const { posts, setPosts } = useDataContext()
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/getPosts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setPosts(data.posts)
        }
        fetchData()
    }, [])
    const pathname = usePathname();
    const postId = useMemo(() => {
        return pathname?.match(/^\/post\/(?!new$)([a-zA-Z0-9]+)/)?.[1] || null;
    }, [pathname]);

    return (
        <main className="px-2 flex-1 scrollbar-custom">
            {
                posts.length === 0 && (
                    <span className="block text-center flex-1">
                        Loading...
                    </span>
                )
            }
            {posts && (<ul>
                {posts && posts.map(post => (
                    <PostsListItem key={String(post._id)} postId={postId} post={post} />
                ))}
            </ul>)}
        </main>
    );
}
