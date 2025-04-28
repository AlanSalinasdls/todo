import { Dispatch } from "react";
import { SetStateAction } from "react";
import { FieldErrors } from "react-hook-form";
import { LoginFormValues, SignupFormValues } from "./schema";
import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";

export interface FormBodyProps {
    isLogin: boolean;
    handleSubmit: UseFormHandleSubmit<LoginFormValues | SignupFormValues>;
    onSubmit: (data: LoginFormValues | SignupFormValues) => Promise<void>;
    serverError: string;
    register: UseFormRegister<LoginFormValues | SignupFormValues>;
    errors: FieldErrors<LoginFormValues | SignupFormValues>;
    isSubmitting: boolean;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    showConfirmPassword: boolean;
    setShowConfirmPassword: Dispatch<SetStateAction<boolean>>;
}
