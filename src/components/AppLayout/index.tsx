import Sidebar from "../Sidebar"
import { AppLayoutProps } from "./AppLayout.props"
import { auth0 } from "@/lib/auth0"

export const AppLayout = async ({ children }: AppLayoutProps) => {

    const session = await auth0.getSession()
    const isSession = session !== null

    return (
        <main className={`grid ${isSession ? "grid-cols-[300px,1fr]" : ''} h-screen max-h-screen`}>
            {
                isSession &&
                <Sidebar />
            }
            <div>
                {children}
            </div>
        </main>
    )
}
