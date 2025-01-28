import { headers } from "next/headers"
import Sidebar from "../Sidebar"
import { AppLayoutProps } from "./AppLayout.props"
import DataProvider from "@/context/DataContext"

export const AppLayout = async ({ children }: AppLayoutProps) => {

    const headerList = await headers()
    const path = headerList.get("x-current-path")
    const isRoot = path === "/"

    return (
        <main className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
            <DataProvider>
                {
                    !isRoot &&
                    <Sidebar />
                }
                {children}
            </DataProvider>
        </main>
    )
}
