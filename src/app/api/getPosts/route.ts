/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { IDBUser } from "@/types/db";
import clientPromise from "@/lib/mongodb";


export async function POST(req: NextRequest) {

    try {
        const session = await auth0.getSession()
        const user = session?.user

        const client = await clientPromise;
        const db = client.db("BlogStandart")
        const userProfile = await db.collection<IDBUser>("users").findOne(
            {
                auth0Id: user?.sub
            }
        );
        // const { lastPostDate, getNewerPosts } = await req.json() as { lastPostDate: Date, getNewerPosts: boolean };

        const posts = await db
            .collection("posts")
            .find({
                userId: userProfile?._id,
                // createdAt: { [getNewerPosts ? "$gt" : "$lt"]: new Date(lastPostDate) }
            })
            // .limit(getNewerPosts ? 0 : 5)
            .sort({ createdAt: -1 })
            .toArray()

        return NextResponse.json({ posts });
    }
    catch (e: unknown) {
        console.error(e)
    }

}