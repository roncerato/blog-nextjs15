"use client";

import { useEffect, useState } from "react";
import { ISavePageBtnProps } from "./SavePageBtn.props";

function htmlDocumentStructure(topic: string, keywords: string, metaDescription: string, postBody: string) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${topic}</title>
      <meta name="keywords" content="${keywords}">
      <meta name="description" content="${metaDescription}">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
      <style>
  body {
    font-family: "Roboto", sans-serif;
    font-weight: 300
  }

  .post-body {
    max-width: 640px;
    margin: auto;
  }

  b, strong {
    font-weight: bolder;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Raleway", sans-serif;
    font-weight: 700
  }

  h1 {
    font-size: 2.25rem
      /* 36px */
    ;
    line-height: 2.5rem
      /* 40px */
    ;
  }

  h2 {
    font-size: 1.875rem
      /* 30px */
    ;
    line-height: 2.25rem
      /* 36px */
    ;
  }

  h3 {
    font-size: 1.5rem
      /* 24px */
    ;
    line-height: 2rem
      /* 32px */
    ;
  }

  h4 {
    font-size: 1.25rem
      /* 20px */
    ;
    line-height: 1.75rem
      /* 28px */
    ;
  }

  h5 {
    font-size: 1.125rem
      /* 18px */
    ;
    line-height: 1.75rem
      /* 28px */
    ;
  }

  p {
    margin: 8px 0;
  }

  ul,
  ol {
    margin: 16px 0;
    list-style-type: none;
    padding-inline-start: 0px;
  }

  ol li,
  ul li {
    margin: 8px 0;
    position: relative;
  }

  ul li::before {
    content: '•';
    position: absolute;
    left: -12px;
    top: 0;
  }
</style>
    </head>
    <body>
      ${postBody}
    </body>
  </html>`
}

export default function SavePageButton({ postData }: ISavePageBtnProps) {

  const [post, setPost] = useState(postData);

  useEffect(() => {
    setPost(postData);
  }, [postData])

  const savePage = () => {
    const postBody = document.getElementById("post-body")!.outerHTML;
    const htmlDocument = htmlDocumentStructure(post.topic, post.keywords, post.metaDescription, postBody);
    const blob = new Blob([htmlDocument], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={savePage} className="absolute bottom-0 right-0 z-40 w-10 h-10 mb-4 mr-6 bg-[#4A90E2] rounded-full flex items-center justify-center transition-colors duration-200">
      <svg viewBox="0 0 24 24" height={24} width={24} fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" />
        <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" />
      </svg>
    </button>
  );
}
