import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBUser } from "@/types/db";
import { NextResponse } from "next/server";

export async function POST() {

    try {
        const session = await auth0.getSession();

        const client = await clientPromise
        const db = client.db("BlogStandart");
        const userProfile = await db.collection<IDBUser>("users").findOne(
            {
                auth0Id: session?.user?.sub
            }
        );
        return NextResponse.json(userProfile);
    } catch (e: unknown) {
        console.log("error trying to get user data: ", e)
    }
}