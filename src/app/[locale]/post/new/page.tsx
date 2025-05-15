"use client"

import { useDataContext } from "@/context/DataContext"
import { IDBPost } from "@/types/db"
import { faBrain } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { WithId } from "mongodb"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { useState } from "react"
import Toast from "@/components/Toast"

export default function NewPost() {
    const t = useTranslations('pages.post');
    const templateTopic = t("template_topic")
    const templateKeywords = t("template_keywords")
    const [topic, setTopic] = useState<string>("")
    const [keywords, setKeywords] = useState<string>("")
    const [useTemplate, setUseTemplate] = useState<boolean>(false)
    const { setAvailableTokens, setPosts } = useDataContext()
    const router = useRouter();
    const [generating, setGenerating] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setGenerating(true)
        try {

            const response = await fetch(`/api/generatePost`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ topic, keywords })
            })
            const json = await response.json() as WithId<IDBPost>
            if (json._id) {
                router.push(`/post/${json._id}`)
                setAvailableTokens(prev => prev ? prev - 1 : 0)
                setPosts(prev => prev ? [json, ...prev] : [json])
            }
        } catch {
            // console.error("Error generating post:", error);
            setGenerating(false)
            setShowToast(true)
        }
    }
    return (
        <>
            <div className="h-full overflow-hidden">
                {
                    generating && (<div className="text-green-500 flex h-full animate-pulse w-full  items-center justify-center flex-col">
                        <FontAwesomeIcon icon={faBrain} className="text-8xl" />
                        <h6>Generating...</h6>
                    </div>)
                }
                {!generating && (
                    <div className="w-full h-full flex flex-col overflow-auto">
                        <div className="m-auto w-full max-w-screen-sm p-4 rounded-xl">
                            <div className="flex items-center justify-end gap-2">
                                <span className="text-xs font-light ">
                                    {t('use_template')}
                                </span>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="switcher"
                                        className="hidden"
                                        checked={useTemplate}
                                        onChange={() => {
                                            setUseTemplate(!useTemplate)
                                            if (!useTemplate) {
                                                setTopic(templateTopic)
                                                setKeywords(templateKeywords)
                                            }
                                            else {
                                                setTopic("")
                                                setKeywords("")
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="switcher"
                                        className={`cursor-pointer w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${useTemplate ? 'bg-[#4A90E2]' : 'bg-gray-300'}`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${useTemplate ? 'translate-x-4' : ''}`}
                                        />
                                    </label>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} >
                                <>
                                    <label>
                                        <strong>
                                            {t('topic')}:

                                        </strong>
                                    </label>
                                    <input
                                        className="resize-none w-full bg-[#F7F7F7] h-min block p-5 rounded-xl mt-2 font-light"
                                        value={topic}
                                        onChange={e => {
                                            setUseTemplate(false)
                                            setTopic(e.target.value)
                                        }}
                                        maxLength={80}
                                        placeholder={templateTopic} />
                                </>
                                <div>
                                    <label>
                                        <h4 className="font-heading font-bold mt-6">
                                            {t('keywords')}:
                                        </h4>
                                    </label>
                                    <textarea
                                        className="resize-none bg-[#F7F7F7] p-5 w-full block my-2  rounded-xl font-light"
                                        value={keywords}
                                        rows={6}
                                        placeholder={templateKeywords}
                                        onChange={e => {
                                            setUseTemplate(false)
                                            setKeywords(e.target.value)
                                        }}
                                        maxLength={80} />

                                    <small className="block mb-2 mt-4 ml-5">
                                        {t("keywords_hint")} <br />
                                        <i className="text-gray-500 mt-1 inline-block mb-2">
                                            {t("example_label")}: &quot;{t("example_keywords")}&quot;
                                        </i>
                                    </small>
                                </div>
                                <button className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200  border-2 border-[#4A90E2] rounded-full nline-flex focus:outline-none  bg-[#4A90E2] font-bold text-base group-hover:bg-white group-hover:text-[#4A90E2] disabled:opacity-30" type="submit" disabled={!topic.trim() || !keywords.trim()}>
                                    {t("generate")}
                                </button>
                            </form>
                        </div>

                    </div>
                )
                }
            </div >
            {
                showToast &&
                <Toast message={`Ошибка при генерации поста.\nПопробуйте обновить страницу или повторить попытку позже.`}
                    type="error"
                    onClose={() => setShowToast(false)}
                />

            }
        </>
    );
}
