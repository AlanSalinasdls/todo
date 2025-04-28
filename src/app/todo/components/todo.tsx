"use client";

import { motion } from "framer-motion";
import { TodoForm } from "./todo-form/todo-form";
import { TodoList } from "./todo-list/todo-list";

export function Todo() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-indigo-600  mb-4">
                        ToDo List
                    </h1>
                    <p className="text-gray-600  text-lg max-w-md mx-auto">
                        Organize your tasks with style. Add, view, and manage
                        your todos effortlessly.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-10"
                    >
                        <TodoForm />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <TodoList />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
