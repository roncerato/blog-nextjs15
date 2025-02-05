// import { auth0 } from '@/lib/auth0';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-12-18.acacia",
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "session_id is required" }, { status: 400 });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return NextResponse.json({ valid: true, session }, { status: 200 });
    } catch (error) {
        console.error("Ошибка при проверке сессии:", (error as Error).message);
        return NextResponse.json({ valid: false, error: "Session not found" }, { status: 404 });
    }
}
