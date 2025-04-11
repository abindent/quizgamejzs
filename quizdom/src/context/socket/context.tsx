"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const socket = useMemo(() => {
    if (typeof window === "undefined") return null;

    // Determine if running in Codespaces by checking hostname; adjust based on your Codespace setup.
    const isCodespaces = window.location.hostname.includes(".app.github.dev");
    let serverUrl: string;
    if (isCodespaces) {
      // Replace '-3000' with '-3001' in the hostname for the server URL
      serverUrl = `https://${window.location.hostname.replace(
        "-3000",
        "-3001"
      )}`;
    } else {
      serverUrl =
        process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001";
    }
    console.log("Connecting to server at:", serverUrl);

    const socketInstance = io(serverUrl, {
      transports: ["polling"], // Use polling (upgrade to websocket later if possible)
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 10000,
      withCredentials: true,
      path: "/socket.io/",
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
      toast.success("Connected to server");
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Connection error:", err);
      toast.error(`Connection error: ${err.message}`);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
      toast.error(`Disconnected: ${reason}`);
    });

    return socketInstance;
  }, []);

  useEffect(() => {
    console.log("[SocketProvider] Socket instance from useMemo:", socket);
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
