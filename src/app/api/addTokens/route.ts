import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export async function POST(req: NextRequest) {
    const session = await auth0.getSession()
    const user = session?.user

    const lineItems = [
        {
            price: process.env.STRIPE_PRODUCT_PRICE_ID,
            quantity: 1
        }
    ]

    const metadata = {
        sub: user?.sub || "",
    }
    const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";
    const host = req.nextUrl.hostname
    const port = req.nextUrl.port
    const url = process.env.NODE_ENV === "development" ? `${protocol}${host}:${port}` : `${protocol}${host}`

    const checkoutSession = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/cancel`,
        payment_intent_data: {
            metadata: metadata
        },
        metadata: metadata
    })

    return NextResponse.json({
        session: checkoutSession
    });
}