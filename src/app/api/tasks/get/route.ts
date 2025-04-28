import { TaksByUserIdQuery } from "@/lib/graphql/tasks/tasks-queries-mutations";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const token = (await cookies()).get("session")?.value;

        const response = await fetch(process.env.GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(TaksByUserIdQuery(userId)),
        });

        const json = await response.json();

        return NextResponse.json(json.data.tasksByUserId, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to get tasks" },
            { status: 500 }
        );
    }
}