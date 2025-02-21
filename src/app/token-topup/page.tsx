"use client"

import PricingCard from "@/components/PricingCard"

export default function TokenTopup() {

    return (
        <div className="h-full overflow-x-hidden grid content-center justify-center gap-6">
            <h1 className="text-4xl font-bold text-center">
                Select the appropriate token package
            </h1>
            <div className="flex flex-nowrap overflow-x-auto gap-4 pricing-cards-scrollbar p-4">

                <PricingCard name={"Quick Draft"} price={25} tokens={250} desc={"Запускайте SEO-посты за минуты – идеальный старт для вашего блога."} />
                <PricingCard name={"SEO Booster"} price={75} tokens={1000} desc={"Регулярное создание текстов для устойчивого роста сайта."} />
                <PricingCard name={"Content Empire"} price={150} tokens={2200} desc={"Масштабируйте контент-маркетинг с расширенным пакетом возможностей."} />
            </div>
            {/* <button className="btn w-auto" onClick={handleClick}>
                Add tokens
            </button> */}
        </div>
    );
}
