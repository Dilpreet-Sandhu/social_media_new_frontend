//@ts-nocheck
import { createContext, ReactNode, useContext, useMemo } from "react";
import {io} from 'socket.io-client';

const socketContext = createContext();


export const getSocket = () => useContext(socketContext);


export const SocketProvider = ({children} :{children : ReactNode}) => {


    const socket  = useMemo(() => io("https://social-media-backend-c9b2.onrender.com",{withCredentials : true,transports : ["websocket"],reconnectionAttempts : 10,reconnectionDelay : 1000,timeout : 1000}),[]);

    console.log(socket);


    return <socketContext.Provider value={socket}>{children}</socketContext.Provider>


}

