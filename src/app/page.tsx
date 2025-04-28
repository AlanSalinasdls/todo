import { AuthForm } from "./components/auth-form/auth-form";

export default function Home() {
    return (
        <div className="flex justify-center items-center h-screen w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto px-4 ">
            <AuthForm />
        </div>
    );
}
