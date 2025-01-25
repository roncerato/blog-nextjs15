import { ObjectId } from "mongodb";

export interface IDBUser {
    _id: ObjectId;
    auth0Id: string;
    availableTokens: number;
}
export interface IDBPost {
    _id?: ObjectId;
    title: string;
    postContent: string;
    metaDescription: string;
    topic: string;
    keywords: string;
    auth0Id?: string;
    userId: ObjectId;
    createdAt: Date;
}