// Standalone repro of src/lib/auth.ts — calls better-auth's handler directly
// so we can see the real server error without Next.js swallowing it.
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoDbUrl = process.env.MONGO_DB_URL;

if (!mongoDbUrl) {
    console.error("MONGO_DB_URL missing");
    process.exit(1);
}

const client = new MongoClient(mongoDbUrl);
const db = client.db("studiospace");

const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client,
    }),
});

const email = `diag-${Date.now()}@example.com`;

try {
    const res = await auth.handler(
        new Request("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Diag Test",
                email,
                password: "testPass123",
                image: "https://example.com/a.png",
            }),
        })
    );

    console.log("STATUS:", res.status);
    console.log("BODY:", await res.text());
} catch (err) {
    console.error("THROWN:", err);
} finally {
    await client.close();
}
