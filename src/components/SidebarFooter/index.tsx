import { auth0 } from "@/lib/auth0"
import { SidebarFooterProps } from "./SidebarFooter.props"
import Image from "next/image"
export const SidebarFooter = async ({ }: SidebarFooterProps) => {
    const session = await auth0.getSession()

    return (
        <footer className="bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
            {
                !!session && (
                    <>
                        <div className="min-w-[50px]">

                            <Image
                                src={session.user.picture!}
                                alt={session.user.name!}
                                width={50}
                                height={50} 
                                className="rounded-full"
                                />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <h1 className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                                {session.user.email}
                            </h1>
                            <a href="/auth/logout" className="text-sm ">
                                Log out
                            </a>
                        </div>
                    </>
                )
            }
        </footer>
    )
}
