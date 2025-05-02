import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostBodyProps } from "./PostBody.props";
import { useTranslations } from "next-intl"
import SavePageButton from "../SavePageBtn";

export default function PostBody({ post }: PostBodyProps) {
    const t = useTranslations('pages.post');
    const postData = {
        ...post,
        _id: post._id.toString(),
        userId: post.userId.toString(),
        createdAt: post.createdAt.toISOString(),
      };
    console.log(post)
    return (
        <>
            <SavePageButton postData={postData}/>
            <div className="px-5 overflow-auto h-full py-10">
                <div className="max-w-screen-sm mx-auto mt-6 flex flex-col gap-6">
                    <div>
                        <h5 className="text-sm font-bold p-2 pl-4 font-heading border-b-[1px] border-[#e5e7eb] bg-[#4A90E2] text-white rounded-md">
                            {t('seo')}
                        </h5>

                        <div className="p-4 border-b border-stone-200">
                            <div className="text-[#4A90E2] text-2xl font-bold font-heading">{post.title}</div>
                            <div className="mt-2 text-sm">{post.metaDescription}</div>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-sm font-bold p-2 pl-4 font-heading border-b-[1px] border-[#e5e7eb] bg-[#4A90E2] text-white rounded-md ">
                            {t('keywords')}
                        </h5>

                        <ul className="flex flex-wrap  gap-1 p-4 border-b border-stone-200">
                            {post.keywords.split(",").map((keyword, i) => (
                                <li key={i} className="p-2  rounded-full text-black bg-[#F7F7F7] border border-[#e5e7eb] flex items-center gap-1 text-sm font-heading font-medium">
                                    <FontAwesomeIcon icon={faHashtag} width={10} /> {keyword}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>

                        <h5 className="text-sm font-bold p-2 pl-4 font-heading border-b-[1px] border-[#e5e7eb] bg-[#4A90E2] text-white rounded-md">
                            {t('blog')}
                        </h5>

                        <div className="post-body" id="post-body" dangerouslySetInnerHTML={{ __html: post.postContent || "" }} />
                    </div>
                </div>
            </div>
        </>
    );

}