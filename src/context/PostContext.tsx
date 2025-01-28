"use client"
import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface IPostContextProps {
    post: WithId<IDBPost> | undefined
    setPost: Dispatch<SetStateAction<WithId<IDBPost> | undefined>>
}
export const PostContext = createContext<IPostContextProps | undefined>(undefined)

export default function PostProvider({ children }: { children: React.ReactNode }) {

    const [post, setPost] = useState<WithId<IDBPost> | undefined>(undefined)

    return (
        <PostContext.Provider value={{ post, setPost }}>
            {children}
        </PostContext.Provider>
    )
}

export const usePostContext = (): IPostContextProps => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePostsContext must be used within a PostsProvider")
    }
    return context
}