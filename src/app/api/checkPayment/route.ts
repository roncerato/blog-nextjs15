// import { auth0 } from '@/lib/auth0';
import clientPromise from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // const session = await auth0.getSession()
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "session_id is required" }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("BlogStandart");

        const payment = await db.collection("payments").findOne({
            sessionId,
            // auth0Id: session?.user?.sub
        });

        if (!payment) {
            return NextResponse.json({ error: "Payment not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
