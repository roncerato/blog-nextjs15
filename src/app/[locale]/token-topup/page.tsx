import PricingCard from "@/components/PricingCard"
import clientPromise from "@/lib/mongodb";
import { IDBPrice } from "@/types/db";
import { getTranslations } from "next-intl/server";

export default async function TokenTopup() {
    const t = await getTranslations('pages.token_topup');
    const client = await clientPromise;
    const db = client.db("BlogStandart")
    const prices = await db.collection<IDBPrice>("prices").find().toArray();

    return (
        <div className="pt-20 h-full overflow-x-hidden grid content-center justify-center gap-8">
            <div className="p-4">
                <h1 className="text-4xl font-bold text-center font-heading">
                    {t("title")}
                </h1>
                <p className="text-center text-[#4D4D4D]">
                    {t("desc")}
                </p>
            </div>
            <div className="flex flex-nowrap overflow-x-auto gap-4 pricing-cards-scrollbar p-4">
                {
                    prices.map((price) => (
                        <PricingCard
                            key={String(price._id)}
                            name={price.name}
                            price={price.price}
                            tokens={price.tokens}
                            desc={price.description}
                            priceId={price.priceId}
                        />
                    ))
                }
            </div>
        </div>
    );
}
