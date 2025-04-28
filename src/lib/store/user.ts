import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserType = {
    id: string;
    fullname: string;
    email: string;
};

type UserStore = {
    user: UserType;
    setUser: (user: UserType) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: {
                id: "",
                fullname: "",
                email: "",
            },
            setUser: (user: UserType) => set({ user }),
            clearUser: () => set({ user: { id: "", fullname: "", email: "" } }),
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
