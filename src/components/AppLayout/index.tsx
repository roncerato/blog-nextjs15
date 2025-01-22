
import Sidebar from "../Sidebar"
import { AppLayoutProps } from "./AppLayout.props"

export const AppLayout = ({ children }: AppLayoutProps) => {

    return (
        <main className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
            <Sidebar />
            {children}
        </main>
    )
}
