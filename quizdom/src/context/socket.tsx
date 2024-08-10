import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (url: string) => {
    const socket = io(url);

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;