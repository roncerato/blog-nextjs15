"use client"
import { useEffect } from "react";
import { ISidebarMainProps } from "./SidebarMain.props";
import { usePostsContext } from "@/context/PostContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMain({ posts: postsFromSSR }: ISidebarMainProps) {

    const { posts, setPostsFromSSR, getPosts, noMorePosts } = usePostsContext()

    const pathname = usePathname()

    const postId = pathname?.match(/^\/post\/(?!new$)([a-zA-Z0-9]+)/)?.[1] || null;
    const postCreated = postsFromSSR.find((post) => post._id === postId)?.createdAt || null;
    // Исправить баг с postCreated, если он находится не в списке первых пяти постов в postsFromSSR, он будет возвращать null

    useEffect(() => {
        setPostsFromSSR(postsFromSSR)
        if (postId && postCreated) {
            const exists = postsFromSSR.find(post => post._id === postId)
            if (!exists) {
                getPosts({ lastPostDate: postCreated, getNewerPosts: true })
            }
        }
    }, [getPosts, postCreated, postId, postsFromSSR, setPostsFromSSR])

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
            {!noMorePosts && (<button
                className="block hover:underline text-sm text-slate-400 text-center cursor-pointer mx-auto mt-4"
                onClick={() => {
                    getPosts({ lastPostDate: posts[posts.length - 1].createdAt })
                }}>
                Load more posts
            </button>)}
        </main>
    )
}

