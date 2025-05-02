import { SidebarFooterProps } from "./SidebarFooter.props"
import Image from "next/image"
import { Icons } from "@/assets/Icons"
import { SessionData } from "@auth0/nextjs-auth0/server"
import { useEffect, useState } from "react"
import Link from "next/link"

export const SidebarFooter = ({ }: SidebarFooterProps) => {
    const [session, setSession] = useState<SessionData["user"] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/auth/profile`)
            console.log(res)
            const json = await res.json()
            setSession(json)

        }
        fetchData()
    }, [])

    return (
        <footer className="flex items-center gap-2 px-2 py-4">
            {
                !session && (
                    <div className="flex items-center justify-center flex-1 h-full">
                        <div className="w-6 h-6 border-2 border-[#ADADAE] border-t-[#4A90E2] rounded-full animate-spin "></div>
                    </div>
                )
            }

            {
                !!session && (
                    <>
                        <div className="min-w-[50px]">

                            <Image
                                src={session.picture!}
                                alt={session.name!}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex-1 overflow-hidden flex justify-between items-center">
                            <div>
                                <h2 className="font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap text-black">
                                    {session.given_name} <br />
                                    {session.family_name}
                                </h2>
                            </div>
                            <Link href="/auth/logout" passHref>
                                <Icons.Logout width={24} height={24} fill="#ADADAE" className="hover:fill-[#6e6e6e]" />
                            </Link>
                        </div>
                    </>
                )
            }
        </footer>
    )
}
