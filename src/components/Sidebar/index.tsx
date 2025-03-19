/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect } from "react";
import { ISidebarProps } from "./Sidebar.props";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import SidebarMain from "./SidebarMain";
import { useDataContext } from "@/context/DataContext";
import { IDBPost, IDBUser } from "@/types/db";
import { WithId } from "mongodb";
import { useMenuContext } from "@/context/MenuContext";
import { Icons } from "@/assets/Icons";
import Link from "next/link";

interface IUserData {
    profile: WithId<IDBUser> | null;
    posts: WithId<IDBPost>[];
}

export default function Sidebar({ }: ISidebarProps) {

    const { setPosts, setAvailableTokens } = useDataContext()
    const { isOpen, setIsOpen } = useMenuContext()
    const { availableTokens } = useDataContext()
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
        <>
            <div className={`absolute top-0 left-0 p-4 grid gap-2 grid-cols-2 w-full`}>
                <div className={`grid gap-2 col-start-1 col-end-2 row-start-1 row-end-2 content-start justify-start grid-cols-[auto,auto]`}>
                    <button
                        className={``}
                        onClick={() => setIsOpen(prev => !prev)}>
                        <Icons.HideSidebar fill="#ADADAE" height={24} width={24} className="hover:fill-[#6e6e6e] rotate-180" />
                    </button>
                    <Link
                        href={!!availableTokens ? "/post/new" : "#"}
                        className={`flex justify-center items-center ${!!availableTokens ? "cursor-pointer" : "cursor-not-allowed"} h-6 w-6 `}
                        aria-disabled={!!availableTokens}
                        aria-label="Create a new post"
                        title="Create a new post">
                        <Icons.Plus fill="#ADADAE" height={18} width={18} className="hover:fill-[#6e6e6e]" />
                    </Link>
                </div>
                <div className={`col-start-1 col-end-3 row-start-1 row-end-2 justify-self-center ${!isOpen ? "opacity-100" : "opacity-0"}`}>
                    <Icons.Logo className="w-20" />
                </div>
            </div>
            <aside className={`bg-[#F7F7F7] border-r-[1px] border-[#e5e7eb] overflow-hidden flex-1 ${isOpen ? "max-w-[300px]" : "max-w-[0px]"} transition-all absolute top-0 left-0 w-full h-full md:relative z-50`}>
                <div className="flex flex-col h-full w-[300px] absolute">
                    <SidebarHeader />
                    <SidebarMain />
                    <SidebarFooter />
                </div>
            </aside>
        </>
    )
}