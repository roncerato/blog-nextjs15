"use client"
export default function NewPost() {
    const handleClick = async () => {
        const response = await fetch('/api/generatePost', {
            method: 'POST',
        })
        const data = await response.json()
        alert("Post generated successfully")
        console.log(data)
    }
    return (
        <div>
            <h1>
                New Post Page
            </h1>
            <button onClick={handleClick} className="btn">
                Generate Post
            </button>
        </div>
    );
}
