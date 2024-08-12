// SOCKET
import useSocket from "@/context/socket";

const LoginPage = ({
  setIsMainComputer,
}: Readonly<{ setIsMainComputer: React.Dispatch<React.SetStateAction<boolean | undefined>>}>) => {
  const socket = useSocket("https://3001-abindent-quizgamejzs-9xks84prh15.ws-us115.gitpod.io");

  const handleMainComputerLogin = () => {
    socket.emit("identifyMainComputer");
    setIsMainComputer(true);
  };

  return (
    <div>
      <button className="p-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleMainComputerLogin}>Login as Main Computer</button>
    </div>
  );
};

export default LoginPage;
