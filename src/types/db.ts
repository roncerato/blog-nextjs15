import { ObjectId } from "mongodb";

export interface IDBUser {
    _id: ObjectId;
    auth0Id: string;
    availableTokens: number;
}
export interface IDBPost {
    _id?: ObjectId | string;
    title: string;
    postContent: string;
    metaDescription: string;
    topic: string;
    keywords: string;
    auth0Id?: string;
    userId: ObjectId | string;
    createdAt: Date;
}
export interface IDBPrice {
    _id: ObjectId;
    tokens: number;
    priceId: string;
    price: number;
    name: string;
    description: string;
}
