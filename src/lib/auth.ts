import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoDbUrl = process.env.MONGO_DB_URL;

if (!mongoDbUrl) {
    throw new Error("MONGO_DB_URL environment variable is required");
}

const client = new MongoClient(mongoDbUrl);
const db = client.db("studiospace");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client,
    }),
});