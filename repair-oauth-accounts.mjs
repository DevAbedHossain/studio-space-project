// One-time DB inspector for better-auth OAuth state.
// 1) Lists orphaned account docs (userId not in user collection).
// 2) Lists local users (email/password) and whether emailVerified.
// Run: node --env-file=.env repair-oauth-accounts.mjs [--delete]
import { MongoClient } from "mongodb";

const mongoDbUrl = process.env.MONGO_DB_URL;
if (!mongoDbUrl) {
    console.error("MONGO_DB_URL missing");
    process.exit(1);
}

const client = new MongoClient(mongoDbUrl);
await client.connect();
const db = client.db("studiospace");

const users = await db.collection("user").find({}, { projection: { email: 1, emailVerified: 1 } }).toArray();
const accounts = await db.collection("account").find({}).toArray();

const userIds = new Set(users.map((u) => String(u._id)));
const orphans = accounts.filter((a) => !userIds.has(String(a.userId)));

console.log("USERS:");
for (const u of users) {
    console.log(`  ${u.email} (emailVerified=${u.emailVerified}) _id=${u._id}`);
}

console.log("ACCOUNTS:");
for (const a of accounts) {
    const orphan = !userIds.has(String(a.userId)) ? "  <-- ORPHANED" : "";
    console.log(`  provider=${a.providerId} accountId=${a.accountId} userId=${a.userId}${orphan}`);
}

if (process.argv.includes("--delete")) {
    if (orphans.length === 0) {
        console.log("Nothing to delete.");
    } else {
        const ids = orphans.map((a) => a._id);
        const res = await db.collection("account").deleteMany({ _id: { $in: ids } });
        console.log(`Deleted ${res.deletedCount} orphaned account docs.`);
    }
} else {
    console.log(`Found ${orphans.length} orphaned account docs. Run again with --delete to remove them.`);
}

await client.close();
