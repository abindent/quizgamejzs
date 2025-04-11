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
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      left: '1rem',
      background: '#000c',
      color: '#fff',
      padding: '1rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      zIndex: 1000,
      maxWidth: '400px',
      backdropFilter: 'blur(5px)',
    }}>
      <h3>Connection Debug</h3>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}