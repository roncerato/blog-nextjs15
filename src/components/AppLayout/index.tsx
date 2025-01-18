import { headers } from "next/headers"
import { AppLayoutProps } from "./AppLayout.props"

export const AppLayout = async ({ children }: AppLayoutProps) => {
    const headerList = await headers()
    const path = headerList.get("x-current-path")
    const isRoot = path === "/"
    return (
        <main className="grid grid-cols-[300px,1fr] h-screen max-h-screen">
            {
                !isRoot &&
                <aside className="flex flex-col text-white overflow-hidden">
                    <header className="bg-slate-800">
                        <div>Logo</div>
                        <div>cta button</div>
                        <div>tokens</div>
                    </header>
                    <main className="flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800">
                        list of post
                    </main>
                    <footer className="bg-cyan-800">
                        user information - logout button
                    </footer>
                </aside>
            }
            <div >
                {children}
            </div>
        </main>
    )
}
