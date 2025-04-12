"use client";

// REACY
import React, { useState, useEffect, useCallback } from "react";

// SOCKET
import { useSocket } from "@/context/socket/context";

// TOAST
import { toast } from "react-toastify";

// BUTTON
import { Button } from "flowbite-react";

// BUZZER
import Buzzer from "./buzzer";

export default function AdminPanel() {
  // INTERFACE

  interface BuzzerPress {
    teamId: string;
    teamName: string;
    pressedAt: string;
  }

  // VARIABLES AND CONSTANTS
  const { socket } = useSocket();
  const [timer, setTimer] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
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
          resetTimer();
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
    setTimer(15);
    setIsTimerRunning(false);
  }, [timerInterval, socket]);


  useEffect(() => {
    if (!socket) return;
    const handleBuzzerPressed = (data: BuzzerPress) => {
      if (!firstPressInfo) {
        setFirstPressInfo(data);
      }
      toast.info(`Team - ${data.teamName} pressed the button.`, { autoClose: 15000 })
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
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex gap-8 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg flex-1 text-center">
          <h2 className="text-xl font-semibold mb-2">Timer Control</h2>
          <span className="block text-2xl font-medium mb-4">{timer}s</span>
          <div className="flex gap-2 justify-center mt-4">
            <Button
              onClick={startTimer}
              disabled={isTimerRunning}
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Start
            </Button>
            <Button
              onClick={pauseTimer}
              disabled={!isTimerRunning}
              className="cursor-pointer px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Pause
            </Button>
            <Button
              onClick={resetTimer}
              className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-6 rounded-lg text-center">
        <div className="flex flex-col items-center gap-8 p-8">
          <div
            className={`w-[200px] h-[200px] rounded-full flex items-center justify-center text-white text-center transition-all duration-300 ${firstPressInfo ? "bg-red-500" : "bg-green-500"
              }`}
          >
            {firstPressInfo ? (
              <div className="flex flex-col items-center gap-2">
                <p>Buzzer pressed by: {firstPressInfo.teamName}</p>
                <p>at: {firstPressInfo.pressedAt}</p>
              </div>
            ) : (
              <p className="text-xl">Buzzer Ready</p>
            )}
          </div>
        </div>
        <Buzzer isAdmin={true} />
      </div>
    </div>
  );
}
