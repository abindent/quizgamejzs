"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "@/context/socket/context";
import { toast } from "react-toastify";
import Buzzer from "./buzzer";
import styles from "./css/admin.module.css";

export default function AdminPanel({ teamID }: { teamID: string }) {
  const { socket } = useSocket();
  const [round, setRound] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

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
    socket?.emit("timerStarted", { round, questionNumber, duration: timer });
  }, [timer, round, questionNumber, socket, timerInterval]);

  const pauseTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setIsTimerRunning(false);
    socket?.emit("timerPaused", { round, questionNumber, timeLeft: timer });
  }, [timerInterval, timer, round, questionNumber, socket]);

  const resetTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTimer(30);
    setIsTimerRunning(false);
    socket?.emit("timerReset", { round, questionNumber });
  }, [timerInterval, round, questionNumber, socket]);

  useEffect(() => {
    if (!socket) return;
    // Emit identifyMainComputer to let the server know this is the admin client
    socket.emit("identifyMainComputer");

    // Listen for mainComLoginComp event from the server indicating a successful admin login/identification
    socket.on("mainComLoginComp", (data: string) => {
      toast.success("Main computer (admin) identified successfully!");
    });

    return () => {
      socket.off("mainComLoginComp");
    };
  }, [socket]);

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
        <Buzzer teamId={teamID} teamName="Quiz Master" isAdmin={true} />
      </div>
    </div>
  );
}
