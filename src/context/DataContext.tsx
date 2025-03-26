"use client"
import { IDBPost, IDBUser } from "@/types/db";
import { WithId } from "mongodb";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserData {
    profile: WithId<IDBUser> | null;
    posts: WithId<IDBPost>[];
}
interface IDataContext {
    availableTokens: number | undefined
    posts: WithId<IDBPost>[] | [] | undefined,
    setAvailableTokens: React.Dispatch<React.SetStateAction<number | undefined>>,
    setPosts: React.Dispatch<React.SetStateAction<WithId<IDBPost>[] | [] | undefined>>
}

export const DataContext = createContext<undefined | IDataContext>(undefined)

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [availableTokens, setAvailableTokens] = useState<number | undefined>(undefined)
    const [posts, setPosts] = useState<WithId<IDBPost>[] | [] | undefined>(undefined)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/getUserData', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json() as IUserData
            setPosts(data.posts)
            setAvailableTokens(data.profile?.availableTokens)
        }
        fetchData()
    }, []);

    return (
        <DataContext.Provider value={{ availableTokens, posts, setAvailableTokens, setPosts }}>
            {children}
        </DataContext.Provider>
    )
}
export const useDataContext = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider')
    }
    return context
}