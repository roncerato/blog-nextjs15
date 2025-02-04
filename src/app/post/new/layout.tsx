import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Post",
    description: "Create a new post with BlogStandart",
}

export default function NewPostLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    )
}