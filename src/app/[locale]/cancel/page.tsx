"use client"
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Cancel() {
    const router = useRouter();
    const t = useTranslations('pages.cancel');
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/post/new");
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);
    return (
        <div className="h-full flex items-center justify-center">
            <h1>
                {t("title")}
            </h1>
        </div>
    );
}
