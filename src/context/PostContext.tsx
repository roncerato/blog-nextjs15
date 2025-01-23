"use client"
import { IDBPosts } from "@/types/db";
import { WithId } from "mongodb";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IPostsContextProps {
    posts: WithId<IDBPosts>[] | []
    setPostsFromSSR: (postsFromSSR: WithId<IDBPosts>[] | []) => void
    getPosts: ({ lastPostDate }: {
        lastPostDate: Date;
    }) => Promise<void>
}

const PostsContext = createContext<IPostsContextProps | undefined>(undefined);

export default PostsContext;

export const PostsProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<WithId<IDBPosts>[] | []>([])
    const setPostsFromSSR = useCallback((postsFromSSR: WithId<IDBPosts>[] | [] = []) => {
        console.log("POSTS FROM SSR: ", postsFromSSR)
        setPosts(postsFromSSR)
    }, [])
    const getPosts = useCallback(async ({ lastPostDate }: { lastPostDate: Date }) => {
        const result = await fetch('/api/getPosts', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ lastPostDate })

        });
        const json = await result.json()
        const postsResult = json.posts;
        console.log("Posts RESULT: ", postsResult)
    }, [])
    return (
        <PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts }}>
            {children}
        </PostsContext.Provider>
    )
}
export const usePostsContext = (): IPostsContextProps => {

    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePostsContext must be used within a PostsProvider")
    }
    return context
}