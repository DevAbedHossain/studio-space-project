import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () => {
    try {
        const jwsToken = await auth.api.getToken({
            headers: await headers()
        });
        const token = jwsToken?.token;
        return token;
    } catch {
        // No session (e.g. a logged-out visitor) — better-auth throws a 401
        // APIError here; return null so pages can degrade gracefully.
        return null;
    }
}