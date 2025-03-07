"use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SidebarHeaderProps } from "./SidebarHeader.props"
import Link from "next/link"
// import { faCoins } from "@fortawesome/free-solid-svg-icons"
import Logo from "@/assets/logo.svg"
import { useDataContext } from "@/context/DataContext";
import { useEffect } from "react";
import HideSidebar from "@/assets/hideSidebar.svg"
import Plus from "@/assets/plus.svg"
import Token from "@/assets/token.svg"
export const SidebarHeader = ({ availableTokens: tokens }: SidebarHeaderProps) => {

    const { availableTokens, setAvailableTokens } = useDataContext()
    useEffect(() => {
        setAvailableTokens(tokens)
    }, [setAvailableTokens, tokens])

    return (
        <header className="px-4">
            <div className="pt-4 flex justify-between">
                <HideSidebar fill="#ADADAE" height={24} width={24} className="hover:fill-[#6e6e6e]" />

                <Link
                    href={!!availableTokens ? "/post/new" : "#"}
                    className={`flex justify-center items-center ${!!availableTokens ? "cursor-pointer" : "cursor-not-allowed"}`}
                    aria-disabled={!!availableTokens}
                    aria-label="Create a new post"
                    title="Create a new post"
                >
                    <Plus fill="#ADADAE" height={18} width={18} className="hover:fill-[#6e6e6e]" />
                </Link>
            </div>
            <div className="flex justify-between items-center mt-6 mb-4">
                <Logo />
                <Link href="/token-topup" className="flex justify-center gap-1 items-center" title="Top up your tokens">
                    <Token width={20} height={20} />
                    <h5 className="text-black font-heading font-semibold leading-1 h-7">
                        {availableTokens ? availableTokens : 0}
                    </h5>
                </Link>

            </div>
        </header>
    )
}
