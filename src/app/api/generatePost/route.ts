import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY || "");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
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

  return NextResponse.json(result.response.text());
}
