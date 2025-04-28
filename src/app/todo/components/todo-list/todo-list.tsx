"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TodoItem } from "./todo-item/todo-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Loader2 } from "lucide-react";
import { TodoStatus } from "../types";
import { fetcher, mutator } from "@/lib/fetchers/fetchers";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Task, UpdateTaskInput } from "@/lib/graphql-codegen/generated/graphql";
import { useUserStore } from "@/lib/store/user";
export function TodoList() {
    const { id } = useUserStore((state) => state.user);
    const {
        data: tasks,
        isLoading,
        mutate: mutateTasks,
    } = useSWR<Task[]>(`/api/tasks/get?userId=${id}`, fetcher);
    const { trigger: updateTodo } = useSWRMutation(
        "/api/tasks/update",
        (
            url: string,
            { arg }: { arg: { taskId: string; data: UpdateTaskInput } }
        ) => mutator(url, arg)
    );

    const { trigger: deleteTodo } = useSWRMutation(
        "/api/tasks/delete",
        (url: string, { arg }: { arg: { taskId: string } }) => mutator(url, arg)
    );

    const onUpdateStatus = async (id: string, status: TodoStatus) => {
        await updateTodo({ taskId: id, data: { status } });
        mutateTasks();
    };

    const onDeleteTodo = async (id: string) => {
        await deleteTodo({ taskId: id });
        mutateTasks();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl text-indigo-600">
                    <ClipboardList className="mr-2 h-5 w-5" />
                    Your Tasks
                </CardTitle>
            </CardHeader>
            <CardContent>
                {tasks?.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-gray-500"
                    >
                        <p>No tasks yet. Add one to get started!</p>
                    </motion.div>
                ) : (
                    <ul className="space-y-3">
                        <AnimatePresence>
                            {tasks?.map((task) => (
                                <motion.li
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <TodoItem
                                        task={task}
                                        onDelete={onDeleteTodo}
                                        onUpdateStatus={onUpdateStatus}
                                    />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
