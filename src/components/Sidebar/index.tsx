import { ISidebarProps } from "./Sidebar.props";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import SidebarMain from "./SidebarMain";
import { getUserData } from "@/services/getUserData";
import DataProvider from "@/context/DataContext";
export default async function Sidebar({ }: ISidebarProps) {

    const { posts, availableTokens } = await getUserData()

    return (
        <aside className="flex flex-col bg-[#F7F7F7] border-r-[1px] border-[#e5e7eb]">
            <DataProvider>
                <SidebarHeader availableTokens={availableTokens} />
                <SidebarMain posts={posts} />
            </DataProvider>
            <SidebarFooter />
        </aside>
    )
}