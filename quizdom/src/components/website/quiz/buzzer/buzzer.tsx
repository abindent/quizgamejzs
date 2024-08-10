"use client";

// REACT
import * as React from "react";

// SOCKET
import useSocket from "@/context/socket";

// CONTEXT
import { useAuthContext } from "@/context/state";

// LOGIN PAGE
import LoginPage from "./login";

export default function Buzzer() {
  const [isBuzzerPressed, setIsBuzzerPressed] = React.useState<
    boolean | undefined
  >(false);
  const [winnerId, setWinnerId] = React.useState(null);
  const [isMainComputer, setIsMainComputer] = React.useState<
    boolean | undefined
  >(false); // Determine if this is the main computer
  const socket = useSocket("https://3001-abindent-quizgamejzs-9xks84prh15.ws-us115.gitpod.io");
  const { team } = useAuthContext();

  React.useEffect(() => {
    socket.on("buzzerPressed", (id) => {
      setWinnerId(id);
      setIsBuzzerPressed(true);
      if (isMainComputer) {
        alert("Buzzer pressed by user: " + id);
        // Play sound here if this is the main computer
      }
    });

    return () => {
      socket.off("buzzerPressed");
    };
  }, [socket, isMainComputer]);

  const handleBuzzerPress = () => {
    socket.emit("pressBuzzer");
  };

  const handleReset = () => {
    socket.emit("resetBuzzer");
    setIsBuzzerPressed(false);
    setWinnerId(null);
  };

  if (team && team.role === "ADMIN") {
    return <LoginPage setIsMainComputer={setIsMainComputer} />;
  }

  return (
    <div>
      {team && (
        <div>
          <button onClick={handleBuzzerPress} disabled={isBuzzerPressed}>
            Press Buzzer
          </button>
          {winnerId && <p>User {winnerId} pressed the buzzer first!</p>}
          <button onClick={handleReset}>Reset Buzzer</button>
        </div>
      )}
      {!team && <div>Loading..</div>}
    </div>
  );
}
