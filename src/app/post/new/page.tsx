"use client"

import { useDataContext } from "@/context/DataContext"
import { IDBPost } from "@/types/db"
import { faBrain } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { WithId } from "mongodb"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewPost() {
    const templateTopic = "Top 10 tips for dog owners"
    const templateKeywords = "first-time dog owners, common dog health issues, best dog breeds"
    const [topic, setTopic] = useState<string>("")
    const [keywords, setKeywords] = useState<string>("")
    const [useTemplate, setUseTemplate] = useState<boolean>(false)
    const { setAvailableTokens, setPosts } = useDataContext()
    const router = useRouter();
    const [generating, setGenerating] = useState(false)
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
        } catch (error) {
            console.error("Error generating post:", error);
            setGenerating(false)
        }
    }
    return (
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
                                use a template
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
                                        Topic:
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
                                        Keywords:
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
                                    Separate keywords with commas. <br />
                                    <i className="text-gray-500 mt-1 inline-block mb-2">
                                        For example: &quot;blogging, writing, content marketing&quot;
                                    </i>
                                </small>
                            </div>
                            <button className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200  border-2 border-[#4A90E2] rounded-full nline-flex focus:outline-none  bg-[#4A90E2] font-bold text-base group-hover:bg-white group-hover:text-[#4A90E2]" type="submit" disabled={!topic.trim() || !keywords.trim()}>
                                GENERATE
                            </button>
                        </form>
                    </div>

                </div>
            )
            }
        </div >
    );
}
