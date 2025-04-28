import { UserByEmailQuery } from "@/lib/graphql/user/user.query";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");
        const token = (await cookies()).get("session")?.value;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const response = await fetch(process.env.GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(UserByEmailQuery(email)),
        });

        const data = await response.json();

        return NextResponse.json(data.data.userByEmail, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 }
        );
    }
}
