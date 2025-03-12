import DataProvider from "@/context/DataContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Post",
    description: "Create a new post with BlogStandart",
}

export default function NewPostLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <DataProvider>
            {children}
        </DataProvider>
    )
}