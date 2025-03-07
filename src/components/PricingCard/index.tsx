"use client"
import { IPricingCardProps } from "./PricingCard.Props";

export default function PricingCard({ name, price, tokens, desc, priceId }: IPricingCardProps) {
    const handleClick = async () => {
        const response = await fetch('/api/addTokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ priceId })
        })
        const json = await response.json()
        console.log(json)
        window.location.href = json.session.url;
    }
    return (
        <div className="group flex flex-shrink-0 w-[270px] flex-col bg-[#F7F7F7] rounded-3xl hover:shadow-lg transition duration-100 hover:bg-[#4A90E2] hover:text-white">
            <div className="px-6 py-8 sm:p-10 sm:pb-6 flex flex-col flex-1">
                <div className="w-full text-left flex flex-col flex-grow justify-between">
                    <div>
                        <h2 className="font-heading text-lg font-semibold tracking-tighter lg:text-3xl">
                            {name}
                        </h2>
                        <p className="mt-2 text-sm text-[#4D4D4D] group-hover:text-white">{desc}</p>
                    </div>
                    <div className="mt-6">
                        <p>
                            <span className="text-5xl font-light tracking-tight">
                                {tokens}
                            </span>
                            <span className="text-base font-semibold text-gray-500 group-hover:text-white"> tokens </span>
                        </p>

                    </div>
                </div>
            </div>
            <div className="px-6 pb-8 sm:px-8">
                <button aria-describedby="tier-company" className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200  border-2 border-[#4A90E2] rounded-full nline-flex focus:outline-none  bg-[#4A90E2] font-bold text-base group-hover:bg-white group-hover:text-[#4A90E2]" onClick={handleClick}>
                    ${price}
                </button>
                <span className="text-xs block w-full text-gray-500 font-medium mt-3 group-hover:text-white">*one-time purchase </span>
            </div>
        </div>
    )
}