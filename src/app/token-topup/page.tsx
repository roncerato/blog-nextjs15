"use client"
export default function TokenTopup() {
    const handleClick = async () => {
        const response = await fetch('/api/addTokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json()
        console.log(json)
        window.location.href = json.session.url;
    }
    return (
        <div className="h-full flex items-center justify-center flex-col col-span-1 gap-8">
            <h1 className="text-4xl font-bold text-center">
                Token-Topup Page
            </h1>
            <button className="btn w-auto" onClick={handleClick}>
                Add tokens
            </button>
        </div>
    );
}
