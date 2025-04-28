"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    LoginFormValues,
    loginSchema,
    SignupFormValues,
    signupSchema,
} from "./schema";
import { motion } from "framer-motion";
import { FormBody } from "./form-body";
import { fetcher, mutator } from "@/lib/fetchers/fetchers";
import useSWRMutation from "swr/mutation";
import {
    AuthInput,
    SignupInput,
    User,
} from "@/lib/graphql-codegen/generated/graphql";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/user";

export function AuthForm() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { setUser } = useUserStore();

    const { trigger: login, error } = useSWRMutation(
        "/api/login",
        (url: string, { arg }: { arg: AuthInput }) => mutator(url, arg)
    );

    const { trigger: signup } = useSWRMutation(
        "/api/signup",
        (url: string, { arg }: { arg: SignupInput }) => mutator(url, arg)
    );

    const { trigger: getUser } = useSWRMutation(
        "/api/user/get",
        (url, { arg }: { arg: { email: string } }) =>
            fetcher(`${url}?email=${encodeURIComponent(arg.email)}`)
    );

    const loginForm = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            fullname: "",
            confirmPassword: "",
        },
    });

    const signupForm = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const resetForm = () => {
        loginForm.reset();
        signupForm.reset();
    };

    const handleSetUser = async (email: string) => {
        const userData = await getUser({ email });
        setUser({
            id: userData.id,
            fullname: userData.fullname,
            email: userData.email,
        });
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = isLogin ? loginForm : signupForm;

    const onSubmit = async (data: LoginFormValues | SignupFormValues) => {
        try {
            setServerError(null);

            if (isLogin) {
                const response = await login({
                    email: data.email,
                    password: data.password,
                });
                const message = await response.json();

                if (message === "success") {
                    handleSetUser(data.email);
                    router.push("/todo");
                } else {
                    throw new Error("Invalid credentials");
                }
            } else {
                const response = await signup({
                    email: data.email,
                    password: data.password,
                    fullname: data.fullname || "",
                });
                const message = await response.json();

                if (message === "success") {
                    handleSetUser(data.email);
                    router.push("/todo");
                } else {
                    throw new Error("Invalid credentials");
                }
            }

            resetForm();
        } catch {
            setServerError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 w-full"
        >
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLogin ? "Sign In" : "Create Account"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLogin
                            ? "Enter your credentials to access your account"
                            : "Fill in the information below to create your account"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormBody
                        isLogin={isLogin}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        serverError={serverError || ""}
                        register={register}
                        errors={errors}
                        isSubmitting={isSubmitting}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                    />
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        variant="link"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            resetForm();
                        }}
                        className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
