import { useDataContext } from "@/context/DataContext";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IPostsListItemProps } from "./PostsListItem.props";
import { useState } from "react";

export default function PostsListItem({ postId, post }: IPostsListItemProps): React.JSX.Element {
    const { setPosts } = useDataContext()
    const router = useRouter();
    const [isDelete, setIsDelete] = useState(false);

    const handleDelete = async (id: string | ObjectId) => {
        setIsDelete(true);
        try {
            const res = await fetch(`/api/deletePost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id.toString() }),
            });

            if (!res.ok) throw new Error(`Failed to delete post`);

            setPosts(prevPosts => prevPosts!.filter(post => post._id !== id));
            if (postId === id) {
                router.push("/post/new");
            }
        } catch (error) {
            setIsDelete(false);
            console.error("Error deleting post:", error);
        }

    };
    return (
        <li
            className={`py-1 border border-white/0 flex justify-between gap-2 my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${postId === post._id ? "bg-white/20 border-white" : ""} ${isDelete ? "opacity-50" : ""}`}
        >
            <Link href={`/post/${post._id}`} className="block w-full text-ellipsis overflow-hidden whitespace-nowrap">
                <span>
                    {post.topic}
                </span>
            </Link>
            <button onClick={async () => handleDelete(post._id)}>
                <FontAwesomeIcon icon={faRemove} />
            </button>
        </li >
    );
}