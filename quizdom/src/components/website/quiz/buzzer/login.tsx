// SOCKET
import useSocket from "@/context/socket";

// CSS
import styles from "./css/bzr.module.css";

const LoginPage = ({
  setIsMainComputer,
}: Readonly<{
  setIsMainComputer: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}>) => {
  const socket = useSocket(
    "https://3001-abindent-quizgamejzs-9xks84prh15.ws-us115.gitpod.io"
  );

  const handleMainComputerLogin = () => {
    socket.emit("identifyMainComputer");
    setIsMainComputer(true);
  };

  return (
    <div>
      <div>
        <section className={styles.base}>
          <video autoPlay muted loop className={styles.bg_bzr}>
            <source src="/_asset/static/buzzer_bg.mp4" />
          </video>
          <div className={styles.buzzer}>
            <button className={styles.bzr} onClick={handleMainComputerLogin}>
              Set Host
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
