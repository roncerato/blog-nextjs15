import clientPromise from "@/lib/mongodb";
import { IDBPost } from "@/types/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id, isShared } = await req.json() as { id: string, isShared: boolean | undefined };


    console.log(isShared)
    console.log(!isShared)

    const client = await clientPromise
    const db = client.db("BlogStandart");
    await db.collection<IDBPost>("posts").updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: {
                isShared: !isShared
            }
        }
    );
    return NextResponse.json({
        _id: new ObjectId(id),
        isShared: !isShared
    })

}