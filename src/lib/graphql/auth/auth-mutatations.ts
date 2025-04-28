import {
    AuthInput,
    SignupInput,
} from "@/lib/graphql-codegen/generated/graphql";

export const LoginMutation = (data: AuthInput) => {
    const query = `
        mutation Login($data: AuthInput!) {
            login(data: $data) {
                access_token
            }
        }
    `;

    const variables = {
        data,
    };

    return {
        query,
        variables,
    };
};

export const SignupMutation = (data: SignupInput) => {
    const query = `
        mutation Signup($data: SignupInput!) {
            signup(data: $data) {
                access_token
            }
        }
    `;

    const variables = {
        data,
    };

    return {
        query,
        variables,
    };
};

export const ValidateTokenMutation = (token: string) => {
    const query = `
        mutation ValidateToken($token: String!) {
            validateToken(token: $token)
        }
    `;

    const variables = {
        token,
    };

    return {
        query,
        variables,
    };
};
