//@ts-nocheck
import { useEffect } from "react"


export const useSocketEvents = (socket : any,handlers : any) => {
    useEffect(() => {

        Object.entries(handlers).forEach(([eventName,handler] : any[]) => {

            socket.on(eventName,handler);

        });

        return () => {
            Object.entries(handlers).forEach(([eventname,handler]) => {
                socket.off(eventname,handler);
            })
        }


    },[socket,handlers])
}