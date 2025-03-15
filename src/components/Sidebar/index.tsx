
"use client"
import { useState, useEffect } from "react";
import { ISidebarProps } from "./Sidebar.props";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import SidebarMain from "./SidebarMain";
import DataProvider from "@/context/DataContext";
import { IDBPost, IDBUser } from "@/types/db";
import { WithId } from "mongodb";

interface IUserData {
    profile: WithId<IDBUser> | null;
    posts: WithId<IDBPost>[];
}

export default function Sidebar({ }: ISidebarProps) {

    const [posts, setPosts] = useState<WithId<IDBPost>[] | []>([]);
    const [availableTokens, setAvailableTokens] = useState<number | undefined>(0);

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
        <aside className="flex flex-col bg-[#F7F7F7] border-r-[1px] border-[#e5e7eb] max-h-full">
            <DataProvider>
                <SidebarHeader availableTokens={availableTokens} />
                <SidebarMain posts={posts} />
            </DataProvider>
            <SidebarFooter />
        </aside>
    )
}