"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ISidebarMainProps } from "./SidebarMain.props";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { ObjectId } from "mongodb";

export default function SidebarMain({ posts }: ISidebarMainProps) {

    const pathname = usePathname()

    const postId = pathname?.match(/^\/post\/(?!new$)([a-zA-Z0-9]+)/)?.[1] || null;

    const handleDelete = async (postId: string | ObjectId) => {
        const res = await fetch(`/api/deletePost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId })
        });
        const json = await res.json()
        console.log(json)
    }
    return (
        <main className="px-2 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800 scrollbar-custom">
            <ul>

                {posts.map(post => (
                    <li
                        key={String(post._id)}
                        className={`py-1 border border-white/0 flex justify-between gap-2 my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${postId === post._id ? "bg-white/20 border-white" : ""}`}
                    >
                        <Link
                            className="text-ellipsis overflow-hidden whitespace-nowrap"
                            href={`/post/${post._id}`}>
                            {post.topic}
                        </Link>
                        <button>
                            <FontAwesomeIcon icon={faRemove} onClick={() => { handleDelete(post._id) }} />
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    )
}

