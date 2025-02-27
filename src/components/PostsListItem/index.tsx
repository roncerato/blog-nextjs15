import { useDataContext } from "@/context/DataContext";
import { faBan, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IPostsListItemProps } from "./PostsListItem.props";
import { useState } from "react";
import { faShare } from "@fortawesome/free-solid-svg-icons/faShare";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function PostsListItem({ postId, post }: IPostsListItemProps): React.JSX.Element {
    const { setPosts } = useDataContext()
    const router = useRouter();
    const [isDelete, setIsDelete] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [isPostShared, setIsPostShared] = useState(post.isShared);

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
    const handleSharePost = async (id: string | ObjectId) => {
        try {
            const res = await fetch(`/api/sharePost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id.toString(), isShared: isPostShared }),
            });
            const data = await res.json();
            setIsPostShared(data.isShared);
            if (!res.ok) throw new Error(`Failed to share post`);

        } catch (error) {
            console.error("Failed to share post:", error);
        }

    }
    const ref = useOutsideClick(() => setIsOpened(false)
    )
    return (
        <li
            className={`relative py-1 border border-white/0 flex justify-between gap-2 my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${postId === post._id ? "bg-white/20 border-white" : ""} ${isDelete ? "opacity-50" : ""}`}
        >
            <Link href={`/post/${post._id}`} className="block w-full text-ellipsis overflow-hidden whitespace-nowrap">
                <span>
                    {post.topic}
                </span>
            </Link>
            <button onClick={() => setIsOpened(prev => !prev)} className=" text-white/50 hover:text-white/100 basis-2 flex-initial">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            {isOpened && <div ref={ref} className="absolute top-full left-[90%] px-3 py-2 shadow-sm shadow-black/25 bg-[#F7F7F7] rounded-sm z-50 flex gap-3 flex-col">
                <button onClick={async () => {
                    handleSharePost(post._id)
                    setIsOpened(false)
                }} className="flex items-center gap-2 text-black/60 hover:text-black/100 basis-2 flex-initial text-xs">
                    {!isPostShared ?
                        <>
                            <FontAwesomeIcon icon={faShare} /> Share
                        </>
                        :
                        <>
                            <FontAwesomeIcon icon={faBan} /> Unshare
                        </>

                    }
                </button>
                <button onClick={async () => {
                    handleDelete(post._id)
                    setIsOpened(false)
                }} className="flex items-center gap-2 text-black/50 hover:text-black/100 basis-2 flex-initial text-xs">
                    <FontAwesomeIcon icon={faTrash} /> Remove
                </button>
            </div>}
        </li >
    );
}