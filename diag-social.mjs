// Standalone repro of src/lib/auth.ts socialProviders — calls better-auth's
// handler directly to see the real error on social sign-in without Next.js.
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoDbUrl = process.env.MONGO_DB_URL;

if (!mongoDbUrl) {
    console.error("MONGO_DB_URL missing");
    process.exit(1);
}

console.log("GOOGLE_CLIENT_ID present:", Boolean(process.env.GOOGLE_CLIENT_ID));
console.log("GOOGLE_CLIENT_SECRET present:", Boolean(process.env.GOOGLE_CLIENT_SECRET));
console.log("GITHUB_CLIENT_ID present:", Boolean(process.env.GITHUB_CLIENT_ID));
console.log("GITHUB_CLIENT_SECRET present:", Boolean(process.env.GITHUB_CLIENT_SECRET));

const client = new MongoClient(mongoDbUrl);
const db = client.db("studiospace");

const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});

try {
    const res = await auth.handler(
        new Request("http://localhost:3000/api/auth/sign-in/social", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider: "google", callbackURL: "/" }),
        })
    );

    console.log("STATUS:", res.status);
    console.log("LOCATION:", res.headers.get("location"));
    console.log("BODY:", await res.text());

    const githubRes = await auth.handler(
        new Request("http://localhost:3000/api/auth/sign-in/social", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider: "github", callbackURL: "/" }),
        })
    );

    console.log("GITHUB STATUS:", githubRes.status);
    console.log("GITHUB LOCATION:", githubRes.headers.get("location"));
    console.log("GITHUB BODY:", await githubRes.text());
} catch (err) {
    console.error("THROWN:", err);
} finally {
    await client.close();
}
