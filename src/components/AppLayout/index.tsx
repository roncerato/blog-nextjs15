import DataProvider from "@/context/DataContext"
import Sidebar from "../Sidebar"
import { AppLayoutProps } from "./AppLayout.props"
import { auth0 } from "@/lib/auth0"
import { MenuProvider } from "@/context/MenuContext"
import MobileMenu from "../MobileMenu"

export const AppLayout = async ({ children }: AppLayoutProps) => {

    const session = await auth0.getSession()
    const isSession = session !== null

    return (
        <main className={`flex h-screen max-h-screen`}>
            <DataProvider>
                {
                    isSession && (
                        <MenuProvider>
                            <Sidebar />
                            <MobileMenu />
                        </MenuProvider>
                    )
                }
                <div className="flex-1">
                    {children}
                </div>
            </DataProvider>
        </main>
    )
}
