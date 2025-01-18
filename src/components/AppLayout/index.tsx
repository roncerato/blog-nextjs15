import { headers } from "next/headers"
import { AppLayoutProps } from "./AppLayout.props"

export const AppLayout = async ({ children }: AppLayoutProps) => {
    const headerList = await headers()
    const path = headerList.get("x-current-path")
    const isRoot = path === "/"
    return (
        <main>
            {
                !isRoot &&
                <aside>
                    <h1>
                        App Layout
                    </h1>
                </aside>
            }
            {children}
        </main>
    )
}
