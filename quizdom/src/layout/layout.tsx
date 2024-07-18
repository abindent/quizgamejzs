"use client";
// REACT
import * as React from "react";

// FLOWBITE
import { Flowbite } from "flowbite-react";
// COMPONENTS
import Navbar from "@/components/panel/navbar";
import Footer from "@/components/panel/footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Flowbite>
            <Navbar />
            {children}
            <Footer />
        </Flowbite>
    )

}