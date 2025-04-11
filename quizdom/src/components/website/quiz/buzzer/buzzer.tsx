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
  const [pressedBy, setPressedBy] = React.useState<{
    teamName: string;
    pressedAt: Date;
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const { team }: ContextType = useAuthContext();

  React.useEffect(() => {
    console.log(socket);
    if (!socket) return;
    const handleBuzzerPressed = (data: any) => {
      console.log("Buzzer pressed event:", data);
      if (!pressedBy) {
        setPressedBy({
          teamName: data.teamName,
          pressedAt: new Date(data.pressedAt),
        });
      }
      setBuzzerPressed(true);
      toast.info(`${data.teamName} pressed the buzzer!`, { autoClose: false });
    };

    const handleBuzzerReset = () => {
      setBuzzerPressed(false);
      setPressedBy(null);
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

    socket.on("buzzerPressed", handleBuzzerPressed);
    socket.on("buzzerReset", handleBuzzerReset);
    socket.on("error", handleError);

    return () => {
      socket.off("buzzerPressed", handleBuzzerPressed);
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
        teamName,
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
      console.log("Reset buzzer emitted");
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
            <div
              className={`${styles.buzzerStatus} ${
                buzzerPressed ? styles.pressed : ""
              }`}
            >
              {buzzerPressed && pressedBy ? (
                <div className={styles.pressedInfo}>
                  <p>Buzzer pressed by: {pressedBy.teamName}</p>
                  <p>at: {pressedBy.pressedAt.toLocaleTimeString()}</p>
                </div>
              ) : (
                <p>Buzzer Ready</p>
              )}
            </div>

            <div className={styles.buzzerControls}>
              {!isAdmin && (
                <button
                  className={`${styles.buzzerButton} ${
                    buzzerPressed ? styles.disabled : ""
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
      )}
      {!team && <div>Loading..</div>}
      {process.env.NODE_ENV === "development" && <Debug />}
    </div>
  );
}
