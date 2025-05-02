"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Cancel() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/post/new");
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);
    return (
        <div className="h-full flex items-center justify-center">
            <h1>
                The operation was not completed
            </h1>
        </div>
    );
}
