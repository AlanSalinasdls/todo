export const UserByEmailQuery = (email: string) => {
    const query = `
       query UserByEmail($email: String!) {
            userByEmail(email: $email) {
                id
                fullname
                email
            }
        }
    `;

    const variables = {
        email,
    };

    return {
        query,
        variables,
    };
};
