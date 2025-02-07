import clientPromise from "@/lib/mongodb";
import { SessionData } from "@auth0/nextjs-auth0/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { session } = await req.json() as { session: SessionData | null };

    try {
        const client = await clientPromise
        const db = client.db("BlogStandart");
        const userProfile = await db.collection("users").findOne(
            {
                auth0Id: session?.user?.sub
            }
        );
        return NextResponse.json(userProfile);
    } catch (e: unknown) {
        console.log("error trying to get user data: ", e)
    }
}