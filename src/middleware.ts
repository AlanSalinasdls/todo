import { NextRequest, NextResponse } from "next/server";
import { ValidateTokenMutation } from "./lib/graphql/auth/auth-mutatations";
import { cookies } from "next/headers";

export const config = {
    matcher: "/todo",
};

export default async function middleware(request: NextRequest) {
    let cookie = (await cookies()).get("session");

    if (cookie) {
        const response = await fetch(process.env.GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ValidateTokenMutation(cookie?.value || "")),
        });
        const data = await response.json();

        if (data.data.validateToken) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        return NextResponse.redirect(new URL("/", request.url));
    }
}
