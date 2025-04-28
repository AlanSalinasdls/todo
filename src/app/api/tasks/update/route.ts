import { UpdateTaskMutations } from "@/lib/graphql/tasks/tasks-queries-mutations";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: Request) {
    try {
        const { taskId, data } = await request.json();
        const token = (await cookies()).get("session")?.value;
        const response = await fetch(process.env.GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apollo-require-preflight": "true",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(UpdateTaskMutations(taskId, data)),
        });

        const json = await response.json();
        return NextResponse.json(json.data.updateTask, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}
