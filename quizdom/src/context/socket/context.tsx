import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { BuzzerState, BuzzerEvent } from '@/types/buzzer';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(() => 
    io(process.env.NEXT_PUBLIC_BACKEND_API_URI || 'http://localhost:3001', {
      transports: ['websocket'],
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    })
  , []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, [socket]);

  const value = useMemo(() => ({
    socket,
    isConnected: socket.connected,
  }), [socket]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};