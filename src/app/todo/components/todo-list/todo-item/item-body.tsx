import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Task, TaskStatus } from "@/lib/graphql-codegen/generated/graphql";
import { TodoStatus } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, CheckCircle } from "lucide-react";
import { statusConfig } from "../utils";
import { SelectContent } from "@/components/ui/select";

export function ItemBody({
    currentStatus = TaskStatus.Pending,
    task,
    onUpdateStatus,
}: {
    currentStatus: TaskStatus;
    task: Task;
    onUpdateStatus: (id: string, status: TodoStatus) => void;
}) {
    const data = statusConfig[currentStatus];

    return (
        <>
            <div className="flex items-center gap-2 mb-2">
                <h3
                    className={`font-medium ${
                        currentStatus === TaskStatus.Completed
                            ? "line-through text-gray-500 "
                            : "text-gray-800 "
                    }`}
                >
                    {task.title}
                </h3>
                <Badge variant="outline" className={`text-xs ${data?.color}`}>
                    {data?.icon}
                    {data?.label}
                </Badge>
            </div>

            {task.description && (
                <div className="mt-2">
                    <p className="text-gray-600  text-sm">{task.description}</p>
                </div>
            )}

            <div className="mt-3">
                <Select
                    defaultValue={currentStatus}
                    onValueChange={(value) =>
                        onUpdateStatus(task.id!, value as TodoStatus)
                    }
                >
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                        <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            value={TaskStatus.Pending}
                            className="text-xs"
                        >
                            <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-yellow-500" />
                                Pending
                            </div>
                        </SelectItem>
                        <SelectItem
                            value={TaskStatus.InProgress}
                            className="text-xs"
                        >
                            <div className="flex items-center">
                                <Play className="h-3 w-3 mr-1 text-blue-500" />
                                In Progress
                            </div>
                        </SelectItem>
                        <SelectItem
                            value={TaskStatus.Completed}
                            className="text-xs"
                        >
                            <div className="flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                Completed
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
}
