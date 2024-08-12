"use client";

// REACT
import * as React from "react";

// SOCKET
import useSocket from "@/context/socket";

// CONTEXT
import { useAuthContext } from "@/context/state";

// TOAST
import { toast } from "react-toastify";

// LOGIN PAGE
import LoginPage from "./login";
import { ContextType } from "@/context/context";

export default function Buzzer() {
  const [isMainComputer, setIsMainComputer] = React.useState<
    boolean | undefined
  >(false); // Determine if this is the main computer
  const socket = useSocket(
    "https://3001-abindent-quizgamejzs-9xks84prh15.ws-us115.gitpod.io"
  );
  const { team }: ContextType = useAuthContext();

  React.useEffect(() => {
    socket.on("buzzerPressed", (obj) => {
      if (isMainComputer) {
        toast.info(`${obj["_team_name"]} has pressed the buzzer`, {
          autoClose: false,
        });
        handleReset();
      }
    });
    socket.on("mainComLoginComp", () => {
      if (isMainComputer) {
        toast.success("You are logged as Main Computer.");
      }
    });

    return () => {
      socket.off("buzzerPressed");
    };
  }, [socket, isMainComputer]);

  const handleBuzzerPress = () => {
    socket.emit("pressBuzzer", team["team"]);
  };

  const handleReset = () => {
    socket.emit("resetBuzzer");
  };

  if (team && team.role === "ADMIN") {
    return <LoginPage setIsMainComputer={setIsMainComputer} />;
  }

  return (
    <div>
      {team && (
        <div>
          <button
            className="p-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleBuzzerPress}
          >
            Press Buzzer
          </button>
        </div>
      )}
      {!team && <div>Loading..</div>}
    </div>
  );
}
