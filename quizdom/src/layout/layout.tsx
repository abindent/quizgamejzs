"use client";
// REACT
import * as React from "react";

// FLOWBITE
import { Flowbite } from "flowbite-react";

// TOAST
import { ToastContainer, Flip  } from 'react-toastify';

// CONTEXT 
import { AuthState } from "@/context/state";
// COMPONENTS
import Navbar from "@/components/panel/navbar";
import Footer from "@/components/panel/footer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <AuthState>
            <Flowbite>
               <ToastContainer position="top-right" limit={8} theme="colored" autoClose={4000} draggable transition={Flip} />
                <Navbar />
                {children}
                <Footer />
            </Flowbite>
        </AuthState>
    )

}