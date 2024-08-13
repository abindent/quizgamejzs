"use client";

// REACT
import * as React from "react";

// SOCKET
import useSocket from "@/context/socket";

// CONTEXT
import { useAuthContext } from "@/context/state";

// CSS
import styles from "./css/bzr.module.css";

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
        toast.success("You are logged as the 'HOST' computer.");
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
          <section className={styles.base}>
            <video autoPlay muted loop className={styles.bg_bzr}>
              <source src="/_asset/static/buzzer_bg.mp4" />
            </video>
            <div className={styles.buzzer}>
              <button className={styles.bzr} onClick={handleBuzzerPress}>
                Press
              </button>
            </div>
          </section>
        </div>
      )}
      {!team && <div>Loading..</div>}
    </div>
  );
}
