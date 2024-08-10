import { useState } from "react";

// SOCKE
import useSocket from "@/context/socket";

const LoginPage = ({
  setIsMainComputer,
}: Readonly<{ setIsMainComputer: React.Dispatch<React.SetStateAction<boolean | undefined>>}>) => {
  const socket = useSocket("http://localhost:3000");

  const handleMainComputerLogin = () => {
    socket.emit("identifyMainComputer");
    setIsMainComputer(true);
  };

  return (
    <div>
      <button onClick={handleMainComputerLogin}>Login as Main Computer</button>
    </div>
  );
};

export default LoginPage;
