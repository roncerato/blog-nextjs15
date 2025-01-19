import { auth0 } from "@/lib/auth0";
import clientPromise from "@/lib/mongodb";
import { IDBPosts, IDBUser } from "@/types/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth0.getSession();

  const client = await clientPromise
  const db = client.db("BlogStandart");
  const userProfile = await db.collection<IDBUser>("users").findOne(
    { 
      auth0Id: session?.user?.sub 
    }
  );

  if (!userProfile?.availableTokens){
    return NextResponse.redirect("/api/addTokens");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1.7
    }
  });
  const { topic, keywords } = await req.json();
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
  const responseText = result.response.text()
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

  const post = await db.collection<IDBPosts>("posts").insertOne({
    title: parsed.title,
    postContent: parsed.postContent,
    metaDescription: parsed.metaDescription,
    topic,
    keywords,
    userId: userProfile._id,
    createdAt: new Date()
  })

  return NextResponse.json({postId: post.insertedId});
}
