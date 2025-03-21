import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri)
    clientPromise = client.connect()
}

export default clientPromise