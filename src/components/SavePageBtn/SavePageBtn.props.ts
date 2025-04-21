interface PostData {
    _id: string;
    userId: string;
    createdAt: string;
    title: string;
    postContent: string;
    metaDescription: string;
    topic: string;
    keywords: string;
    auth0Id?: string | undefined;
    isShared?: boolean | undefined;
}

export interface ISavePageBtnProps {
    postData: PostData;
}