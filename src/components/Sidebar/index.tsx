import { ISidebarProps } from "./Sidebar.props";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import SidebarMain from "./SidebarMain";

export default function Sidebar({ }: ISidebarProps) {
    return (
        <aside className="flex flex-col text-white overflow-hidden">
            <SidebarHeader />
            <SidebarMain />
            <SidebarFooter />
        </aside>
    )
}