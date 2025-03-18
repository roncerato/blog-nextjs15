"use client";

import { SidebarHeaderProps } from "./SidebarHeader.props"
import Link from "next/link"
import { useDataContext } from "@/context/DataContext";
import { Icons } from "@/assets/Icons";
import { useMenuContext } from "@/context/MenuContext";
export const SidebarHeader = ({ }: SidebarHeaderProps) => {

    const { availableTokens } = useDataContext()
    const { setIsOpen, isOpen } = useMenuContext()

    return (
        <header className="px-4">
            <div className="pt-4 flex justify-between">
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className={`${isOpen ? "rotate-0" : "rotate-180"} transition-transform`}
                >
                    <Icons.HideSidebar fill="#ADADAE" height={24} width={24} className="hover:fill-[#6e6e6e]" />
                </button>

                <Link
                    href={!!availableTokens ? "/post/new" : "#"}
                    className={`flex justify-center items-center ${!!availableTokens ? "cursor-pointer" : "cursor-not-allowed"}`}
                    aria-disabled={!!availableTokens}
                    aria-label="Create a new post"
                    title="Create a new post"
                >
                    <Icons.Plus fill="#ADADAE" height={18} width={18} className="hover:fill-[#6e6e6e]" />
                </Link>
            </div>
            <div className="flex justify-between items-center mt-6 mb-4">
                <Icons.Logo className="w-20" />
                <Link href="/token-topup" className="flex justify-center gap-1 items-center" title="Top up your tokens">
                    <Icons.Token width={20} height={20} />
                    <h5 className="text-black font-semibold leading-1">
                        {availableTokens ? availableTokens : 0}
                    </h5>
                </Link>

            </div>
        </header>
    )
}
