'use client'

//frontend 
import React, { useCallback } from 'react'

interface SocketProviderProps {
    children?:React.ReactNode
}


interface ISocketContext {
    sendMsg: (msg:string) => any;
}


const SocketContext=React.createContext<ISocketContext | null>((null));

export const SocketProvider: React.FC<SocketProviderProps> = ({children})=>{

    const sendMsg: ISocketContext['sendMsg'] = useCallback((msg)=>{
        console.log("SEND MESSage")
    },[])


    return(
        <SocketContext.Provider value={{sendMsg}}>
            {children}
        </SocketContext.Provider>
    )
}


