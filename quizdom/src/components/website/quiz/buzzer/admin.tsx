"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "@/context/socket/context";
import { toast } from "react-toastify";
import Buzzer from "./buzzer";
import styles from "./css/admin.module.css";

export default function AdminPanel({ teamID }: { teamID: string }) {
  // INTERFACE

  interface BuzzerPress {
    teamId: string;
    teamName: string;
    pressedAt: string;
  }

  // VARIABLES AND CONSTANTS
  const { socket } = useSocket();
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [firstPressInfo, setFirstPressInfo] = useState<BuzzerPress | null>(null);

  const startTimer = useCallback(() => {
    if (timerInterval) return;
    setIsTimerRunning(true);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerInterval(interval);
  }, [timer, socket, timerInterval]);

  const pauseTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsTimerRunning(false);
  }, [timerInterval, timer, socket]);

  const resetTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimer(30);
    setIsTimerRunning(false);
    setFirstPressInfo(null);
    socket?.emit("resetBuzzer", {});
  }, [timerInterval, socket]);

  useEffect(() => {
    if (!socket) return;
    const handleBuzzerPressed = (data: BuzzerPress) => {
      if (!firstPressInfo) {
        setFirstPressInfo(data);
      }
      toast.info(`Team - ${data.teamName} pressed the button.`, { autoClose: false })
    };

    const handleBuzzerReset = () => {
      setFirstPressInfo(null);
    };

    // Emit identifyMainComputer to let the server know this is the admin client
    socket.emit("identifyMainComputer");

    // Listen for mainComLoginComp event from the server indicating a successful admin login/identification
    socket.on("mainComLoginComp", (data: string) => {
      toast.success("Main computer (admin) identified successfully!");
    });

    socket.on("buzzerPressed", (data: BuzzerPress) => {
      handleBuzzerPressed(data);
    });

    socket.on("buzzerReset", handleBuzzerReset);
    socket.on("mainComputerAlreadyExists", () => {
      toast.warn("Already logged in as an admin")
    })

    return () => {
      socket.off("buzzerPressed");
      socket.off("mainComLoginComp");
      socket.off("buzzerReset");
      socket.off("mainComputerAlreadyExists")
    };
  }, [socket, firstPressInfo]);

  return (
    <div className={styles.adminContainer}>
      <div className={styles.controlPanel}>
        <div className={styles.timerControl}>
          <h2>Timer Control</h2>
          <span>{timer}s</span>
          <div className={styles.timerButtons}>
            <button onClick={startTimer} disabled={isTimerRunning}>
              Start
            </button>
            <button onClick={pauseTimer} disabled={!isTimerRunning}>
              Pause
            </button>
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>

      <div className={styles.buzzerSection}>
        <div
          className={`${styles.buzzerContainer}`}
        >
          <div
            className={`${styles.buzzerControls} ${styles.buzzerStatus}`}
          >
            {firstPressInfo ? (
              <div className={styles.pressedInfo}>
                <p>Buzzer pressed by: {firstPressInfo.teamName}</p>
                <p>at: {firstPressInfo.pressedAt}</p>
              </div>
            ) : (
              <p>Buzzer Ready</p>
            )}
          </div>
        </div>
        <Buzzer teamId={teamID} teamName="Quiz Master" isAdmin={true} />
      </div>
    </div>
  );
}
