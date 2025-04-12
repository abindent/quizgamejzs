"use client";

// REACT
import * as React from "react";

// NUNITO
import { Nunito } from "next/font/google";

// SOCKET
import { useSocket } from "@/context/socket/context";

// CONTEXT
import { useAuthContext } from "@/context/auth/state";
// TOAST
import { toast } from "react-toastify";

// AUTH CONTEXT
import { ContextType } from "@/context/auth/context";

// BUTTON
import { Button } from "flowbite-react";

import Debug from "./debug";

// INTERFCE
interface BuzzerProps {
  isAdmin?: boolean;
}

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default function Buzzer({
  isAdmin = false,
}: BuzzerProps) {
  const { socket } = useSocket();
  const [buzzerPressed, setBuzzerPressed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { team }: ContextType = useAuthContext();
  const teamId = team.id;
  const teamName = team.team;

  React.useEffect(() => {
    if (!socket) return;
    const handleBuzzerReset = () => {
      setBuzzerPressed(false);
    };

    const handleError = (message: string) => {
      setError(message);
      setTimeout(() => setError(null), 3000);
    };

    // Socket event listeners
    if (!socket) {
      toast.error("Not connected to server!");
      return;
    }

    socket.on("connect", () => {
      toast.success("Connected to server!");
    });

    socket.on("disconnect", () => {
      toast.error("Disconnected from server!");
    });

    socket.on("buzzerReset", handleBuzzerReset);
    socket.on("error", handleError);

    return () => {
      socket.off("buzzerReset", handleBuzzerReset);
      socket.off("error", handleError);
    };
  }, [socket]);

  const handleBuzzerPress = React.useCallback(() => {
    if (!socket) {
      toast.error("Not connected to server!");
      return;
    }

    if (buzzerPressed) {
      toast.warning("Buzzer is already pressed!");
      return;
    }
    try {
      socket.emit("pressBuzzer", {
        teamId,
        teamName
      });
      setBuzzerPressed(true);
      toast.info("Pressed buzzer");
    } catch (error) {
      console.error("Error pressing buzzer:", error);
      toast.error("Failed to press buzzer!");
    }
  }, [socket, buzzerPressed, teamId, teamName]);

  const handleReset = React.useCallback(() => {
    if (!socket) {
      toast.error("Not connected to server!");
      return;
    }
    try {
      socket.emit("resetBuzzer", {});

      toast.info("Resetting buzzer...");
    } catch (error) {
      console.error("Error resetting buzzer:", error);
      toast.error("Failed to reset buzzer!");
    }
  }, [socket]);

  return (
    <div>
      {/* {process.env.NODE_ENV === "development" && <Debug />} */}
      {team && (
        <>
          <div className={`${nunito.className} flex flex-col items-center gap-8 p-8`}>
            {!isAdmin && (
              <div
                className={`w-[200px] h-[200px] rounded-full flex items-center justify-center text-white text-center transition-all duration-300 ${buzzerPressed ? "bg-red-500" : "bg-green-500"
                  }`}
              >
                <p className="text-xl">Buzzer {buzzerPressed ? "Pressed" : "Ready"}</p>
              </div>
            )}
            <div className="flex gap-4">
              {!isAdmin && (
                <Button
                  className={`cursor-pointer px-8 py-4 text-lg rounded-full text-white transition-all duration-300 ${buzzerPressed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                    }`}
                  onClick={handleBuzzerPress}
                  disabled={buzzerPressed}
                >
                  Press Buzzer
                </Button>
              )}

              {team.role == "ADMIN" && isAdmin && (
                <Button
                  className="cursor-pointer px-8 py-4 text-lg rounded-full bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                  onClick={handleReset}
                >
                  Reset Buzzer
                </Button>
              )}
            </div>

            {error && (
              <div className="text-red-500 p-4 rounded-md bg-red-50/10 mt-4">
                {error}
              </div>
            )}
          </div>
        </>
      )}
      {!team && <div>Loading..</div>}
    </div>
  );
}
