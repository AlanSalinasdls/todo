import { z } from "zod";
import { TaskStatus } from "@/lib/graphql-codegen/generated/graphql";

const taskStatusValues = Object.values(TaskStatus) as [
    TaskStatus.Completed,
    TaskStatus.InProgress,
    TaskStatus.Pending
];

export const todoSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional().nullable(),
    status: z.enum(taskStatusValues).default(TaskStatus.Pending),
});


export type SchemaType = z.infer<typeof todoSchema>;