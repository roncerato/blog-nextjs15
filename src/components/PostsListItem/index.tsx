/* eslint-disable @typescript-eslint/no-unused-vars */
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
import DeleteModal from "../DeleteModal";
import ShareModal from "../ShareModal";
import { useMenuContext } from "@/context/MenuContext";

export default function PostsListItem({ selectedPostId, post, device }: IPostsListItemProps): React.JSX.Element {
    const { setPosts } = useDataContext()
    const router = useRouter();
    const { setIsMobileOpen } = useMenuContext()
    const [isDelete, setIsDelete] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isPostShared, setIsPostShared] = useState(post.isShared);
    const [isModalOpened, setIsModalOpened] = useState<"delete" | "share" | false>(false);

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
            if (selectedPostId === id) {
                router.push("/post/new");
            }
        } catch (error) {
            setIsDelete(false);
            console.error("Error deleting post:", error);
        }

    };
    const handleSharePost = async (id: string | ObjectId) => {
        setIsPostShared(prev => {
            const bool = !!prev;
            return !bool
        });
        try {
            const res = await fetch(`/api/sharePost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id.toString(), isShared: isPostShared }),
            });
            const data = await res.json() as { _id: ObjectId, isShared: boolean };

            if (!res.ok) throw new Error(`Failed to share post`);

        } catch (error) {
            setIsPostShared(prev => !prev)
            console.error("Failed to share post:", error);
        }

    }
    const ref = useOutsideClick(() => setIsMenuOpened(false)
    )

    return (
        <>
            <li
                className={`relative py-1 border border-white/0 flex justify-between rounded-full text-black gap-2 my-1 px-3 cursor-pointer ${selectedPostId === post._id ? "bg-[#4A90E2] text-white" : ""} ${isDelete ? "opacity-50" : ""}`}>
                <Link
                    onClick={() => {
                        if (device === "mobile") {
                            setIsMobileOpen(false)
                        }
                        else {
                            return
                        }
                    }}
                    href={`/post/${post._id}`} className="block w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="text-sm">
                        {post.topic}
                    </span>
                </Link>
                <button onClick={() => setIsMenuOpened(prev => !prev)} className={` basis-2 flex-initial ${selectedPostId === post._id ? "text-white/50 hover:text-white/100" : "text-[#ADADAE] hover:text-[#6e6e6e]"}`}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                {
                    isMenuOpened && <div ref={ref} className="absolute top-full left-[90%] px-3 py-2 shadow-sm shadow-black/25 bg-[#F7F7F7] rounded-sm z-50 flex gap-3 flex-col">
                        <button onClick={() => {
                            handleSharePost(post._id)
                            setIsMenuOpened(false)
                            setIsModalOpened("share")
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
                        <button onClick={() => {
                            setIsMenuOpened(false)
                            setIsModalOpened("delete")
                        }} className="flex items-center gap-2 text-black/50 hover:text-black/100 basis-2 flex-initial text-xs">
                            <FontAwesomeIcon icon={faTrash} /> Remove
                        </button>
                    </div>
                }
            </li >


            {
                isPostShared && isModalOpened === "share" &&
                <ShareModal id={post._id} setIsModalOpened={setIsModalOpened} />}
            {
                isModalOpened === "delete" &&
                <DeleteModal setIsModalOpened={setIsModalOpened} deleteFunc={async () => handleDelete(post._id)} />
            }

        </>
    );
}