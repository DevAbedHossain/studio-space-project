import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () => {
    const jwsToken = await auth.api.getToken({
        headers: await headers()
    });
    const token = jwsToken?.token;
    return token;
}