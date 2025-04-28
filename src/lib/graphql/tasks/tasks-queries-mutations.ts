import {
    CreateTaskInput,
    UpdateTaskInput,
} from "@/lib/graphql-codegen/generated/graphql";

export const TaksByUserIdQuery = (userId: string) => {
    const query = `
        query TasksByUserId($userId: String!) {
            tasksByUserId(userId: $userId) {
                id
                title
                description
                status
            }
        }
    `;

    const variables = { userId };

    return { query, variables };
};

export const CreateTaskMutation = (data: CreateTaskInput) => {
    const query = `
        mutation CreateTask($data: CreateTaskInput!) {
            createTask(data: $data) {
                id
            }
        }
    `;

    const variables = { data };

    return { query, variables };
};

export const UpdateTaskMutations = (taskId: string, data: UpdateTaskInput) => {
    const query = `
        mutation UpdateTask($taskId: String!, $data: UpdateTaskInput!) {
            updateTask(taskId: $taskId, data: $data) {
                id
            }
        }
    `;

    const variables = { taskId, data };

    return { query, variables };
};

export const DeleteTaskMutation = (taskId: string) => {
    const query = `
        mutation DeleteTask($taskId: String!) {
            deleteTask(taskId: $taskId)
        }
    `;

    const variables = { taskId };

    return { query, variables };
};
