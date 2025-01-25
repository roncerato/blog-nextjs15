import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { IDBUser } from "@/types/db";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";


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

        const { postId } = await req.json() as { postId: string };

        await db
            .collection("posts")
            .deleteOne({
                userId: userProfile?._id,
                _id: new ObjectId(postId)
            });

        return NextResponse.json({ success: true });
    }
    catch (e: unknown) {
        console.log("error trying to delete a post: ", e)
    }
}