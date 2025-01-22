import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SidebarHeaderProps } from "./SidebarHeader.props"
import Link from "next/link"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { Logo } from "@/components/Logo"
import { auth0 } from "@/lib/auth0"
import clientPromise from "@/lib/mongodb"
import { IDBUser } from "@/types/db"

export const SidebarHeader = async ({ }: SidebarHeaderProps) => {
    const userSession = await auth0.getSession();
    const client = await clientPromise;
    const db = client.db("BlogStandart")
    const user = await db.collection<IDBUser>("users").findOne({
        auth0Id: userSession?.user.sub
    })
    return (
        <header className="bg-slate-800 px-2">
            <Logo />
            <Link href="/post/new" className="btn">
                New post
            </Link>
            <div>
                <Link href="/token-topup" className="flex mt-2 justify-center items-center">
                    <FontAwesomeIcon icon={faCoins} className="text-yellow-500" width={20} />
                    <span className="pl-1">
                        {user?.availableTokens || 0} tokens available
                    </span>
                </Link>

            </div>
        </header>
    )
}
