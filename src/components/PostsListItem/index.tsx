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
import { useMenuContext } from "@/context/MenuContext";
import Modal from "../Modal";
import { Icons } from "@/assets/Icons";
import Toast from "../Toast";

export default function PostsListItem({ selectedPostId, post, device, sharedPostId }: IPostsListItemProps): React.JSX.Element {
    const { setPosts } = useDataContext()
    const router = useRouter();
    const { setIsMobileOpen } = useMenuContext()
    const [isDelete, setIsDelete] = useState(false);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isPostShared, setIsPostShared] = useState(post.isShared);
    const [modalType, setModalType] = useState<"delete" | "share" | undefined>(undefined);
    const [isModalOpened, setIsModalOpened] = useState<true | false>(false);
    const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";
    const { hostname: host, port } = window.location;
    const link = `${protocol}${host}${port ? ":" + port : ""}/shared-post/${post._id}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

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
        setIsMenuOpened(false)
        setModalType("share")
        setIsModalOpened(isPostShared ? false : true)
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
            setIsPostShared(data.isShared);
        } catch (error) {
            console.error("Failed to share post:", error);
        }

    }
    const ref = useOutsideClick(() => setIsMenuOpened(false)
    )
    const [showToast, setShowToast] = useState(false);

    return (
        <>
            <li
                className={`relative py-1 border border-white/0 flex justify-between rounded-full text-black gap-2 my-1 px-3 cursor-pointer ${selectedPostId === post._id ? "bg-[#4A90E2] text-white hover:bg-[#4485cf]" : "hover:bg-[#cccccc85]"} ${isDelete ? "opacity-50" : ""}`}>
                {sharedPostId === post._id && (
                    <span className="bg-[#4485cf] w-2 h-2 block rounded-full self-center flex-[1_0_0.5rem]"></span>
                )}
                <Link
                    onClick={() => {
                        if (device === "mobile") {
                            setIsMobileOpen(false)
                        }
                        else {
                            return
                        }
                    }}
                    href={`/post/${post._id}`} className="block w-full text-ellipsis overflow-hidden whitespace-nowrap hover:no-underline">
                    <span className="text-sm">
                        {post.topic}
                    </span>
                </Link>
                {isPostShared && (
                    <button
                        className="self-center"
                        aria-label="Copy the share link"
                        title="Copy the share link"
                        onClick={() => {
                            copyToClipboard()
                            setShowToast(true)
                        }}>
                        <Icons.Share width={12} height={12} fill="#ADADAE" className={` ${selectedPostId === post._id ? "fill-white/50 hover:fill-white/100" : "fill-[#ADADAE] hover:fill-[#6e6e6e]"}`} />
                    </button>
                )}
                {showToast && (
                    <Toast
                        message="Успешно скопированно!"
                        type="success"
                        duration={3000}
                        onClose={() => setShowToast(false)}
                    />
                )}
                <button onClick={() => setIsMenuOpened(prev => !prev)} className={` basis-2 flex-initial ${selectedPostId === post._id ? "text-white/50 hover:text-white/100" : "text-[#ADADAE] hover:text-[#6e6e6e]"}`}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                {
                    isMenuOpened && <div ref={ref} className="absolute top-full left-[70%] px-3 py-2 shadow-sm shadow-black/25 bg-[#F7F7F7] rounded-sm z-50 flex gap-3 flex-col">
                        <button onClick={() => {
                            if (device === "mobile") {
                                setIsMobileOpen(false)
                            }
                            handleSharePost(post._id)
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
                            setIsModalOpened(true)
                            setModalType("delete")
                            if (device === "mobile") {
                                setIsMobileOpen(false)
                            }

                        }} className="flex items-center gap-2 text-black/50 hover:text-black/100 basis-2 flex-initial text-xs">
                            <FontAwesomeIcon icon={faTrash} /> Remove
                        </button>
                    </div>
                }
            </li >


            {
                isModalOpened &&
                <Modal
                    id={post._id}
                    closeFunc={() => setIsModalOpened(false)}
                    modalType={modalType}
                    deleteFunc={async () => handleDelete(post._id)}
                    isPostShared={isPostShared}
                />
            }

        </>
    );
}