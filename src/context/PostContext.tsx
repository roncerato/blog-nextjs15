"use client"
import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IPostsContextProps {
    posts: WithId<IDBPost>[] | []
    setPostsFromSSR: (postsFromSSR: WithId<IDBPost>[] | []) => void
    getPosts: ({ lastPostDate }: {
        lastPostDate: Date;
    }) => Promise<void>
    noMorePosts: boolean
}

const PostsContext = createContext<IPostsContextProps | undefined>(undefined);

export default PostsContext;

export const PostsProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<WithId<IDBPost>[] | []>([])
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false)
    const setPostsFromSSR = useCallback((postsFromSSR: WithId<IDBPost>[] | [] = []) => {
        setPosts(value => {
            const newPosts = [...value];
            postsFromSSR.forEach(post => {
                const exists = newPosts.find((p) => p._id === post._id)
                if (!exists) {
                    newPosts.push(post)
                }

            });
            return newPosts
        })
    }, [])
    const getPosts = useCallback(async ({ lastPostDate }: { lastPostDate: Date }) => {
        const result = await fetch('/api/getPosts', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ lastPostDate })

        });
        const json = await result.json() as { posts: WithId<IDBPost>[] }
        const postsResult = json.posts;
        console.log("Posts RESULT: ", postsResult)
        if (postsResult.length < 5) {
            setNoMorePosts(true)
        }
        setPosts(value => {
            const newPosts = [...value];
            postsResult.forEach(post => {
                const exists = newPosts.find((p) => p._id === post._id)
                if (!exists) {
                    newPosts.push(post)
                }

            });
            return newPosts
        })
    }, [])
    return (
        <PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts, noMorePosts }}>
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