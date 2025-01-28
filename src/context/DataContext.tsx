"use client"
import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";
import { createContext, useContext, useState } from "react";


interface IDataContext {
    availableTokens: number | undefined
    posts: WithId<IDBPost>[] | [],
    setAvailableTokens: React.Dispatch<React.SetStateAction<number | undefined>>,
    setPosts: React.Dispatch<React.SetStateAction<WithId<IDBPost>[] | []>>
}

export const DataContext = createContext<undefined | IDataContext>(undefined)

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [availableTokens, setAvailableTokens] = useState<number | undefined>(undefined)
    const [posts, setPosts] = useState<WithId<IDBPost>[] | []>([])

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