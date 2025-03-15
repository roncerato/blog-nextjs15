import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBPost, IDBUser } from "@/types/db";
import { NextResponse } from "next/server";

export async function POST() {

    const session = await auth0.getSession()
    const user = session?.user

    try {
        const client = await clientPromise
        const db = client.db("BlogStandart");
        const profile = await db.collection<IDBUser>("users").findOne(
            {
                auth0Id: user?.sub
            }
        );
        const posts = await db
            .collection<IDBPost>("posts")
            .find({
                userId: profile?._id,
            })
            .sort({ createdAt: -1 })
            .toArray()

        return NextResponse.json({ profile, posts });
    } catch (e: unknown) {
        console.log("error trying to get user data: ", e)
    }
}