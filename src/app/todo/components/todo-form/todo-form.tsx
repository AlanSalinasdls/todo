"use client";

import { useState } from "react";
import { Controller, useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SchemaType, todoSchema } from "@/app/todo/components/todo-form/schema";
import { Label } from "@/components/ui/label";
import { CreateTaskInput } from "@/lib/graphql-codegen/generated/graphql";
import useSWRMutation from "swr/mutation";
import { mutator } from "@/lib/fetchers/fetchers";
import { mutate } from "swr";
import { useUserStore } from "@/lib/store/user";

export function TodoForm() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { id } = useUserStore((state) => state.user);
    const { trigger: createTodo } = useSWRMutation(
        "/api/tasks/create",
        (url: string, { arg }: { arg: CreateTaskInput }) => mutator(url, arg)
    );

    const {
        handleSubmit,
        reset,
        control,
        formState: { isSubmitting },
    } = useForm<SchemaType>({
        resolver: zodResolver(todoSchema) as unknown as Resolver<SchemaType>,
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (values: SchemaType) => {
        await createTodo({
            ...values,
            userId: id,
        });
        mutate(`/api/tasks/get?userId=${id}`);
        reset();
        setIsExpanded(false);
    };

    return (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl text-indigo-600 ">
                    Add New Task
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
                    <Controller
                        control={control}
                        name="title"
                        render={({ field, formState }) => (
                            <div>
                                <Label className="text-gray-700 mb-3 font-bold">
                                    Task Title
                                </Label>
                                <Input
                                    placeholder="What needs to be done?"
                                    {...field}
                                    className="bg-white border-indigo-100 focus:border-indigo-300 mb-2"
                                    onFocus={() => setIsExpanded(true)}
                                />
                                {formState.errors.title && (
                                    <Label className="text-red-500 text-sm">
                                        {formState.errors.title?.message}
                                    </Label>
                                )}
                            </div>
                        )}
                    />

                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) => (
                                    <>
                                        <Label className="text-gray-700  mb-3 font-bold">
                                            Description (Optional)
                                        </Label>

                                        <Textarea
                                            placeholder="Add details about your task..."
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            className="bg-white  border-indigo-100  focus:border-indigo-300  min-h-[100px]"
                                        />
                                    </>
                                )}
                            />
                        </motion.div>
                    )}

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="pt-2"
                    >
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Task
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>
            </CardContent>
        </Card>
    );
}
