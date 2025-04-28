"use client";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetchers/fetchers";
import { useUserStore } from "@/lib/store/user";
import { LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import useSWRMutation from "swr/mutation";

const Header = () => {
    const { trigger: logout } = useSWRMutation("/api/logout", (url: string) =>
        fetcher(url)
    );

    const fullname = useUserStore((state) => state.user.fullname);
    const clearUser = useUserStore((state) => state.clearUser);

    const handleLogout = async () => {
        await logout();
        clearUser();
        redirect("/");
    };

    return (
        <div className="w-full p-4 flex justify-between items-center">
            <p className="text-lg text-gray-600 font-semibold">Hi, {fullname}</p>
            <Button variant="outline" onClick={handleLogout}>
                <LogOutIcon className="w-4 h-4" />
                Logout
            </Button>
        </div>
    );
};

export default Header;
