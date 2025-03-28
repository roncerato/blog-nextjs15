import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ShareModalProps } from "./ShareModal.props";

export default function ShareModal({ id, setIsModalOpened }: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";
    const { hostname: host, port } = window.location;
    const link = `${protocol}${host}${port ? ":" + port : ""}/shared-post/${id}`;
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/35 rounded-sm z-50 grid grid-cols-[300px,1fr]">
            <div />
            <div className="flex items-center justify-center">
                <div className="p-3 w-[400px] bg-[#F7F7F7] rounded-lg flex justify-between flex-col">
                    <div className="flex justify-end">
                        <button onClick={() => setIsModalOpened(false)}>
                            <FontAwesomeIcon icon={faClose} className="text-[#ADADAE] hover:text-[#6e6e6e]" />
                        </button>
                    </div>
                    <div className="flex flex-col flex-1 justify-center items-center gap-3 bg-[#F7F7F7]">
                        <h2 className="text-lg font-bold text-black text-center">🔗 Share this post!</h2>
                        <p className="text-sm text-black text-center">
                            Copy the link and send it to your friends so they can watch this post too.
                        </p>
                        <div className="flex gap-2 w-full">
                            <input
                                disabled
                                readOnly
                                onSelect={(e) => e.preventDefault()}
                                type="text"
                                className="caret-transparent selection:bg-transparent border text-sm text-[#ADADAE] select-none px-4 flex-1 bg-[#F7F7F7] rounded-3xl"
                                value={link}
                            />
                            <button
                                className="flex items-center justify-center px-3 py-1.5 text-center text-white duration-200 border-2 border-[#4A90E2] rounded-full hover:bg-transparent hover:border-[#4A90E2] hover:text-[#4A90E2] focus:outline-none focus-visible:outline-[#4A90E2] bg-[#4A90E2] font-bold text-base box-content w-20"
                                onClick={copyToClipboard}
                            >
                                {copied ? "COPIED!" : "COPY"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
