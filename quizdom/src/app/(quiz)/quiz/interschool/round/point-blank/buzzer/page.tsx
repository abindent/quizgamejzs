"use client";
import { useSearchParams } from "next/navigation";
import Buzzer from "@/components/website/quiz/buzzer/buzzer";
import AdminPanel from "@/components/website/quiz/buzzer/admin";
// SOCKET
import { SocketProvider } from "@/context/socket/context";
import { Nunito } from "next/font/google";

export default function Page() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  return (
    <SocketProvider>
      <div>
        <div className="p-4">
          {isAdmin ? (
            <AdminPanel />
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-6 text-center">
                Team Buzzer
              </h1>
              <Buzzer />
            </>
          )}
        </div>
      </div>
    </SocketProvider>
  );
}
