"use client";
import { ISidebarMainProps } from "./SidebarMain.props";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useDataContext } from "@/context/DataContext";
import PostsListItem from "@/components/PostsListItem";

export default function SidebarMain({ }: ISidebarMainProps) {

    const { posts } = useDataContext()

    const pathname = usePathname();
    const postId = useMemo(() => {
        return pathname?.match(/^\/post\/(?!new$)([a-zA-Z0-9]+)/)?.[1] || null;
    }, [pathname]);

    return (
        <main className="px-2 flex-1 scrollbar-custom">
            {
                !posts && (
                    <div className="flex-1 h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#ADADAE] border-t-[#4A90E2] rounded-full animate-spin "></div>
                    </div>
                )
            }
            {
                posts && posts.length === 0 && (
                    <div className="flex-1 h-full flex items-center justify-center">
                        <span className="block text-center flex-1 italic font-heading text-sm text-[#ADADAE]">
                            No posts yet
                        </span>
                    </div>
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
