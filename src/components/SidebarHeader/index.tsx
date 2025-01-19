import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SidebarHeaderProps } from "./SidebarHeader.props"
import Link from "next/link"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { Logo } from "../Logo"
export const SidebarHeader = async ({ availableTokens }: SidebarHeaderProps) => {
    return (
        <header className="bg-slate-800 px-2">
            <Logo/>
            <Link href="/post/new" className="btn">
                New post
            </Link>
            <div>
                <Link href="/token-topup" className="flex mt-2 justify-center items-center">
                    <FontAwesomeIcon icon={faCoins} className="text-yellow-500" width={20}/>
                    <span className="pl-1">
                        {availableTokens} tokens available
                    </span>
                </Link>

            </div>
        </header>
    )
}
