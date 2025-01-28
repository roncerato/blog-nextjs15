"use client"
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IPostClientProps } from "./PostClient.props";

export default function PostClient({ post }: IPostClientProps) {
    return (
        <div className="max-w-screen-sm mx-auto">

            <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                SEO title & meta description
            </div>

            <div className="p-4 my-2 border border-stone-200 rounded-md">
                <div className="text-blue-600 text-2xl font-bold">{post.title}</div>
                <div className="mt-2">{post.metaDescription}</div>
            </div>
            <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                Keywords
            </div>
            <div className="flex flex-wrap pt-2 gap-1">
                {post.keywords.split(",").map((keyword, i) => (
                    <div key={i} className="p-2 rounded-full bg-slate-800 text-white flex">
                        <FontAwesomeIcon icon={faHashtag} width={10} /> {keyword}
                    </div>
                ))}
            </div>
            <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
                Blog post
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.postContent || "" }} />

        </div>
    )
}