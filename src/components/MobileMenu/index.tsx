"use client"

import { Icons } from "@/assets/Icons";
import { useDataContext } from "@/context/DataContext";
import { useMenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { SidebarFooter } from "../Sidebar/SidebarFooter";
import { SidebarHeader } from "../Sidebar/SidebarHeader";
import SidebarMain from "../Sidebar/SidebarMain";
import { useOutsideClick } from "@/hooks/useOutsideClick";
export default function MobileMenu() {
    const { isMobileOpen, setIsMobileOpen } = useMenuContext()
    const { availableTokens } = useDataContext()
    const ref = useOutsideClick(() => setIsMobileOpen(false))
    return (
        <>
            <div className={`absolute top-0 left-0 p-4 grid gap-2 grid-cols-2 w-full md:hidden backdrop-blur z-40 bg-white/65`}>
                <div className={`grid gap-2 col-start-1 col-end-2 row-start-1 row-end-2 content-start justify-start grid-cols-[auto,auto]`}>
                    <button
                        className={``}
                        onClick={() => setIsMobileOpen(prev => !prev)}>
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
                <div className={`col-start-1 col-end-3 row-start-1 row-end-2 justify-self-center ${!isMobileOpen ? "opacity-100" : "opacity-0"}`}>
                    <Icons.Logo className="w-20" />
                </div>
            </div>
            <aside ref={ref} className={`bg-[#F7F7F7] border-r-[1px] border-[#e5e7eb] overflow-hidden flex-1 ${isMobileOpen ? "max-w-[300px]" : "max-w-[0px]"} transition-all absolute top-0 left-0 w-full h-full z-50 md:hidden block`}>
                <div className="flex flex-col h-full w-[300px] absolute">
                    <SidebarHeader isMenuOpened={isMobileOpen} setIsMenuOpened={setIsMobileOpen} />
                    <SidebarMain device='mobile' />
                    <SidebarFooter />
                </div>
            </aside>
        </>
    )
}