'use client';

import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({
    children
}: { children: React.ReactNode; }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false
        });
        // TODO: KUSHI -display network connection failure issues to users in case of poor connection for both clerk auth and socket io. 
        //NOTE: socket.io was bye passed in middleware. check getCurrentProfile in lib folder. you could use that to find isssues with logged in
        // console.log(2222, socketInstance);
        // const abc = async () => {
        //     try {
        //          const res = await axios.get("https://clerk.example.com/v1/me");
        //          console.log(333, res);
        //      } catch (error) {
        //          console.log(444, error.message);
        //      }
        // }
        // abc();
        socketInstance.on("connect", () => {
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);
    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}

