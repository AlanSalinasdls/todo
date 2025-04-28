import { Task, UpdateTaskInput } from "@/lib/graphql-codegen/generated/graphql";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mutator } from "@/lib/fetchers/fetchers";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/lib/store/user";
export const TaskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional().nullable(),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;

export function ItemForm({
    task,
    closeForm,
}: {
    task: Task;
    closeForm: () => void;
}) {
    const { id } = useUserStore((state) => state.user);
    const { trigger: updateTodo } = useSWRMutation(
        "/api/tasks/update",
        (
            url: string,
            { arg }: { arg: { taskId: string; data: UpdateTaskInput } }
        ) => mutator(url, arg)
    );
    const {
        handleSubmit,
        reset,
        control,
        formState: { isSubmitting },
    } = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: task.title,
            description: task.description || "",
        },
    });

    const onSubmit = async (data: TaskSchemaType) => {
        await updateTodo({
            taskId: task.id,
            data: {
                title: data.title,
                description: data.description,
            },
        });
        mutate(`/api/tasks/get?userId=${id}`);
        reset();
        closeForm();
    };

    return (
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
                            value={field.value || ""}
                            className="bg-white border-indigo-100 focus:border-indigo-300 mb-2"
                        />
                        {formState.errors.title && (
                            <Label className="text-red-500 text-sm">
                                {formState.errors.title?.message}
                            </Label>
                        )}
                    </div>
                )}
            />

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
            <div className="flex gap-2">
                <Button
                    type="submit"
                    className=" bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        "Update"
                    )}
                </Button>
                <Button type="button" variant="outline" onClick={closeForm}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
