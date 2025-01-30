"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/post/new");
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="h-full flex items-center justify-center">
            <h1>Thank you for your purchase!!!</h1>
        </div>
    );
}

