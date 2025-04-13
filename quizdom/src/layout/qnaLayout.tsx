"use client";
import React from "react";

// ROUTER
import { redirect } from "next/navigation";

// USER
import { useAuthContext } from "@/context/auth/state";

// TOAST
import { toast } from "react-toastify";

export default function QuizLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { team } = useAuthContext();
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            if (team.role && team.role !== "ADMIN") {
                toast.warn("You are not an admin.")
                redirect("/account");

            }
        }
    });
    return <div>{children}</div>;
}
