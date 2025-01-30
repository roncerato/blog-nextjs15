import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBPost, IDBUser } from "@/types/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth0.getSession();

  const client = await clientPromise
  const db = client.db("BlogStandart");
  const userProfile = await db.collection<IDBUser>("users").findOne(
    {
      auth0Id: session?.user?.sub
    }
  );

  if (!userProfile?.availableTokens) {
    return NextResponse.redirect(new URL("/token-topup", req.nextUrl.origin));
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1.7
    }
  });
  const { topic, keywords } = await req.json() as { topic: string, keywords: string };

  if (!topic || !keywords) {
    return NextResponse.json({ error: "Topic and keywords are required." }, { status: 422 });
  }

  if (topic.length > 80 || keywords.length > 80) {
    return NextResponse.json({ error: "Topic and/or keywords must be less than 80 characters." }, { status: 422 });
  }

  const prompt = `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML title and meta description content.
 Return only the contents of the <body> tag in HTML format,  limited to the following HTML tags: h1,h2,h3,h4,h5,h6, strong, li, ol, ul, i.
    The return format must be stringified JSON in the following format:
    {
        "postContent": post content here
        "title": title goes here
        "metaDescription": meta description goes here
    }
    `;

  const result = await model.generateContent(prompt);
  console.log(result)
  const responseText = result.response.text()
  console.log(responseText)
  const parsed = JSON.parse(responseText.slice(responseText.indexOf("{"), responseText.lastIndexOf("}") + 1))

  await db.collection("users").updateOne(
    {
      auth0Id: session?.user?.sub
    },
    {
      $inc: {
        availableTokens: -1
      }
    }
  );

  const post = await db.collection("posts").insertOne({
    title: parsed.title,
    postContent: parsed.postContent,
    metaDescription: parsed.metaDescription,
    topic,
    keywords,
    userId: userProfile._id,
    createdAt: new Date()
  })

  return NextResponse.json<IDBPost>({
    _id: post.insertedId,
    title: parsed.title,
    postContent: parsed.postContent,
    metaDescription: parsed.metaDescription,
    topic,
    keywords,
    userId: userProfile._id,
    createdAt: new Date()
  });
}
