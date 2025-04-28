import { z } from "zod";

// Login schema
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    fullname: z.string().optional(),
    confirmPassword: z.string().optional(),
});

// Signup schema with more validation
const signupSchema = z
    .object({
        fullname: z
            .string()
            .min(2, { message: "Name must be at least 2 characters" }),
        email: z
            .string()
            .email({ message: "Please enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export {
    loginSchema,
    signupSchema,
    type LoginFormValues,
    type SignupFormValues,
};
