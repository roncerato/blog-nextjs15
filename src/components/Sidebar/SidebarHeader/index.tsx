"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SidebarHeaderProps } from "./SidebarHeader.props"
import Link from "next/link"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { Logo } from "@/components/Logo"
import { useDataContext } from "@/context/DataContext";
import { useEffect } from "react";

export const SidebarHeader = ({ availableTokens: tokens }: SidebarHeaderProps) => {

    const { availableTokens, setAvailableTokens } = useDataContext()
    useEffect(() => {
        setAvailableTokens(tokens)
    }, [setAvailableTokens, tokens])

    return (
        <header className="bg-slate-800 px-2">
            <Logo />
            <Link
                href={!!availableTokens ? "/post/new" : "#"}
                className={`btn ${!!availableTokens ? "" : "pointer-events-none opacity-50"}`}
                aria-disabled={!!availableTokens}
            >
                New post
            </Link>
            <div>
                <Link href="/token-topup" className="flex mt-2 justify-center items-center">
                    <FontAwesomeIcon icon={faCoins} className="text-yellow-500" width={20} />
                    <span className="pl-1">
                        {availableTokens ? availableTokens : 0} tokens available
                    </span>
                </Link>

            </div>
        </header>
    )
}
