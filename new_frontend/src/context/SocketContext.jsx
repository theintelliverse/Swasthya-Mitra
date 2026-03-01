import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth();
    const defaultSocketUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
    const socketUrl = import.meta.env.VITE_SOCKET_URL?.trim() || defaultSocketUrl;

    useEffect(() => {
        if (user) {
            if (!socketUrl) {
                setSocket(null);
                return;
            }

            // Initialize socket connection
            const newSocket = io(socketUrl, {
                auth: {
                    token: localStorage.getItem('accessToken') // Send token for auth
                }
            });

            newSocket.on('connect', () => {
                console.log('Socket Connected:', newSocket.id);
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket Connection Error:', err);
            });

            setSocket(newSocket);

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user, socketUrl]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
