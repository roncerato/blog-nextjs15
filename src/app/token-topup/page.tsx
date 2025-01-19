"use client"
export default function TokenTopup() {
    const handleClick = async () => {
        const response = await fetch('/api/addTokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: 100 })
        })
        const json = await response.json()
       console.log(json)
    }
    return (
        <div>
            <h1>
                Token-Topup Page
            </h1>
            <button className="btn" onClick={handleClick}>
                Add tokens
            </button>
        </div>
    );
}
