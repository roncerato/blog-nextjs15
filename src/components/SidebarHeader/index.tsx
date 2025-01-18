import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SidebarHeaderProps } from "./SidebarHeader.props"
import Link from "next/link"
import { faCoins } from "@fortawesome/free-solid-svg-icons"

export const SidebarHeader = async ({ }: SidebarHeaderProps) => {
    return (
        <header className="bg-slate-800 px-2">
            <div>Logo</div>
            <Link href="/post/new" className="bg-green-500 tracking-wider w-full text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-green-600 transition-colors block">
                New post
            </Link>
            <div>
                <Link href="/token-topup" className="flex mt-2 justify-center items-center">
                    <FontAwesomeIcon icon={faCoins} className="text-yellow-500" width={20}/>
                    <span className="pl-1">
                        0 tokens available
                    </span>
                </Link>

            </div>
        </header>
    )
}
