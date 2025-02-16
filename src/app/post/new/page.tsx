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
                    <div className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
                        <div className="flex items-center justify-end gap-2">
                            <span className="text-xs font-bold">
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
                                        if(!useTemplate){
                                            setTopic(templateTopic)
                                            setKeywords(templateKeywords)
                                        }
                                        else{
                                            setTopic("")
                                            setKeywords("")
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="switcher"
                                    className={`cursor-pointer w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${useTemplate ? 'bg-green-500' : 'bg-gray-300'}`}
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
                                        Generate a blog post on the topic of:
                                    </strong>
                                </label>
                                <textarea
                                    className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" 
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
                                    <strong>
                                        Targeting the following keywords:
                                    </strong>
                                </label>
                                <textarea
                                    className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" 
                                    value={keywords}
                                    placeholder={templateKeywords}
                                    onChange={e => {
                                        setUseTemplate(false)
                                        setKeywords(e.target.value)
                                    }}
                                    maxLength={80} />

                                <small className="block mb-2 ">
                                    Separate keywords with commas. <br />
                                    <i>
                                        For example: &quot;blogging, writing, content marketing&quot;
                                    </i>
                                </small>
                            </div>
                            <button className="btn" type="submit" disabled={!topic.trim() || !keywords.trim()}>
                                Generate
                            </button>
                        </form>
                    </div>

                </div>
            )
            }
        </div >
    );
}
