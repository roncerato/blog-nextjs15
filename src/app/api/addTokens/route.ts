/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBUser } from "@/types/db";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const session = await auth0.getSession()
    const user = session?.user
    const client = await clientPromise;
    const db = client.db("BlogStandart");

    const userProfile = db.collection<IDBUser>("users").updateOne(
        {
            auth0Id: user?.sub
        },
        {
            $inc: {
                availableTokens: 10
            },
            $setOnInsert: {
                auth0Id: user?.sub,
            }
        },
        {
            upsert: true
        }
    );

    return NextResponse.json({ name: "Ron Cerato" });
}