import clientPromise from '@/lib/mongodb';
import { IDBPrice } from '@/types/db';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
    const sig = request.headers.get('stripe-signature') || "";
    const body = await request.text();

    let event;

    try {
        event = stripe.webhooks.constructEvent
            (body, sig, process.env.STRIPE_WEBHOOK_SECRET || "");
    } catch (err) {
        return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
    }

    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const auth0Id = paymentIntent.metadata?.sub;
            const sessionId = paymentIntent.id;
            const status = paymentIntent.status
            try {
                const client = await clientPromise;
                const db = client.db("BlogStandart");
                const price = paymentIntent.amount / 100;

                const priceData = await db.collection<IDBPrice>("prices").findOne({ price });

                await db.collection("payments").insertOne({
                    sessionId,
                    status,
                    createdAt: new Date(),
                });

                await db.collection("users").updateOne(
                    { auth0Id },
                    {
                        $inc: { availableTokens: priceData?.tokens },
                        $setOnInsert: { auth0Id },
                    },
                    { upsert: true }
                );

                console.log(`Payment succeeded for user: ${auth0Id}`);
            } catch (dbError) {
                console.error("Database error:", (dbError as Error).message);
                return NextResponse.json({ error: "Database error" }, { status: 500 });
            }

            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}