import { SignupMutation } from "@/lib/graphql/auth/auth-mutatations";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch(process.env.GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apollo-require-preflight": "true",
            },
            body: JSON.stringify(SignupMutation(body)),
        });

        const data = await response.json();
        (await cookies()).set("session", data.data.signup.access_token, {
            httpOnly: true,
        });

        return NextResponse.json("success", { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "unexpected error" },
            { status: 500 }
        );
    }
}
