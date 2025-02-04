import clientPromise from '@/lib/mongodb';
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
            try {
                const client = await clientPromise;
                const db = client.db("BlogStandart");

                await db.collection("users").updateOne(
                    { auth0Id },
                    {
                        $inc: { availableTokens: 10 },
                        $setOnInsert: { auth0Id },
                    },
                    { upsert: true }
                );

                console.log(`Payment succeeded for user: ${auth0Id}`);
            } catch (dbError) {
                console.error("Ошибка базы данных:", (dbError as Error).message);
                return new Response(
                    JSON.stringify({ error: "Database error" }),
                    { status: 500 }
                );
            }

            break;
        }
        case 'checkout.session.completed': {
            const checkoutSession = event.data.object;
            const sessionId = checkoutSession.id;
            const paymentIntentId = checkoutSession.payment_intent;

            if (!paymentIntentId) {
                console.error("PaymentIntent отсутствует в Checkout Session");
                return NextResponse.json({ error: "PaymentIntent not found" }, { status: 400 });
            }

            try {
                const client = await clientPromise;
                const db = client.db("BlogStandart");

                await db.collection("payments").insertOne({
                    sessionId,
                    paymentIntentId,
                    status: "pending",
                    createdAt: new Date(),
                });

                console.log(`Checkout Session завершена: session=${sessionId}, paymentIntent=${paymentIntentId}`);
            } catch (dbError) {
                console.error("Ошибка базы данных:", dbError);
                return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
            }

            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}