"use client";

import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/socket/context';

export default function ConnectionDebug() {
  const { socket, isConnected } = useSocket();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const getConnectionInfo = () => {
      const isCodespaces = window.location.hostname.includes('.app.github.dev');
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const hostname = window.location.hostname.replace('3000', '3001');
      const codesspacesUrl = `${wsProtocol}//${hostname}`;

      setDebugInfo({
        isCodespaces,
        hostname: window.location.hostname,
        expectedUrl: isCodespaces ? codesspacesUrl : process.env.NEXT_PUBLIC_SERVER_URL,
        socketConnected: socket?.connected,
        socketId: socket?.id,
        transportType: socket?.io?.engine?.transport?.name,
      });
    };

    getConnectionInfo();
    const interval = setInterval(getConnectionInfo, 1000);

    return () => clearInterval(interval);
  }, [socket]);

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-sm z-[1000] max-w-[400px] backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-2">Connection Debug</h3>
      <pre className="whitespace-pre-wrap break-all">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}