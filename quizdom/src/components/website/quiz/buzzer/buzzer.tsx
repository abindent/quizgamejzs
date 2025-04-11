"use client";

// REACT
import * as React from "react";

// NUNITO
import { Nunito } from "next/font/google";

// SOCKET
import { useSocket } from "@/context/socket/context";

// CONTEXT
import { useAuthContext } from "@/context/auth/state";

// CSS
import styles from "./css/bzr.module.css";

// TOAST
import { toast } from "react-toastify";

// LOGIN PAGE
import { ContextType } from "@/context/auth/context";

import Debug from "./debug";

// INTERFCE
interface BuzzerProps {
  teamId: string;
  teamName: string;
  isAdmin?: boolean;
}

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default function Buzzer({
  teamId,
  teamName,
  isAdmin = false,
}: BuzzerProps) {
  const { socket } = useSocket();
  const [buzzerPressed, setBuzzerPressed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { team }: ContextType = useAuthContext();

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
      {team && (
        <>
          <div className={`${styles.buzzerContainer} ${nunito.className}`}>
            {!isAdmin && (<div
              className={`${styles.buzzerControls} ${styles.buzzerStatus} ${buzzerPressed ? styles.disabled : ""}`}
            >

              <p>Buzzer {buzzerPressed ? "Pressed" : "Ready"}</p>
            </div>)}
            <div className={styles.buzzerControls}>
              {!isAdmin && (
                <button
                  className={`${styles.buzzerButton} ${buzzerPressed ? styles.disabled : ""
                    }`}
                  onClick={handleBuzzerPress}
                  disabled={buzzerPressed}
                >
                  Press Buzzer
                </button>
              )}

              {team.role == "ADMIN" && isAdmin && (
                <button className={styles.resetButton} onClick={handleReset}>
                  Reset Buzzer
                </button>
              )}
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        </>
      )
      }
      {!team && <div>Loading..</div>}
      {/* {process.env.NODE_ENV === "development" && <Debug />} */}
    </div >
  );
}
