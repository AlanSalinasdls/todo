import { TaskStatus } from "@/lib/graphql-codegen/generated/graphql";
import { CheckCircle, Clock, Play } from "lucide-react";

export const statusConfig = {
    [TaskStatus.Pending]: {
        color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        icon: <Clock className="h-3 w-3 mr-1" />,
        label: "Pending",
    },
    [TaskStatus.InProgress]: {
        color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        icon: <Play className="h-3 w-3 mr-1" />,
        label: "In Progress",
    },
    [TaskStatus.Completed]: {
        color: "bg-green-100 text-green-800 hover:bg-green-200",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
        label: "Completed",
    },
};
