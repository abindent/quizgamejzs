"use client";
// REACT
import * as React from "react";

// FLOWBITE
import { Flowbite } from "flowbite-react";

// TOAST
import { ToastContainer, Flip } from "react-toastify";

// CONTEXT
import { AuthState } from "@/context/state";

// COMPONENTS
import Navbar from "@/components/panel/navbar";
import Footer from "@/components/panel/footer";
import Loader from "@/components/website/loader/loader";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Loading State
  const [PageLoading, setPageLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof window.document !== "undefined") {
      setPageLoading(false);
    }
  }, [PageLoading]);

  return PageLoading ? (
    <Loader />
  ) : (
    <AuthState>
      <Flowbite>
        <ToastContainer
          position="top-right"
          limit={8}
          theme="colored"
          autoClose={4000}
          draggable
          transition={Flip}
        />
        <Navbar />
        {children}
        <Footer />
      </Flowbite>
    </AuthState>
  );
}
