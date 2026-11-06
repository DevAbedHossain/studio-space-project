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
    account: {
        accountLinking: {
            // Without an email verification flow, email/password users are
            // never `emailVerified` — requiring it would make every social
            // sign-in with a matching email fail with "account not linked".
            trustedProviders: ["google", "github"],
            requireLocalEmailVerified: false,
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});