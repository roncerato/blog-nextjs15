import { auth0 } from "@/lib/auth0"
import { SidebarFooterProps } from "./SidebarFooter.props"
import Image from "next/image"
import Logout from "@/assets/logout.svg"
export const SidebarFooter = async ({ }: SidebarFooterProps) => {
    const session = await auth0.getSession()

    return (
        <footer className="flex items-center gap-2 px-2 py-4">
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
                        <div className="flex-1 overflow-hidden flex justify-between items-center">
                            <div>
                                <h2 className="font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap text-black">
                                    {session.user.given_name} <br />
                                    {session.user.family_name}
                                </h2>
                            </div>
                            <a href="/auth/logout">
                                <Logout />
                            </a>
                        </div>
                    </>
                )
            }
        </footer>
    )
}
