import { CreateTaskMutation } from "@/lib/graphql/tasks/tasks-queries-mutations";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId, ...task } = await request.json();
        const token = (await cookies()).get("session")?.value;
        const response = await fetch(process.env.GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(CreateTaskMutation({ ...task, userId })),
        });
        const json = await response.json();

        return NextResponse.json(json.data.createTask, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to create task" },
            { status: 500 }
        );
    }
}
