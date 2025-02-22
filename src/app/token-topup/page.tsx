import PricingCard from "@/components/PricingCard"
import clientPromise from "@/lib/mongodb";
import { IDBPrice } from "@/types/db";

export default async function TokenTopup() {

    const client = await clientPromise;
    const db = client.db("BlogStandart")
    const prices = await db.collection<IDBPrice>("prices").find().toArray();

    return (
        <div className="h-full overflow-x-hidden grid content-center justify-center gap-6">
            <h1 className="text-4xl font-bold text-center">
                Select the appropriate token package
            </h1>
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
