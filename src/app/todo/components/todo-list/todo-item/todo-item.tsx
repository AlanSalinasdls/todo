"use client";

import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";
import { TodoStatus } from "../../types";
import { Task, TaskStatus } from "@/lib/graphql-codegen/generated/graphql";
import { ItemBody } from "./item-body";
import { useState } from "react";
import { ItemForm } from "./form/item-form";

interface TodoItemProps {
    task: Task;
    onDelete: (id: string) => void;
    onUpdateStatus: (id: string, status: TodoStatus) => void;
}

export function TodoItem({ task, onDelete, onUpdateStatus }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const currentStatus = (task.status || TaskStatus.Pending).toUpperCase();

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className={`bg-white  rounded-lg shadow p-4 border-l-4 ${
                currentStatus === TaskStatus.Completed
                    ? "border-l-green-500"
                    : currentStatus === TaskStatus.InProgress
                    ? "border-l-blue-500"
                    : "border-l-yellow-500"
            } border border-indigo-50 `}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    {isEditing ? (
                        <ItemForm
                            task={task}
                            closeForm={() => setIsEditing(false)}
                        />
                    ) : (
                        <ItemBody
                            currentStatus={currentStatus as TaskStatus}
                            task={task}
                            onUpdateStatus={onUpdateStatus}
                        />
                    )}
                </div>

                {!isEditing && (
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsEditing(true)}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDelete(task.id!)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </motion.button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
