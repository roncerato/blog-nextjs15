"use client"

import { useRouter } from "next/navigation" 
import { useState } from "react"

export default function NewPost() {
    const [topic, setTopic] = useState<string>("Top 10 tips for dog owners")
    const [keywords, setKeywords] = useState<string>("first-time dog owners, common dog health issues, best dog breeds")
    const router = useRouter();

    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch('/api/generatePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic, keywords })
        })
        const json = await response.json()
        alert("Post generated successfully")

        console.log(json)
        if(json.postId){
            router.push(`/post/${json.postId}`)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <strong>
                            Generate a blog post on the topic of:
                        </strong>
                    </label>
                    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={topic} onChange={e => setTopic(e.target.value)} />
                </div>
                <div>
                    <label>
                        <strong>
                            Targeting the following keywords:
                        </strong>
                    </label>
                    <textarea className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" value={keywords} onChange={e => setKeywords(e.target.value)} />
                </div>

                <button type="submit" className="btn">
                    Generate Post
                </button>
            </form>
        </div>
    );
}
