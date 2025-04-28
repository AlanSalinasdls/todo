import type { z } from "zod";
import { todoSchema } from "@/app/todo/components/todo-form/schema";
import { TaskStatus } from "@/lib/graphql-codegen/generated/graphql";

export type TodoStatus = TaskStatus;

export type Todo = z.infer<typeof todoSchema>;
